import { useAuthRequired } from "~hooks/protection";

export default function AuthRequired(Page) {
  return () => {
    const ok = useAuthRequired();
    if (ok) {
      return <Page />;
    } else {
      return null;
    }
  };
}
