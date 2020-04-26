import { useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { POSITIONS } from 'gql/queries';

export default (avamCode) => {
  const { loading, error, data } = useQuery(POSITIONS, {
    variables: { professionCodes: [avamCode], page: 1 },
  });

  if (loading || error) return { positions: [], loading };

  const {
    positions: { positions, totalCount },
  } = data;
  return { positions, totalCount, loading };
};
