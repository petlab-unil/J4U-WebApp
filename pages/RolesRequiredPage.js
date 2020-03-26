import AuthRequiredPage from "./AuthRequiredPage";
import { useRolesRequired, useAuthRequired } from "~hooks/protection";

export default function RolesRequiredPage(Page, roles) {
  const RolesProtected = () => {
    const ok = useRolesRequired(roles);
    if (ok) {
      return <Page />;
    } else {
      return null;
    }
  };

  return AuthRequiredPage(RolesProtected);
}
