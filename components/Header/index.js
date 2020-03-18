import AnonHeader from "./AnonHeader";
import { useAuth } from "~/hooks/auth";

export default function() {
  const { loggedIn } = useAuth();
  console.log(loggedIn, "aaaaa");

  if (loggedIn) {
    return null;
  } else {
    return <AnonHeader />;
  }
}
