import { useQuery } from "@apollo/react-hooks";
import { useAuth } from "~/hooks/auth";
import { ME } from "~/gql/queries";
import { parseServerError } from "~/helpers";
import { parse } from "graphql";

export function useMe() {
  const { accessToken, logOut } = useAuth();

  const { loading, error, data } = useQuery(ME, {
    skip: accessToken ? false : true,
    context: {
      headers: {
        accessToken: accessToken
      }
    }
  });

  if (error) {
    const { code } = parseServerError(error.message);
    if (code === 201) {
      logOut();
    }
  }

  return data ? data.me : null;
}
