import { useMe } from "~hooks/me";
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";

export default function() {
  const me = useMe();
  if (!me) return null;

  if (me.role === "USER") {
    return <UserHeader/>
  } else {
    return <AdminHeader/>
  }

}
