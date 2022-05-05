import { useApolloClient } from '@apollo/client';
import { useState, useEffect, memo } from 'react';
import { CREATE_ACTIVITY } from 'gql/mutations';
import { useAuth } from 'hooks/auth';
import { message } from 'antd';

class Tracker {
  constructor(accessToken, client) {
    this.accessToken = accessToken;
    this.client = client;
  }

  track(type, payload) {
    const token = this.accessToken;
    if (!token) return;
    this.client
      .mutate({
        mutation: CREATE_ACTIVITY,
        variables: { activity: { type, payload: JSON.stringify(payload) } },
        context: {
          headers: {
            accessToken: token,
          },
        },
      })
      // To debug
      // .then((_) => message.info(`TYPE: ${type} -- PAYLOAD: ${JSON.stringify(payload, null, 4)}`, 5))
      // .catch((err) => message.error(JSON.stringify(err), 5));
  }
}

export const useTracker = () => {
  const client = useApolloClient();
  const { accessToken } = useAuth();
  const [tracker, setTracker] = useState(new Tracker(accessToken, client));

  useEffect(() => {
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
