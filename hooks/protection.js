import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './auth';
import useMe from './me';

export function useAuthRequired() {
  const router = useRouter();
  const { loggedIn } = useAuth();

  const { pathname } = router;
  const ok = loggedIn;

  useEffect(() => {
    if (!ok) {
      router.push(`/?login&redirect=${pathname}`, `/?login&redirect=${pathname}`);
    }
  }, [ok]);

  return ok;
}

export function useRolesRequired(roles) {
  const router = useRouter();
  const me = useMe();

  const { pathname } = router;
  const ok = me && roles.includes(me.role);

  useEffect(() => {
    if (me && !ok) {
      router.push(`/403?page=${pathname}`, `/403?page=${pathname}`);
    }
  }, [me]);

  return ok;
}
