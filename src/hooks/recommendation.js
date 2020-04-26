import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RECOMMENDATIONS } from 'gql/queries';
import { useAuth } from 'hooks/auth';

export default () => {
  const [recomVariables, setRecomVariables] = useState(undefined);
  const { accessToken } = useAuth();

  const { loading, error, data } = useQuery(RECOMMENDATIONS, {
    skip: !recomVariables,
    variables: { ...recomVariables },
    context: {
      headers: {
        accessToken,
      },
    },
  });

  if (loading || error || !data) return { recoms: [], setRecomVariables };

  return { recoms: data.recommendations.results, setRecomVariables };
};
