import { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { AUTH } from "~/gql/mutations";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required")
});

async function val(form, schema) {
  const values = {};
  Object.keys(schema.fields).forEach(k => {
    values[k] = form.getFieldValue(k);
  });

  const errorsSchema = {};
  Object.keys(schema.fields).forEach(k => {
    errorsSchema[k] = { name: k, value: form.getFieldValue(k), errors: [] };
  });

  const errors = await schema
    .validate(values, { abortEarly: false })
    .then(_ => [])
    .catch(function(err) {
      err.inner.forEach(item => {
        errorsSchema[item.path].errors.push(item.errors);
      });
      return errorsSchema;
    });
  form.setFields(Object.values(errorsSchema));
}

export default function() {
  const [form] = Form.useForm();
  const [auth, { data }] = useMutation(AUTH);

  //console.log(data);

  const onFinish = values => {
    //console.log(values);
    auth({ variables: { email: values.email, password: values.password } });
  };

  return (
    <Form
      name="normal_login"
      form={form}
      className="login-form"
      initialValues={{ remember: true }}
      onChange={_ => val(form, LoginSchema)}
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
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
}
