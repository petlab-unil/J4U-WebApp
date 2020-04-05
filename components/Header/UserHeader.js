import { Menu } from 'antd';
import useMe from '~hooks/me';
import { useAuth } from '~hooks/auth';
import Logo from './Logo';

export default function () {
  const me = useMe();
  const { logOut } = useAuth();
  if (!me) return null;

  return (
    <>
      <Logo>J4U</Logo>
      <Menu mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
        <Menu.Item key="1">{`Bienvenue ${me.firstName} ${me.lastName}`}</Menu.Item>
        <Menu.Item key="2">{me.email}</Menu.Item>
        <Menu.Item onClick={() => logOut()} key="4">
          Log Out
        </Menu.Item>
      </Menu>
    </>
  );
}
