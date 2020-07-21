import { Row, Col, Tabs } from 'antd';
import { SignupLink, GroupConfig, MailCampaign } from 'components/Admin';
import RolesRequired from 'components/HOC/RolesRequiredPage';
import TrackVisit from 'components/HOC/TrackVisit';

const { TabPane } = Tabs;

const Admin = () => {
  return (
    <Tabs defaultActiveKey="1">
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
    </Tabs>
  );
};

export default RolesRequired(TrackVisit(Admin), ['ADMIN']);
