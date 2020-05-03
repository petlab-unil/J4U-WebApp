import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Link from 'next/link';
import useMe from 'hooks/me';
import { useAuth } from 'hooks/auth';
import Logo from './Logo';

const Profile = ({ me }) => {
  const Wrapper = styled.span`
    width: 30px;
    margin-right: 50px;
  `;
  return (
    <Wrapper>
      <UserOutlined />
      {me.email}
    </Wrapper>
  );
};

export default () => {
  const me = useMe();
  const { logOut } = useAuth();
  if (!me) return null;

  return (
    <Menu mode="horizontal" theme="light" style={{ lineHeight: '64px' }}>
      <Logo />
      <Profile me={me} />
      {me.formDone ? (
        <Menu.Item key="3">
          <Link href="/recommandation">
            <a href="/recommandation">Recommandations</a>
          </Link>
        </Menu.Item>
      ) : null}
      <Menu.Item onClick={() => logOut()} key="4">
        Log Out
      </Menu.Item>
    </Menu>
  );
};
