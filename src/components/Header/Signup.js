import Link from 'next/link';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Form, Input, Button, Radio, message, DatePicker } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import useForm from 'hooks/form';
import { CREATE_USER } from 'gql/mutations';

const SignupSchema = Yup.object().shape({
  civilite: Yup.string().oneOf(['MLLE', 'MME', 'M'], 'Erreur').required('Champ obligatoire'),
  firstName: Yup.string().required('Champ obligatoire'),
  lastName: Yup.string().required('Champ obligatoire'),
  birthDate: Yup.date()
    .test('DOB', '18 ans minimum', (value) => {
      return moment().diff(moment(value), 'years') >= 18;
    })
    .required('Champ obligatoire'),
  phone: Yup.string().required('Champ obligatoire'),
  email: Yup.string().email('Invalid email').required('Champ obligatoire'),
  emailConfirmation: Yup.string()
    .oneOf([Yup.ref('email'), null], 'Email et confirmation differents')
    .email('Invalid email')
    .required('Champ obligatoire'),
  password: Yup.string()
    .min(5, 'Minimum 5 characteres!')
    .max(20, 'Maximum 20 characteres!')
    .required('Champ obligatoire'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mot de passe et confirmation differents')
    .required('Champ obligatoire'),
});

export default () => {
  const router = useRouter();
  const { form, validate, isValid } = useForm(SignupSchema);
  const [createUser] = useMutation(CREATE_USER);

  const { token } = router.query;

  const onFinish = (values) => {
    if (isValid) {
      values.birthDate.format('YYYY-MM-DD');
      createUser({
        variables: {
          user: values,
          token,
        },
      });
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
      <Form.Item name="civilite">
        <Radio.Group>
          <Radio.Button value="MLLE">Mlle</Radio.Button>
          <Radio.Button value="MME">Mme</Radio.Button>
          <Radio.Button value="M">M</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="firstName" required>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Prenom" />
      </Form.Item>

      <Form.Item name="lastName" required>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nom" />
      </Form.Item>

      <Form.Item name="birthDate" required>
        <DatePicker format="YYYY-MM-DD" onChange={validate} />
      </Form.Item>

      <Form.Item name="phone" required>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Numero de telephone"
        />
      </Form.Item>

      <Form.Item name="email" required>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item name="emailConfirmation" required>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Confirmation de l'email"
        />
      </Form.Item>

      <Form.Item name="password" required>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Mot de passe"
        />
      </Form.Item>

      <Form.Item name="passwordConfirmation" required>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirmation du mot de passe"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={!isValid}>
          Signup
        </Button>
        Ou
        <Link href="/?login" shallow>
          <a href="/?login"> Se connecter</a>
        </Link>
      </Form.Item>
    </Form>
  );
};
