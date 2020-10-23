import { Input, AutoComplete, Spin, Row, Col } from 'antd';
import uniqBy from 'lodash/uniqBy';
import useJobSearch from 'hooks/jobSearch';

const JobSearch = ({ onChange, me }) => {
  const { optionsObj, onSelect, handleSearch, loading } = useJobSearch(onChange);

  let options = optionsObj.map(({ id, isco08, avam, title }) => ({
    key: id,
    isco08,
    avam,
    value: title,
    label: <div>{title}</div>,
  }));

  options.push({
    key: -1,
    isco08: me.oldJobIsco08,
    avam: null,
    value: me.oldJobTitle,
    label: <div>{me.oldJobTitle}</div>,
  });

  options = uniqBy(options, (x) => x.value);

  return (
    <Row>
      <Col span={20}>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{
            width: '100%',
          }}
          options={options}
          defaultValue={me.oldJobTitle}
          onSelect={onSelect}
          onSearch={handleSearch}
          optionFilterProp="label"
        >
          <Input.Search size="medium" placeholder="Emploi précédent" enterButton />
        </AutoComplete>
      </Col>
      <Col span={4}>
        <Spin spinning={loading} />
      </Col>
    </Row>
  );
};

export default JobSearch;
