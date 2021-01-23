import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { POSITIONS } from 'gql/queries';

export default (avamCode, cantonCode, setTrackingRecomStat) => {
  const [page, setPage] = useState(1);
  const [positions, setPositions] = useState([]);
  const [totalCount, setTotalCount] = useState(null);

  const { loading, error, data } = useQuery(POSITIONS, {
    variables: { professionCodes: [avamCode], page, cantonCode },
  });

  useEffect(() => {
    if (!error && data) {
      setPositions(data.positions.positions);
      setTotalCount(data.positions.totalCount);
    }
  }, [data]);

  // useEffect(() => {
  //   if (avamCode === 101128) console.log('--------', data);
  // }, [positions]);

  return { positions, totalCount, page, setPage, loading };
};
