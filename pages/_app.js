import React from "react";
import withApollo from "next-with-apollo";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ThemeProvider } from "styled-components";
import { ProvideAuth } from "~/hooks/auth";
import { message } from "antd";
import MainLayout from "~/layouts/MainLayout";

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

const App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <ThemeProvider theme={theme}>
      <ProvideAuth>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProvideAuth>
    </ThemeProvider>
  </ApolloProvider>
);

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message: msg, locations, path }) => {
            //console.log(
            //  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            //);
            //console.log(client.cache);
            //console.log(client);
            const re = /CODE\(([0-9]*)\)\sMSG\((.*)\)/g;
            const match = re.exec(msg);
            const errMsg = match ? match[2] : msg;
            message.error(errMsg);
          });

        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
        uri: "http://localhost:5000/graphql", // Server URL (must be absolute)
        credentials: "omit", // Additional fetch() options like `credentials` or `headers`
        fetch
      })
    ]),
    cache: new InMemoryCache().restore(initialState || {})
  });
})(App);
