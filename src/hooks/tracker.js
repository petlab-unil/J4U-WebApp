import { useApolloClient } from '@apollo/client';
import { useState, useEffect, memo } from 'react';
import { CREATE_EVENT } from 'gql/mutations';
import { useAuth } from 'hooks/auth';

class Tracker {
  constructor(accessToken, client) {
    this.accessToken = accessToken;
    this.client = client;
  }

  track(type, payload) {
    const token = this.accessToken;
    console.log(token, type, payload, JSON.stringify(payload));
    if (!token) return;
    this.client
      .mutate({
        mutation: CREATE_EVENT,
        variables: { event: { type, payload: JSON.stringify(payload) } },
        context: {
          headers: {
            accessToken: token,
          },
        },
      })
      .then((x) => console.log(x))
      .catch((err) => console.error(err));
  }
}

export const useTracker = () => {
  const client = useApolloClient();
  const { accessToken } = useAuth();
  const [tracker, setTracker] = useState(new Tracker(accessToken, client));

  useEffect(() => {
    console.log('KAMARU');
    setTracker(new Tracker(accessToken, client));
  }, [accessToken]);

  return tracker;
};

export const withTracker = (Component) => {
  const Wrapped = (props) => {
    const tracker = useTracker();
    return <Component {...props} tracker={tracker} />;
  };
  return Wrapped;
};
