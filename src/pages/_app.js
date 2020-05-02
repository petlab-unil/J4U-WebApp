import React from 'react';
import App from 'next/app';
import withApollo from 'next-with-apollo';
import { message } from 'antd';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import Router from 'next/router';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ThemeProvider } from 'styled-components';
import { NookiesProvider, parseNookies } from 'next-nookies-persist';
import { ProvideAuth } from 'hooks/auth';
import MainLayout from 'layouts/MainLayout';
import { parseServerError } from 'helpers';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        nookies: parseNookies(ctx),
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <NookiesProvider initialValue={pageProps.nookies}>
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <ProvideAuth>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </ProvideAuth>
          </ThemeProvider>
        </ApolloProvider>
      </NookiesProvider>
    );
  }
}

export default withApollo(({ initialState }) => {
  console.log(process.env.NEXT_GRAPHQL_PROXY_URI, '_app');
  return new ApolloClient({
    // ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    ssrMode: false,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message: msg }) => {
            // console.log(
            //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            // );
            // console.log(client.cache);
            // console.log(client);
            const { errorMsg: parsedMsg, code } = parseServerError(msg);
            const errorMsg = parsedMsg || msg;

            if (typeof window !== 'undefined') {
              message.error(errorMsg);
              if (code === 201) Router.push(`/logout?redirect=${Router.pathname}`);
            }
          });

        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      new HttpLink({
        uri: process.env.NEXT_GRAPHQL_PROXY_URI, // Server URL (must be absolute)
        credentials: 'omit', // Additional fetch() options like `credentials` or `headers`
        fetch,
      }),
    ]),
    cache: new InMemoryCache().restore(initialState || {}),
  });
})(MyApp);
