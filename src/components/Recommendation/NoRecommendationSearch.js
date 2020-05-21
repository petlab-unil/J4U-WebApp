import { Form, Row, Col, Button, Slider } from 'antd';
import get from 'lodash/get';
import useMe from 'hooks/me';
import JobSearch from './JobSearch';

const Recommendation = ({ setRecomVariables }) => {
  const onValuesChange = (v) => console.log(v, 'vvv');

  const me = useMe();
  const alphaFixed = get(me, 'group.uiConfig.alphaFixed');
  const betaFixed = get(me, 'group.uiConfig.betaFixed');

  const onFinish = (v) => {
    console.log(v, 'aaaaaaaaaaaaa');
    setRecomVariables(v);
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      onValuesChange={onValuesChange}
      style={{ width: '100%' }}
      onFinish={onFinish}
    >
      <br />
      <Row gutter={[24, 2]}>
        <Col lg={8} xs={12}>
          <Form.Item
            label="Job"
            name="job"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <JobSearch me={me} />
          </Form.Item>
        </Col>

        <Col lg={4} xs={6}>
          <Form.Item label="Rechercher">
            <Button type="primary" htmlType="submit">
              Recommander
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Recommendation;
