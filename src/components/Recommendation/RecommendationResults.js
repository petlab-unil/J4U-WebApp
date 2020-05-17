import { Typography, Card, Collapse, Row, Col, Spin, Tooltip, Pagination } from 'antd';
import styled from 'styled-components';
import chunk from 'lodash/chunk';
import usePositions from 'hooks/positions';
import { PermanentTag, ImmediatelyTag, LoadTag } from './Tags';

const { Panel } = Collapse;
const { Paragraph } = Typography;

const ClickCard = styled(Card)`
  transition: all 0.2s ease-in-out;
  :hover {
    cursor: pointer;
    opacity: 0.5;
    transform: scale(0.9);
  }
`;
const EmploymentDate = ({ value, name }) => {
  if (value)
    return (
      <Row>
        <Col span={6}>{name}:</Col>
        <Col span={18}>{value}</Col>
      </Row>
    );
  return null;
};

const EmploymentDates = ({ position }) => {
  return (
    <>
      <EmploymentDate position={position} value={position.employment.startDate} name="Début" />
      <EmploymentDate position={position} value={position.employment.endDate} name="Fin" />
    </>
  );
};

const Position = ({ position, setJobDetails }) => {
  return (
    <Tooltip title="Cliquer pour les détatils">
      <ClickCard
        title={position.descriptions[0].title}
        type="inner"
        onClick={() => setJobDetails(position)}
      >
        <Row>
          <Col span={6}>Tags:</Col>
          <Col span={18}>
            <PermanentTag position={position} />
            <ImmediatelyTag position={position} />
            <LoadTag position={position} />
          </Col>
        </Row>
        <Row>
          <Col span={6}>Description:</Col>
          <Col span={18}>
            <Paragraph ellipsis={{ rows: 3 }}>{position.descriptions[0].description}</Paragraph>
          </Col>
        </Row>
        <EmploymentDates position={position} />
      </ClickCard>
    </Tooltip>
  );
};

const IndividualResult = ({ recom, setJobDetails }) => {
  const { positions, totalCount, loading, page, setPage } = usePositions(recom.avam);

  const count = totalCount === undefined ? '' : `positions: ${totalCount}`;

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card title={recom.jobTitle}>
          <Row>
            <Col span={24}>Résultats</Col>
            <Col span={24}>
              <Collapse bordered={false}>
                <Panel header={`${count}`} style={{ width: '100%' }}>
                  <Pagination
                    simple
                    current={page}
                    defaultPageSize={10}
                    total={totalCount}
                    onChange={(p) => {
                      setPage(p);
                    }}
                  />
                  <Spin spinning={!!loading}>
                    {positions.map((position, i) => (
                      <Position key={i} position={position} setJobDetails={setJobDetails} />
                    ))}
                  </Spin>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

const RecommendationResults = ({ recoms, setJobDetails }) => {
  const middlePoint = Math.floor(recoms.length / 2);
  const colsData = chunk(recoms, middlePoint);
  return (
    <>
      <Row gutter={[24, 24]} justify="space-around">
        {colsData.map((x, i) => (
          <Col xs={24} lg={12}>
            {x.map((recom, i) => (
              <IndividualResult key={i} recom={recom} setJobDetails={setJobDetails} />
            ))}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RecommendationResults;
