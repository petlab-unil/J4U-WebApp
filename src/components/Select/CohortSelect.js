import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Select } from 'antd';
import { useAuth } from 'hooks/auth';
import { ALL_COHORTS } from 'gql/queries';

const { Option } = Select;

const CohortSelect = (props) => {
  const { setValue, ...restProps } = props;
  const { accessToken } = useAuth();
  const { loading, error, data } = useQuery(ALL_COHORTS, {
    context: {
      headers: {
        accessToken,
      },
    },
  });

  const options =
    data && data.allCohorts
      ? data.allCohorts.map((cohort) => (
          <Option key={cohort.id} value={cohort.id}>
            {cohort.name}
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

CohortSelect.defaultProps = {
  value: undefined,
};

CohortSelect.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

export default CohortSelect;
