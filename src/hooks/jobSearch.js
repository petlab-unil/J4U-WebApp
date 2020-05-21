import { useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import throttle from 'lodash/throttle';
import { JOB_SEARCH_HINTS } from 'gql/queries';

export default (onChange) => {
  const [query, setQuery] = useState('');
  const { loading, error, data } = useQuery(JOB_SEARCH_HINTS, {
    variables: { query, limit: 10 },
  });

  const onSelect = (value, option) => {
    onChange({
      isco08: option.isco08,
      avam: option.avam,
      title: option.value,
    });
  };
  const handleSearch = (keywords) => {
    setQuery(keywords);
  };
  const throttledSearch = useRef(throttle(handleSearch, 1000)).current;

  let optionsObj = [];

  if (loading || error) return { optionsObj, onSelect, handleSearch: throttledSearch, loading };

  optionsObj = data.jobSearchHints.map((x) => ({
    ...x,
  }));

  return { optionsObj, query, onSelect, handleSearch: throttledSearch, loading };
};
