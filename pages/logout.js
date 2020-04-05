import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '~/hooks/auth';

export default () => {
  const router = useRouter();
  const { logOut } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      const { redirect } = router.query;
      logOut(redirect);
    }, 1000);
  }, []);
  return <div>Vous allez etre deconnecte ...</div>;
};
