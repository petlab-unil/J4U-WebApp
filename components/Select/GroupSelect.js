import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Select } from 'antd';
import { useAuth } from '~/hooks/auth';
import { ALL_GROUPS } from '~/gql/queries';

const { Option } = Select;

function GroupSelect({ value, setValue }) {
  const { accessToken } = useAuth();
  const { loading, error, data } = useQuery(ALL_GROUPS, {
    context: {
      headers: {
        accessToken,
      },
    },
  });

  const options = data.allGroups
    ? data.allGroups.map((group) => (
        <Option key={group.id} value={group.id}>
          {group.name}
        </Option>
      ))
    : [];

  return (
    <Select
      disabled={loading || error}
      showSearch
      style={{ width: 200 }}
      placeholder="Choisir un group"
      optionFilterProp="children"
      onChange={setValue}
      value={value}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {options}
    </Select>
  );
}

GroupSelect.defaultProps = {
  value: undefined,
};

GroupSelect.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

export default GroupSelect;
