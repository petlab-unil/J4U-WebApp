import AuthSwitch from 'components/HOC/AuthSwitch';
import AnonHome from './AnonHome';
import UserHome from './UserHome';
import AdminHome from './AdminHome';

export default AuthSwitch({
  anon: <AnonHome />,
  user: <UserHome />,
  admin: <AdminHome />,
});
