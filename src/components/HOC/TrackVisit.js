import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { withTracker } from 'hooks/tracker';

export default (Page) => {
  return withTracker(({ tracker, ...props }) => {
    const { pathname } = useRouter();

    useEffect(() => {
      tracker.track('PAGE_VISIT', { pathname });
    }, []);

    return <Page {...props} />;
  });
};
