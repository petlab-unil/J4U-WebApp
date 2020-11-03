import { useState } from 'react';
import { useQuery } from '@apollo/client';
import pick from 'lodash/pick';
import { RECOMMENDATIONS } from 'gql/queries';
import { useAuth } from 'hooks/auth';

export default () => {
  const [recomVariables, setRecomVariables] = useState(undefined);
  const { accessToken } = useAuth();

  const { cantonCode, oldJobData } = pick(recomVariables, [
    'oldJobData.isco08',
    'oldJobData.title',
    'cantonCode',
  ]);
  const variables = pick(recomVariables, ['alpha', 'beta']);
  variables.oldJobIsco08 = !oldJobData || oldJobData.isco08;
  variables.oldJobTitle = !oldJobData || oldJobData.title;
  variables.cantonCode = cantonCode;

  const { loading, error, data } = useQuery(RECOMMENDATIONS, {
    skip: !recomVariables,
    variables,
    context: {
      headers: {
        accessToken,
      },
    },
  });

  if (loading || error || !data) return { recoms: [], setRecomVariables };

  console.log(data.recommendations.results);

  return { recoms: data.recommendations.results, setRecomVariables, cantonCode };
};
