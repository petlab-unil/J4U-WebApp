import React from 'react';
import withApollo from 'next-with-apollo';
import { message } from 'antd';
import { ApolloProvider, InMemoryCache, ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import Router from 'next/router';
import { onError } from '@apollo/link-error';
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

const MyApp = ({ Component, pageProps, apollo }) => {
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
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  return {
    pageProps: {
      nookies: parseNookies(ctx),
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    },
  };
};

export default withApollo(({ initialState }) => {
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
              // message.error(errorMsg);
              if (code === 201) {
                Router.push(`/logout?redirect=${Router.pathname}`);
              }
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
