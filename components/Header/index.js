import AnonHeader from './AnonHeader';
import AuthHeader from './AuthHeader';
import { useAuth } from '~/hooks/auth';

export default function () {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <AuthHeader />;
  }
  return <AnonHeader />;
}
