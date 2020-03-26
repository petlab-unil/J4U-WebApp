import { useMutation } from "@apollo/react-hooks";
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
  const [auth] = useMutation(AUTH);
  const router = useRouter();

  console.log(nookies, "ajkfjkfajsdk");

  const accessToken = nookies.accessToken;
  const refreshToken = nookies.refreshToken;
  const loggedIn = accessToken && refreshToken;

  const logIn = (email, password) => {
    auth({ variables: { email, password } })
      .then(({ data }) => {
        if (!data) return;
        console.log(data);
        setNookie("accessToken", data.auth.accessToken);
        setNookie("refreshToken", data.auth.refreshToken);
        message.success("Connection reussie!");

        console.log(router.query);

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
    removeNookie("accessToken");
    removeNookie("refreshToken");
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
    logIn,
    logOut
  };
}
