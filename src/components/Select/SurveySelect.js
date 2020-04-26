import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Select } from 'antd';
import { useAuth } from 'hooks/auth';
import { ALL_SURVEYS } from 'gql/queries';

const { Option } = Select;

const SurveySelect = (props) => {
  const { setValue, ...restProps } = props;
  const { accessToken } = useAuth();
  const { loading, error, data } = useQuery(ALL_SURVEYS, {
    context: {
      headers: {
        accessToken,
      },
    },
  });

  const options = data.allSurveys
    ? data.allSurveys.map((survey) => (
        <Option key={survey.id} value={survey.id}>
          {survey.name}
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

SurveySelect.defaultProps = {
  value: undefined,
};

SurveySelect.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

export default SurveySelect;
