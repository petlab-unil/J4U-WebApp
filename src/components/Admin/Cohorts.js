import { Card, Row, Col, Form, Input, Button, Switch, DatePicker, List, Collapse } from 'antd';
import moment from 'moment';
import omit from 'lodash/omit';
import { useAllCohorts, useCreateCohort, useUpdateCohort } from 'hooks/cohorts';
import { GroupSelect } from 'components/Select';

const { Panel } = Collapse;

const layout = {
  labelCol: { span: 7 },
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

const CohortForm = ({ form, onChange, save, canSave, reset, initialValues }) => {
  return (
    <Form
      form={form}
      {...layout}
      labelAlign="left"
      onValuesChange={onChange}
      onFinish={save}
      initialValues={initialValues}
    >
      <Row>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Cohort Name"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="groupId" label="Group" rules={[{ required: true, message: 'Required' }]}>
            <GroupItem placeholder="Group" showSearch />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            name="cohortStart"
            label="Cohort Start"
            rules={[{ required: true, message: 'Required' }]}
          >
            <DatePicker />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="cohortEnd"
            label="Cohort End"
            rules={[{ required: true, message: 'Required' }]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            name="search"
            label="Search"
            rules={[{ required: true, message: 'Required' }]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="recommendations"
            label="Recommendations"
            rules={[{ required: true, message: 'Required' }]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            name="alphaFixed"
            label="Alpha Fixed"
            rules={[{ required: true, message: 'Required' }]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="betaFixed"
            label="Beta Fixed"
            rules={[{ required: true, message: 'Required' }]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Col span={12}>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!canSave}>
            Save
          </Button>
          <Button htmlType="button" onClick={reset} disabled={!canSave}>
            Reset
          </Button>
        </Form.Item>
      </Col>
    </Form>
  );
};

const UsersMatched = ({ users }) => {
  return (
    <Collapse>
      <Panel header={`${users.length} users matched`}>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.email}
                description={`Group: ${item.group.name} form done: ${item.formDoneAt}`}
              />
            </List.Item>
          )}
        />
      </Panel>
    </Collapse>
  );
};

const CreateCohort = () => {
  const { form, save, onChange, canSave, reset } = useCreateCohort();

  return (
    <CohortForm
      form={form}
      onChange={onChange}
      canSave={canSave}
      save={save}
      initialValues={{
        search: false,
        recommendations: false,
        alphaFixed: false,
        betaFixed: false,
      }}
      reset={reset}
    />
  );
};

const UpdateCohort = ({ cohort }) => {
  const initialValues = omit({ ...cohort }, ['__typename']);
  initialValues.cohortStart = moment(initialValues.cohortStart);
  initialValues.cohortEnd = moment(initialValues.cohortEnd);
  initialValues.groupId = initialValues.groupId.toString();

  const { form, save, onChange, reset, canSave } = useUpdateCohort();

  return (
    <>
      <CohortForm
        form={form}
        onChange={onChange}
        canSave={canSave}
        save={save}
        initialValues={initialValues}
        reset={reset}
      />
      <UsersMatched users={cohort.users} />
    </>
  );
};

export default () => {
  const { allCohorts, loading, error } = useAllCohorts();

  return (
    <>
      <Card title="Create a Cohort">
        <CreateCohort />
      </Card>
      <Card title="List of Cohorts">
        <Row gutter={[12, 12]}>
          {allCohorts.map((cohort, i) => {
            return (
              <Col key={i} xs={24} lg={12}>
                <Card>
                  <UpdateCohort cohort={cohort} />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    </>
  );
};
