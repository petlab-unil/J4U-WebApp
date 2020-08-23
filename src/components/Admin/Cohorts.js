import { Card, Row, Col, Form, Input, Button, Switch, DatePicker } from 'antd';
import { useAllCohorts, useCreateCohort, useUpdateCohort } from 'hooks/cohorts';
import { GroupSelect } from 'components/Select';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 12,
  },
};

const ItemSelect = (SelectComponent, props) => ({ value, onChange }) => {
  return <SelectComponent value={value} setValue={onChange} {...props} />;
};

const GroupItem = ItemSelect(GroupSelect);

const CohortForm = ({ form, onChange, save, canSave, reset }) => {
  return (
    <Form form={form} {...layout} labelAlign="left" onValuesChange={onChange} onFinish={save}>
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Required' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="groupId" label="Group" rules={[{ required: true, message: 'Required' }]}>
        <GroupItem placeholder="Group" showSearch />
      </Form.Item>

      <Form.Item
        name="cohortStart"
        label="Cohort Start"
        rules={[{ required: true, message: 'Required' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="cohortEnd"
        label="Cohort End"
        rules={[{ required: true, message: 'Required' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="search"
        label="Search"
        rules={[{ required: true, message: 'Required' }]}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="recommendations"
        label="Recommendations"
        rules={[{ required: true, message: 'Required' }]}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="alphaFixed"
        label="Alpha Fixed"
        rules={[{ required: true, message: 'Required' }]}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="betaFixed"
        label="Beta Fixed"
        rules={[{ required: true, message: 'Required' }]}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={!canSave}>
          Save
        </Button>
        <Button htmlType="button" onClick={reset} disabled={!canSave}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

const CreateCohort = () => {
  const { form, save } = useCreateCohort();

  return <CohortForm form={form} onChange={(x) => console.log(x)} canSave={true} save={save} />;
};

const UpdateCohort = () => {};

export default () => {
  const { allCohorts, loading, error } = useAllCohorts();

  return <CreateCohort />;
  return allCohorts.map((cohort, i) => {
    return <CreateCohort />;
  });
};
