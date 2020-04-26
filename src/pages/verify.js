import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Spin, Alert } from 'antd';
import { VERIFY_USER } from 'gql/mutations';
import { parseServerError } from 'helpers';

export default (p) => {
  const router = useRouter();

  const [verifyUser, { loading, error, data }] = useMutation(VERIFY_USER, {
    onError: (err) => console.log(err),
  });

  const { token } = router.query;

  useEffect(() => {
    if (token) verifyUser({ variables: { token } });
  }, []);

  if (error) {
    const { errorMsg } = parseServerError(error.message);
    return (
      <div>
        <Alert
          message="Verification Impossible"
          description="Votre adresse email n'a pas pu etre verifiee"
          type="error"
        />
        <Alert description={errorMsg} type="error" />
      </div>
    );
  }

  if (loading) {
    return <Spin tip="Loading" />;
  }

  if (data) {
    return (
      <div>
        <Alert
          message="Adresse Email Verifiee"
          description="Vous avez verifiee votre adresse email avec succes. Vous pouvez maintenant utiliser les services du site J4U"
          type="success"
        />
        <Link href="/?login" n>
          <a href="/?login"> Se connecter</a>
        </Link>
      </div>
    );
  }

  if (token) {
    return <div>akjdsfnjks</div>;
  }
  return <div> oh oh oh </div>;
};
