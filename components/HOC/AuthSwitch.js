import { useAuth } from 'hooks/auth';
import { useMe } from 'hooks/me';

const baseConfig = {
  anonymous: null,
  user: null,
  admin: null,
};

export default (switchConfig) => {
  const conf = { ...baseConfig, ...switchConfig };


  return () => {
    const {loggedIn} = useAuth
  };
};
