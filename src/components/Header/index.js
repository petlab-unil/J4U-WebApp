import PropTypes from 'prop-types';
import { Menu, Modal } from 'antd';
import { useRouter } from 'next/router';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styled from 'styled-components';
import useMe from 'hooks/me';
import { useAuth } from 'hooks/auth';
import Logo from './Logo';
import Login from './Login';
import Signup from './Signup';

const LoginModal = ({ visible, reset }) => (
  <Modal
    title="Connection"
    visible={visible}
    onOk={reset}
    onCancel={reset}
    width="500px"
    footer={null}
  >
    <Login />
  </Modal>
);

LoginModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};

const SignupModal = ({ visible, reset }) => (
  <Modal
    title="Connection"
    visible={visible}
    onOk={reset}
    onCancel={reset}
    width="500px"
    footer={null}
  >
    <Signup />
  </Modal>
);

SignupModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};

const Profile = ({ me }) => {
  const Wrapper = styled.span`
    width: 30px;
    margin-right: 50px;
  `;
  if (!me) return null;
  return (
    <Wrapper>
      <UserOutlined />
      {me.email}
    </Wrapper>
  );
};

const Logout = ({ me, logOut }) => {
  if (!me) return null;

  return (
    <Menu.Item key="logout" onClick={() => logOut()}>
      Log Out
    </Menu.Item>
  );
};

const Recommendation = ({ me }) => {
  if (!me) return null;
  if (!me.formDone || me.role !== 'USER') return null;

  return (
    <Menu.Item key="recommandation">
      <Link href="/recommandation">
        <a href="/recommandation">Recommandations</a>
      </Link>
    </Menu.Item>
  );
};

export default () => {
  const router = useRouter();
  if (router.pathname === '/logout') return null;
  const me = useMe();
  const { logOut } = useAuth();

  const loginVisible = 'login' in router.query;
  const signupVisible = 'signup' in router.query;

  const reset = () => router.push('/', '/', { shallow: true });

  const selectedKey = () => {
    const { pathname, query } = router;
    if (pathname === '/recommandation') {
      return 'recommandation';
    }
    if (pathname === '/' && 'login' in query) {
      return 'login';
    }
    if (pathname === '/admin') {
      return 'admin';
    }
    return '';
  };

  return (
    <>
      <LoginModal visible={loginVisible} reset={reset} />
      <SignupModal visible={signupVisible} reset={reset} />
      <Menu
        mode="horizontal"
        theme="light"
        style={{ lineHeight: '64px' }}
        selectedKeys={[selectedKey()]}
      >
        <Logo />
        <Profile me={me} />
        {!me ? (
          <Menu.Item key="login">
            <Link href="/?login" shallow>
              <a href="?login"> Se Connecter</a>
            </Link>
          </Menu.Item>
        ) : null}
        {me && me.formDone && me.role === 'USER' ? (
          <Menu.Item key="recommandation">
            <Link href="/recommandation">
              <a href="/recommandation">Recommandations</a>
            </Link>
          </Menu.Item>
        ) : null}
        {me && me.role === 'ADMIN' ? (
          <Menu.Item key="admin">
            <Link href="/admin">
              <a href="/admin">Admin</a>
            </Link>
          </Menu.Item>
        ) : null}
        {me ? (
          <Menu.Item key="logout" onClick={() => logOut()}>
            Logout
          </Menu.Item>
        ) : null}
        <Menu.Item key="contact">
          <Link href="/contact" shallow>
            <a href="contact">Contact</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="legal">
          <Link href="/legal" shallow>
            <a href="legal">Legal</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="tirage">
          <Link href="/tirage" shallow>
            <a href="tirage">Tirage</a>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};
