import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { Spin, Alert, Input, Button, message } from 'antd';
import { RESET_PASSWROD } from 'gql/mutations';
import { parseServerError } from 'helpers';

export default () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const [resetPassword, { loading, error, data }] = useMutation(RESET_PASSWROD, {
    onError: (err) => console.log(err),
    onCompleted: () => message.success('Consultez votre boite email'),
  });

  return (
    <>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button
        onClick={() =>
          resetPassword({
            variables: {
              email,
            },
          })
        }
      >
        Valider
      </Button>
    </>
  );
};
