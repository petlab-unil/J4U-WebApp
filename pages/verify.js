import { useRouter } from "next/router";

export default props => {
  const router = useRouter();

  const { token } = router.query;

  if (token) {
    return <div>akjdsfnjks</div>;
  } else {
    return <div> oh oh oh </div>;
  }
};
