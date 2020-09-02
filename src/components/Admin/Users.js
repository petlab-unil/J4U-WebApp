import { Table, Checkbox } from 'antd';
import { useQuery } from '@apollo/client';
import { ALL_USERS } from 'gql/queries';
import { useAuth } from 'hooks/auth';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Birth Date',
    dataIndex: 'birthDate',
    key: 'birthDate',
  },
  {
    title: 'Form Done At',
    dataIndex: 'formDoneAt',
    key: 'formDoneAt',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Group',
    dataIndex: ['group', 'name'],
    key: 'group.name',
  },
  {
    title: 'Form Done',
    dataIndex: 'formDone',
    key: 'formDone',
    render: (val) => {
      return <Checkbox checked={val} disabled />;
    },
  },
  {
    title: 'Verified',
    dataIndex: 'verified',
    key: 'verified',
    render: (val) => {
      return <Checkbox checked={val} disabled />;
    },
  },
];

export default () => {
  const { accessToken } = useAuth();
  const { loading, error, data } = useQuery(ALL_USERS, {
    context: {
      headers: {
        accessToken,
      },
    },
  });

  console.table(data);

  const dataSource = data && data.allUsers ? data.allUsers : [];

  return <Table dataSource={dataSource} columns={columns} />;
};
