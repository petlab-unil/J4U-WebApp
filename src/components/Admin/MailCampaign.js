import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Descriptions,
  Badge,
  Select,
  Spin,
} from 'antd';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/client';
import { SurveySelect, GroupSelect } from 'components/Select';
import { useAuth } from 'hooks/auth';
import useMailCampaign from 'hooks/mailCampaign';
import { ALL_DATETIME_JOBS } from 'gql/queries';
import { DELETE_DATETIME_JOB } from 'gql/mutations';

const { Search } = Input;

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
const SurveyItem = ItemSelect(SurveySelect);
const GroupItem = ItemSelect(GroupSelect);

const AddMailCampaign = () => {
  const { form, onChange, reset, save, canSave, createLoading } = useMailCampaign();

  const checkDiff = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('baselineId') !== value) {
        return Promise.resolve();
      }
      return Promise.reject(Error('Les survey sont les memes'));
    },
  });

  return (
    <Col md={24} sm={24}>
      <Card title="Add Mail Campaign" type="inner">
        <Spin spinning={createLoading}>
          <Form
            form={form}
            {...layout}
            labelAlign="left"
            onValuesChange={onChange}
            onFinish={save}
            initialValues={{ action: 'TRAINING-SURVEYS' }}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Required' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="action"
              label="Action"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              name={['params', 'groupId']}
              label="Group"
              rules={[{ required: true, message: 'Required' }]}
            >
              <GroupItem placeholder="Group" showSearch />
            </Form.Item>

            <Form.Item
              name={['params', 'cohortStart']}
              label="Cohort Start"
              rules={[{ required: true, message: 'Required' }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name={['params', 'cohortEnd']}
              label="Cohort End"
              rules={[{ required: true, message: 'Required' }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name={['params', 'surveyId']}
              label="Survey"
              rules={[{ required: true, message: 'Required' }]}
            >
              <SurveyItem placeholder="Survey" showSearch />
            </Form.Item>

            <Form.Item
              name={['params', 'surveyEnd']}
              label="Survey End"
              rules={[{ required: true, message: 'Required' }]}
            >
              <DatePicker showTime />
            </Form.Item>

            <Form.Item
              name="executionDate"
              label="Execution Date"
              rules={[{ required: true, message: 'Required' }]}
            >
              <DatePicker showTime />
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
        </Spin>
      </Card>
    </Col>
  );
};

const DisplayMailCampaigns = ({ campaigns, accessToken, loading }) => {
  const [filters, setFilters] = useState({});
  const [deleteCampaign] = useMutation(DELETE_DATETIME_JOB, {
    context: {
      headers: {
        accessToken,
      },
    },
    refetchQueries: ['allDatetimeJobs'],
  });

  const onChange = (v) => {
    setFilters(v);
  };

  const filterCampaigns = () => {
    let res = campaigns;
    console.log(filters);
    console.log(campaigns);
    if (filters.name) res = campaigns.filter((c) => c.name.toLowerCase().includes(filters.name));
    if (filters.state && filters.state.length > 0)
      res = res.filter((c) => filters.state.includes(c.state));
    return res;
  };

  const stateOptions = [
    <Select.Option key="PENDING">PENDING</Select.Option>,
    <Select.Option key="SUCCESS">SUCCESS</Select.Option>,
  ];

  return (
    <Col md={24} sm={24}>
      <Card title="All mail campaigns" type="inner">
        <Row gutter={[24, 24]}>
          <Col md={24} sm={24}>
            <Form onValuesChange={onChange} layout="inline">
              <Form.Item name="name" label="Name">
                <Search
                  placeholder="filter by name"
                  onSearch={(value) => console.log(value)}
                  style={{ width: 200 }}
                />
              </Form.Item>
              <Form.Item name="state" label="State">
                <Select mode="multiple" style={{ width: 250 }} placeholder="Tags Mode" allowClear>
                  {stateOptions}
                </Select>
              </Form.Item>
            </Form>
          </Col>
          {filterCampaigns(campaigns).map((campaign, i) => {
            const params = JSON.parse(campaign.params);

            let badgeType;
            let badgeText;
            switch (campaign.state) {
              case 'PENDING':
                badgeType = 'default';
                badgeText = 'Pending';
                break;
              case 'SUCCESS':
                badgeType = 'success';
                badgeText = 'Success';
                break;
              case 'PROCESSING':
                badgeType = 'processing';
                badgeText = 'Running';
                break;
              case 'ERROR':
                badgeType = 'error';
                badgeText = 'Error';
                break;

              default:
                break;
            }

            return (
              <Col sm={24} lg={12} key={i}>
                <Descriptions title="Campaign Info" size="small" ordered column={4}>
                  <Descriptions.Item label="Name" span={1}>
                    {campaign.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Action" span={1}>
                    {campaign.action}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status" span={2}>
                    <Badge status={badgeType} text={badgeText} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Expiration" span={4}>
                    {moment(params.surveyEnd).format('YYYY-MM-DD HH[h]')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Distribution" span={4}>
                    {params.distribId}
                  </Descriptions.Item>
                  <Descriptions.Item label="Group">{params.groupId}</Descriptions.Item>
                  <Descriptions.Item label="Cohort Start" span={2}>
                    {moment(params.cohortStart).format('YYYY-MM-DD')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cohort End">
                    {moment(params.cohortEnd).format('YYYY-MM-DD')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Emails Matched" span={2}>
                    {(params.emailsMatched || []).join(' --restra ')}
                  </Descriptions.Item>
                </Descriptions>
                <Button onClick={() => deleteCampaign({ variables: { id: campaign.id } })}>
                  DEL
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card>
    </Col>
  );
};

export default () => {
  const { accessToken } = useAuth();
  const { loading, error, data } = useQuery(ALL_DATETIME_JOBS, {
    context: {
      headers: {
        accessToken,
      },
      skip: !accessToken,
    },
  });

  const allDatetimeJobs = data && data.allDatetimeJobs ? data.allDatetimeJobs : [];

  return (
    <Card title="Mail Campaigns">
      <Row gutter={[24, 24]}>
        <DisplayMailCampaigns
          campaigns={allDatetimeJobs}
          accessToken={accessToken}
          loading={loading}
        />
        <AddMailCampaign />
      </Row>
    </Card>
  );
};
