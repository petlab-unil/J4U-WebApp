import { Result, Button } from "antd";
import { useRouter } from "next/router";

export default props => {
  const router = useRouter();

  const page = router.query.page;

  return (
    <Result
      status="403"
      title={`${page} 403 `}
      subTitle={`Sorry, you are not authorized to access  ${page}.`}
      extra={
        <Button onClick={() => router.push("/", "/")} type="primary">
          Back Home
        </Button>
      }
    />
  );
};
