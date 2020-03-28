import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useContext, createContext } from "react";
import useStorage from "next-nookies-persist";
import { useRouter } from "next/router";
import { message } from "antd";
import { AUTH } from "~/gql/mutations";

const authContext = createContext();
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth() {
  const { nookies, setNookie, removeNookie } = useStorage();
  const client = useApolloClient();
  const [auth] = useMutation(AUTH);
  const router = useRouter();

  const accessToken = nookies.accessToken;
  const refreshToken = nookies.refreshToken;
  const loggedIn = accessToken && refreshToken;

  const logIn = (email, password) => {
    auth({ variables: { email, password } })
      .then(({ data }) => {
        if (!data) return;
        setNookie("accessToken", data.auth.accessToken);
        setNookie("refreshToken", data.auth.refreshToken);
        message.success("Connection reussie!");

        if (router.query.redirect) {
          router.push(router.query.redirect, router.query.redirect);
        } else {
          router.push("/", "/", { shallow: true });
        }
      })
      .catch(err => console.log(err.message));
  };

  const signup = (email, password) => {
    console.log("signup");
  };

  const logOut = () => {
    router.push("/?login", "/?login");
    client.cache.reset();
    removeNookie("accessToken");
    removeNookie("refreshToken");
  };

  return {
    accessToken,
    refreshToken,
    loggedIn,
    logIn,
    logOut
  };
}
