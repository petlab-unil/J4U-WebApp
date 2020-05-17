import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { useContext, createContext } from 'react';
import useStorage from 'next-nookies-persist';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { AUTH } from 'gql/mutations';

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  const { nookies, setNookie, removeNookie } = useStorage();
  const client = useApolloClient();
  const [auth] = useMutation(AUTH);
  const router = useRouter();

  const { accessToken, refreshToken } = nookies;
  const loggedIn = accessToken && refreshToken;

  const logIn = (email, password) => {
    auth({ variables: { email, password } })
      .then(({ data }) => {
        if (!data) return;
        setNookie('accessToken', data.auth.accessToken);
        setNookie('refreshToken', data.auth.refreshToken);
        message.success('Connection reussie!');

        if (router.query.redirect) {
          router.push(router.query.redirect, router.query.redirect);
        } else {
          router.push('/', '/', { shallow: true });
        }
      })
      .catch((err) => console.log(err.message));
  };

  const logOut = (redirect) => {
    if (redirect) {
      router.push(`/?login&redirect=${redirect}`, `/?login&redirect=${redirect}`);
    } else {
      router.push('/?login&', '/?login');
    }
    client.cache.reset();
    removeNookie('refreshToken');
    removeNookie('accessToken');
  };

  return {
    accessToken,
    refreshToken,
    loggedIn,
    logIn,
    logOut,
  };
}

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

ProvideAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export const withAuth = (Component) => {
  const auth = useAuth();
  const Wrapped = (props) => <Component {...props} auth={auth} />;

  return React.memo(
    Wrapped,
    (prevProps, nextProps) => prevProps.auth.accessToken !== nextProps.auth.accessToken
  );
};
