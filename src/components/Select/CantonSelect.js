import PropTypes from 'prop-types';
import { Select } from 'antd';
import cantons from 'cantons';

const { Option } = Select;

const CantonSelect = (props) => {
  const { setValue, ...restProps } = props;

  const options = cantons.map((canton) => (
    <Option key={canton} value={canton}>
      {canton}
    </Option>
  ));

  return (
    <Select
      /* Default props */
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      style={{ width: '100%' }}
      {...restProps}
      /* Mandatory props */
      optionFilterProp="children"
      onChange={setValue}
    >
      {options}
    </Select>
  );
};

CantonSelect.defaultProps = {
  value: undefined,
};

CantonSelect.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};

export default CantonSelect;
