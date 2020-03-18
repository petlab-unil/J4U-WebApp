import { Form, Input, Button, Checkbox, Select, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useAuth } from "~/hooks/auth";
import { useForm } from "~/hooks/form";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null])
    .required("Required")
});

export default function() {
  const { form, validate, isValid } = useForm(SignupSchema);
  const { logIn } = useAuth();

  const onFinish = values => {
    if (isValid()) {
      console.log(values);
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
      <Form.Item name="firstName" required={true}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Prenom"
        />
      </Form.Item>

      <Form.Item name="lastName" required={true}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nom"
        />
      </Form.Item>

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
          placeholder="Mot de passe"
        />
      </Form.Item>

      <Form.Item name="passwordConfirmation" required={true}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirmation du mot de passe"
        />
      </Form.Item>

      <Form.Item>
        <Button
          disabled={!isValid()}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
}
