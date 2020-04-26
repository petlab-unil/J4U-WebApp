import { useQuery } from '@apollo/react-hooks';
import { useAuth } from 'hooks/auth';
import { ME } from 'gql/queries';

export default function () {
  const { accessToken } = useAuth();

  const { data } = useQuery(ME, {
    skip: !accessToken,
    context: {
      headers: {
        accessToken,
      },
    },
  });

  return data ? data.me : null;
}
