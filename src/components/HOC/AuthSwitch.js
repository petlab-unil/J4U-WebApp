import { cloneElement } from 'react';
import useMe from 'hooks/me';

const baseConfig = {
  anonymous: null,
  user: null,
  admin: null,
};

export default (switchConfig) => {
  const config = { ...baseConfig, ...switchConfig };

  return () => {
    const me = useMe();

    if (!me) {
      return config.anon;
    }
    if (me.role === 'ADMIN') {
      return cloneElement(config.admin, { me });
    }
    if (me.role === 'USER') {
      return cloneElement(config.user, { me });
    }
    return null;
  };
};
