import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Select } from 'antd';
import { useAuth } from 'hooks/auth';
import { ALL_GROUPS } from 'gql/queries';

const { Option } = Select;

const GroupSelect = (props) => {
  const { setValue, ...restProps } = props;
  const { accessToken } = useAuth();
  const { loading, error, data } = useQuery(ALL_GROUPS, {
    context: {
      headers: {
        accessToken,
      },
    },
  });

  const options =
    data && data.allGroups
      ? data.allGroups.map((group) => (
          <Option key={group.id} value={group.id}>
            {group.name}
          </Option>
        ))
      : [];

  return (
    <Select
      /* Default props */
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      style={{ width: '100%' }}
      {...restProps}
      /* Mandatory props */
      disabled={loading || error}
      optionFilterProp="children"
      onChange={setValue}
    >
      {options}
    </Select>
  );
};

GroupSelect.defaultProps = {
  value: undefined,
};

GroupSelect.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

export default GroupSelect;
