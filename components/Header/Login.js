import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { useAuth } from '~/hooks/auth';
import useForm from '~/hooks/form';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required'),
});

export default function () {
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
    >
      <Form.Item name="email" required>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" required>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <a className="login-form-forgot" href="/aa">
          Mot de passe oublie
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={!isValid}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
