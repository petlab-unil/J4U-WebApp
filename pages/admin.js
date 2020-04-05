import { Row, Col } from 'antd';
import RolesRequired from './RolesRequiredPage';
import { SignupLink, GroupConfig } from '~/components/Admin';

const Admin = () => {
  return (
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
  );
};

export default RolesRequired(Admin, ['ADMIN']);
