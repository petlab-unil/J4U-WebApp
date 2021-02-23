import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { useAuth } from 'hooks/auth';
import useForm from 'hooks/form';
import Link from 'next/link';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email non valide').required('Champ obligatoire'),
  password: Yup.string().min(2, 'Trop court').max(30, 'Trop long').required('Champ obligatoire'),
});

export default () => {
  const { form, validate, isValid } = useForm(LoginSchema);
  const { logIn } = useAuth();

  const onFinish = ({ email, password }) => {
    if (isValid) {
      logIn(email, password);
    } else {
      message.warning('Certains champs sont invalides');
    }
  };

  return (
    <Form
      name="normal_login"
      form={form}
      className="login-form"
      initialValues={{ remember: true }}
      onChange={validate}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item label="Email" name="email" required>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item label="Mot de passe" name="password" required>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mot de passe"
        />
      </Form.Item>

      <Form.Item>
        <Link href="/reset">
          <a className="login-form-forgot" href="/reset">
            Mot de passe oublié
          </a>
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={!isValid}>
          Se Connecter
        </Button>
      </Form.Item>
    </Form>
  );
};
