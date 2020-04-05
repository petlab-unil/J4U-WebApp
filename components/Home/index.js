import AnonHome from './AnonHome';
import UserHome from './UserHome';
import AdminHome from './AdminHome';
import useMe from '~/hooks/me';

export default function () {
  const me = useMe();

  if (me && me.role === 'ADMIN') {
    return <AdminHome />;
  }
  if (me && me.role === 'USER') {
    return <UserHome />;
  }

  return <AnonHome />;
}
