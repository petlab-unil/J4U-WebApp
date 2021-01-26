import { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Form, Input, Button, Radio, message, DatePicker, AutoComplete } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import useForm from 'hooks/form';
import { CREATE_USER } from 'gql/mutations';
import jobs from 'jobs-reg.json';
import Fuse from 'fuse.js';
import capitalize from 'lodash/capitalize';

const SignupSchema = Yup.object().shape({
  civilite: Yup.string().oneOf(['MLLE', 'MME', 'M'], 'Erreur').required('Champ obligatoire'),
  oldJobSignup: Yup.string().required('Champ obligatoire'),
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
  avs: Yup.string().test('AVS', 'AVS invalide', (value) => {
    const v = value || '';
    const len = (v || '').replace(/\D+/g, '').length;
    console.log(v, len, 'aaaa');
    return len === 10 || len === 0;
  }),
});

const AVSInput = ({ value, onChange }) => {
  const v = value || '..';

  const s = v.split('.');

  const [v1, v2, v3] = s;

  const set = (num, pos) => {
    const x = [v1, v2, v3];
    x[pos] = num.replace(/\D+/g, '');
    const res = x.join('.');
    onChange(res);
  };

  return (
    <div>
      {'AVS: 756'}
      {/* <Input disabled value="756" style={{ width: '60px' }} /> */}
      {' . '}
      <Input
        value={v1}
        onChange={(e) => set(e.target.value, 0)}
        maxLength={4}
        style={{ width: '60px' }}
      />
      {' . '}
      <Input
        value={v2}
        onChange={(e) => set(e.target.value, 1)}
        maxLength={4}
        style={{ width: '60px' }}
      />
      {' . '}
      <Input
        value={v3}
        onChange={(e) => set(e.target.value, 2)}
        maxLength={2}
        style={{ width: '45px' }}
      />
    </div>
  );
};

const oldJobOptions = jobs
  .slice(0, 8000)
  .map((x) => ({ label: capitalize(x.BERUF_M_FR), value: x.isco08 }));

const fuse = new Fuse(oldJobOptions, {
  keys: ['label'],
});

const JobSearch = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);

  const searchOptions = (x) => {
    console.log(x);
    const res = fuse
      .search(x)
      .slice(0, 20)
      .map((x) => x.item);
    setOptions([...res]);
  };

  let o = options.map(({ label, value }) => ({
    key: label,
    isco08: value,
    value: label,
    label: <div>{label}</div>,
  }));

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      style={{
        width: '100%',
      }}
      filterOption={false}
      options={[...o]}
      onSelect={(x) => {
        console.log(x, onChange);
        onChange(x);
      }}
      onSearch={searchOptions}
      optionFilterProp="label"
    >
      <Input.Search size="medium" placeholder="Emploi précédent" enterButton />
    </AutoComplete>
  );
};

// const res = fuse.search('Agricul');
// console.log(oldJobOptions);
// console.log(res);

export default () => {
  const router = useRouter();
  const { form, validate, isValid } = useForm(SignupSchema);
  const [createUser] = useMutation(CREATE_USER);

  const { token } = router.query;

  const onFinish = async (values) => {
    values.oldJobSignup = values.oldJobSignup;

    if (values.avs) values.avs = '756' + values.avs.replace(/\D+/g, '');

    if (isValid) {
      values.birthDate = moment(values.birthDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

      delete values.emailConfirmation;
      delete values.passwordConfirmation;

      await createUser({
        variables: {
          user: values,
          token,
        },
      });
      message.success(
        'Compte cree avec succes! Veuillez verifier votre adresse email en cliquant sur le lien qui vous a ete envoye'
      );
      router.push('/?login', '/?login');
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
      onValuesChange={validate}
      onFinish={onFinish}
      validateMessages={{
        required: '${name} obligatoire',
      }}
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
      <Form.Item name="avs">
        <AVSInput />
      </Form.Item>
      <Form.Item name="birthDate" required>
        <DatePicker placeholder="Date de naissance" />
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
      Merci d'indiquer l'emploi exercé avant votre épisode de chômage ou votre emploi actuel si vous
      n’êtes pas inscrit au chômage
      <Form.Item
        name="oldJobSignup"
        required
        rules={[{ required: true, message: 'Champ obligatoire' }]}
      >
        <JobSearch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={!isValid}>
          S'inscrire
        </Button>
        Ou
        <Link href="/?login" shallow>
          <a href="/?login"> Se connecter</a>
        </Link>
      </Form.Item>
    </Form>
  );
};
