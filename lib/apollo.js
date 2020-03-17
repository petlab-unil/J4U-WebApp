import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import fetch from "isomorphic-unfetch";
import schema from "~/gql/schema.gql";
import { APP_MSGS } from "~/gql/queries";
import { PUSH_MSG, DEL_MSG } from "~/gql/mutations";
import { cloneDeep, sample } from "lodash";

let globalApolloClient = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient());

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState);
  }

  return globalApolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = null) {
  const cache = new InMemoryCache();
  if (initialState !== null) {
    cache.restore(initialState);
  } else {
    cache.writeData({
      data: {
        isLoggedIn: false,
        appMessages: {
          __typename: "AppMessages",
          messages: []
        }
      }
    });
  }
  const client = new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            //console.log(
            //  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            //);
            //console.log(client.cache);
            //console.log(client);
            const re = /CODE\(([0-9]*)\)\sMSG\((.*)\)/g;
            const match = re.exec(message);
            const errMsg = match ? match[2] : message;

            client.mutate({
              mutation: PUSH_MSG,
              variables: {
                type: "error",
                appMessage: {
                  __typename: "AppMessage",
                  message: errMsg,
                  code: null,
                  id: Math.floor(Math.random() * 1000),
                  type: "error"
                }
              }
            });
          });

        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
        uri: "http://localhost:5000/graphql", // Server URL (must be absolute)
        credentials: "omit", // Additional fetch() options like `credentials` or `headers`
        fetch
      })
    ]),
    cache: cache,
    typeDefs: schema,
    resolvers: {
      Mutation: {
        pushMessage: (_root, variables, { cache, getCacheKey }) => {
          const prev = cache.readQuery({ query: APP_MSGS });
          const data = cloneDeep(prev);
          data.appMessages.messages.push(variables.appMessage);
          cache.writeQuery({ query: APP_MSGS, data: data });
          //const nxt = cache.readQuery({ query: APP_MSGS });
          //console.log(nxt);
          return null;
        },
        delMessage: (_root, variables, { cache, getCacheKey }) => {
          const prev = cache.readQuery({ query: APP_MSGS });
          const data = cloneDeep(prev);
          let i = data.appMessages.messages.find(x => x === variables.id);
          data.appMessages.messages.splice(i, 1);
          cache.writeQuery({ query: APP_MSGS, data: data });
          return null;
        }
      }
    }
  });

  return client;
}
