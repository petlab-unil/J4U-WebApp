import { Card, List, Row, Col } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { SurveySelect } from '~/components/Select';
import { useAuth } from '~/hooks/auth';
import { ALL_GROUPS } from '~/gql/queries';

function GroupDetail({ group }) {
  return (
    <Row gutter={[10, 10]}>
      <Col span={8}>{group.name}</Col>
      <Col span={8}>
        <SurveySelect />
      </Col>
    </Row>
  );
}

export default function () {
  const { accessToken } = useAuth();
  const {
    loading,
    error,
    data: { allGroups },
  } = useQuery(ALL_GROUPS, {
    context: {
      headers: {
        accessToken,
      },
      skip: !accessToken,
    },
  });

  return (
    <Card title="Group configuration">
      <List
        size="small"
        bordered
        dataSource={allGroups || []}
        renderItem={(item) => (
          <List.Item>
            <GroupDetail group={item} />
          </List.Item>
        )}
      />
    </Card>
  );
}
