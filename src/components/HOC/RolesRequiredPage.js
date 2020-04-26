import AuthRequiredPage from './AuthRequiredPage';
import { useRolesRequired } from 'hooks/protection';

export default function RolesRequiredPage(Page, roles) {
  const RolesProtected = () => {
    const ok = useRolesRequired(roles);
    if (ok) {
      return <Page />;
    }
    return null;
  };

  return AuthRequiredPage(RolesProtected);
}
