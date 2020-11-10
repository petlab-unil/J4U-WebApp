import axios from 'axios';
import { Row, Col, Tabs, Button } from 'antd';
import { SignupLink, GroupConfig, MailCampaign, Users, Cohorts } from 'components/Admin';
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

    case 'cohorts':
      activeKey = '4';
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

      case '4':
        router.push('/admin?pane=cohorts', '/admin?pane=cohorts', { shallow: true });
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
            <br />
            <Button
              onClick={() => {
                axios({
                  url: `${process.env.API_URI}/activities`,
                  method: 'GET',
                  responseType: 'blob', // important
                })
                  .then(function (response) {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'activities.zip');
                    document.body.appendChild(link);
                    link.click();
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }}
            >
              Download Activities
            </Button>
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

      <TabPane tab="Cohorts" key="4">
        <Cohorts />
      </TabPane>
    </Tabs>
  );
};

export default RolesRequired(TrackVisit(Admin), ['ADMIN']);
