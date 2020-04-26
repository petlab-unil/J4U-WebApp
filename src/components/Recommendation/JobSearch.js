import { Input, AutoComplete, Spin, Row, Col } from 'antd';
import useJobSearch from 'hooks/jobSearch';

const JobSearch = ({ onChange }) => {
  const { optionsObj, onSelect, handleSearch, loading } = useJobSearch(onChange);

  const options = optionsObj.map(({ id, label, value }) => ({
    key: id,
    isco08: value,
    value: label,
    label: <div>{label}</div>,
  }));

  return (
    <Row>
      <Col span={20}>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{
            width: '100%',
          }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          optionFilterProp="label"
        >
          <Input.Search size="medium" placeholder="Job précédent" enterButton />
        </AutoComplete>
      </Col>
      <Col span={4}>
        <Spin spinning={loading} />
      </Col>
    </Row>
  );
};

export default JobSearch;
