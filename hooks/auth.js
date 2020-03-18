import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { useState, useContext, createContext } from "react";
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
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [auth] = useMutation(AUTH);

  const logIn = (email, password) => {
    auth({ variables: { email, password } })
      .then(({ data }) => {
        if (!data) return;
        setAccessToken(data.auth.accessToken);
        setRefreshToken(data.auth.refreshToken);
        setLoggedIn(true);
        message.success("Connection reussie!");
      })
      .catch(err => console.log(err.message));
  };

  const signup = (email, password) => {
    console.log("signup");
  };

  const signout = () => {
    console.log("signout");
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  //useEffect(() => {
  //});

  //  // Cleanup subscription on unmount
  //  return () => unsubscribe();
  //}, []);

  // Return the user object and auth methods
  return {
    accessToken,
    refreshToken,
    loggedIn,
    logIn
  };
}
