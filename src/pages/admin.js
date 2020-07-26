import { Row, Col, Tabs } from 'antd';
import { SignupLink, GroupConfig, MailCampaign, Users } from 'components/Admin';
import RolesRequired from 'components/HOC/RolesRequiredPage';
import TrackVisit from 'components/HOC/TrackVisit';
import { useRouter } from 'next/router';

const { TabPane } = Tabs;

const Admin = () => {
  const router = useRouter();

  let activeKey;

  switch (router.query.pane) {
    case 'general':
      activeKey = '1';
      break;

    case 'campaigns':
      activeKey = '2';
      break;

    case 'users':
      activeKey = '3';
      break;

    default:
      activeKey = '1';
      break;
  }

  const onChange = (key) => {
    switch (key) {
      case '1':
        router.push('/admin?pane=general', '/admin?pane=general', { shallow: true });
        break;

      case '2':
        router.push('/admin?pane=campaigns', '/admin?pane=campaigns', { shallow: true });
        break;

      case '3':
        router.push('/admin?pane=users', '/admin?pane=users', { shallow: true });
        break;

      default:
        break;
    }
  };

  return (
    <Tabs activeKey={activeKey} onTabClick={onChange}>
      <TabPane tab="General Config" key="1">
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <div>ADMIN CONTENT</div>
          </Col>
          <Col lg={12} span={24}>
            <SignupLink />
          </Col>
          <Col lg={12} span={24}>
            <GroupConfig />
          </Col>
        </Row>
      </TabPane>

      <TabPane tab="Mail Campaigns" key="2">
        <MailCampaign />
      </TabPane>

      <TabPane tab="Users" key="3">
        <Users />
      </TabPane>
    </Tabs>
  );
};

export default RolesRequired(TrackVisit(Admin), ['ADMIN']);
