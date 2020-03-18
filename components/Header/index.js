import AnonHeader from "./AnonHeader";
import AuthHeader from "./AuthHeader";
import { useAuth } from "~/hooks/auth";

export default function() {
  const { loggedIn } = useAuth();
  console.log(loggedIn, "aaaaa");

  if (loggedIn) {
    return <AuthHeader />;
  } else {
    return <AnonHeader />;
  }
}
