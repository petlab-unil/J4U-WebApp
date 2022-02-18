import { Form, Row, Col, Button, Slider } from 'antd';
import get from 'lodash/get';
import useMe from 'hooks/me';
import { CantonSelect } from 'components/Select';
import { useTracker } from 'hooks/tracker';
import JobSearch from './JobSearch';

const ItemSelect = (SelectComponent, props) => ({ value, onChange }) => {
  return <SelectComponent value={value} setValue={onChange} {...props} />;
};
const CantonItem = ItemSelect(CantonSelect);

const Recommendation = ({ setRecomVariables }) => {
  const onValuesChange = (v) => console.log(v, 'vvv');

  const me = useMe();
  const alphaFixed = get(me, 'cohort.alphaFixed');
  const betaFixed = get(me, 'cohort.betaFixed');

  const onFinish = (v) => {
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
            label="Emploi précédent"
            name="job"
            rules={[{ required: true, message: 'Champ obligatoire' }]}
          >
            <JobSearch me={me} />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item
            name="cantonCode"
            label="Canton"
            rules={[{ required: true, message: 'Champ obligatoire' }]}
          >
            <CantonItem placeholder="Canton" showSearch />
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
