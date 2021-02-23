import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { Spin, Alert, Input, Button, message } from 'antd';
import { UPDATE_PASSWORD } from 'gql/mutations';
import { parseServerError } from 'helpers';

export default () => {
  const router = useRouter();
  const [password, setPassword] = useState('');

  const { token } = router.query;

  const [updatePassword, { loading, error, data }] = useMutation(UPDATE_PASSWORD, {
    onError: (err) => console.log(err),
    onCompleted: () => message.success('Succes, veuillez vous connecter'),
  });

  return (
    <>
      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={() =>
          updatePassword({
            variables: {
              token,
              password,
            },
          })
        }
      >
        Valider
      </Button>
    </>
  );
};
