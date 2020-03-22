import Link from "next/link";
import { Form, Input, Button, Checkbox, Select, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useAuth } from "~/hooks/auth";
import { useForm } from "~/hooks/form";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required")
});

export default function() {
  const { form, validate, isValid } = useForm(LoginSchema);
  const { logIn } = useAuth();

  const onFinish = ({ email, password }) => {
    if (isValid()) {
      logIn(email, password);
    } else {
      message.warning("Certains champs sont invalides");
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
      <Form.Item name="email" required={true}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item name="password" required={true}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
        Ou
        <Link href="/?signup" shallow>
          <a> S'inscrire</a>
        </Link>
      </Form.Item>
    </Form>
  );
}
