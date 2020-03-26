import { useQuery } from "@apollo/react-hooks";
import { useAuth } from "~/hooks/auth";
import { ME } from "~/gql/queries";

export function useMe() {
  const { accessToken } = useAuth();

  const { loading, error, data } = useQuery(ME, {
    skip: accessToken ? false : true,
    context: {
      headers: {
        accessToken: accessToken
      }
    }
  });

  return data ? data.me : null;
}
