import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Card, Col, DatePicker, Popconfirm, Row, Spin, Typography } from 'antd';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_SIGNUP_LINK } from 'gql/queries';
import { useAuth } from 'hooks/auth';

import { GroupSelect } from 'components/Select';

const { Paragraph } = Typography;

const GenResult = ({ error, loading, data }) => {
  if (loading) {
    return <Spin tip="Generation en cours" />;
  }

  if (error) {
    return <div>ERROR</div>;
  }

  if (data) {
    return (
      <Paragraph>
        <a href={data.getSignupLink.url}>Lien d&apos;inscription </a>
        <Button
          type="link"
          onClick={() => {
            navigator.clipboard.writeText(data.getSignupLink.url);
          }}
        >
          copy
        </Button>
      </Paragraph>
    );
  }

  return null;
};

GenResult.defaultProps = {
  error: false,
  data: undefined,
};

GenResult.propTypes = {
  error: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    getSignupLink: PropTypes.objectOf(PropTypes.string),
  }),
};

const Submit = ({ disabled, expireAt, submit }) => {
  if (expireAt && expireAt.isBefore(moment())) {
    return (
      <Popconfirm
        title="La date d'expiration est avant aujourd'hui, etes-vous sur?"
        onConfirm={submit}
        okText="Yes"
        cancelText="No"
        disabled={disabled}
      >
        <Button type="primary" disabled={disabled}>
          Generer
        </Button>
      </Popconfirm>
    );
  }
  return (
    <Button type="primary" htmlType="submit" disabled={disabled} onClick={submit}>
      Generer
    </Button>
  );
};

Submit.defaultProps = {
  expireAt: undefined,
};

Submit.propTypes = {
  disabled: PropTypes.bool.isRequired,
  expireAt: PropTypes.instanceOf(moment),
  submit: PropTypes.func.isRequired,
};

export default () => {
  const [groupId, setGroupId] = useState(undefined);
  const [expireAt, setExpireAt] = useState(undefined);

  const { accessToken } = useAuth();
  const [runQuery, { loading, error, data }] = useLazyQuery(GET_SIGNUP_LINK, {
    context: {
      headers: {
        accessToken,
      },
    },
  });

  const disabled = !(groupId && expireAt);

  const setDateTime = (x) => setExpireAt(x.clone().minutes(0).seconds(0));

  const onFinish = () => {
    runQuery({
      variables: {
        groupId,
        expireAt,
      },
    });
  };

  return (
    <Card title="Generer un lien d'inscription">
      <Row gutter={[10, 10]}>
        <Col span={4}>
          <GroupSelect setValue={setGroupId} value={groupId} />
        </Col>
        <Col span={6}>
          <DatePicker
            onChange={setDateTime}
            value={expireAt}
            showTime={{
              format: 'HH',
            }}
          />
        </Col>
        <Col span={4}>
          <Submit disabled={disabled} submit={onFinish} expireAt={expireAt} />
        </Col>
      </Row>
      <Row>
        <GenResult error={error} loading={loading} data={data} />
      </Row>
    </Card>
  );
};
