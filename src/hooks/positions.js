import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { POSITIONS } from 'gql/queries';

export default (avamCode) => {
  const [page, setPage] = useState(1);
  const [positions, setPositions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const { loading, error, data } = useQuery(POSITIONS, {
    variables: { professionCodes: [avamCode], page },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setPositions(data.positions.positions);
      setTotalCount(data.positions.totalCount);
    }
  }, [data]);

  return { positions, totalCount, page, setPage, loading };
};
