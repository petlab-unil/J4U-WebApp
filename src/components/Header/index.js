import { useAuth } from 'hooks/auth';
import AnonHeader from './AnonHeader';
import AuthHeader from './AuthHeader';

export default () => {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <AuthHeader />;
  }
  return <AnonHeader />;
};
