import { useQuery } from '@apollo/client';
import { useAuth } from 'hooks/auth';
import { ME } from 'gql/queries';

export default function () {
  const { accessToken } = useAuth();
  const { data, error, loading } = useQuery(ME, {
    skip: !accessToken,
    context: {
      headers: {
        accessToken,
      },
    },
  });

  console.log(error, loading);

  return data ? data.me : null;
}
