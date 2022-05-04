import { Typography, Card, Collapse, Row, Col, Spin, Tooltip, Pagination } from 'antd';
import styled from 'styled-components';
import chunk from 'lodash/chunk';
import usePositions from 'hooks/positions';
import { PermanentTag, ImmediatelyTag, LoadTag } from './Tags';
import { useTracker } from 'hooks/tracker';
import { useEffect } from 'react';

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

const Position = ({ position, setJobDetails, isco08 }) => {
  const tracker = useTracker();

  return (
    <Tooltip title="Cliquer pour les détatils">
      <ClickCard
        title={position.descriptions[0].title}
        type="inner"
        onClick={() => {
          setJobDetails({ position, isco08 });
          tracker.track('JOB_CLICK', {
            job_id: position.id,
            job_title: position.descriptions[0].title,
            isco08,
          });
        }}
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

const IndividualResult = ({ recom, setJobDetails, cantonCode, setTrackingRecomStat }) => {
  const { positions, totalCount, loading, page, setPage } = usePositions(recom.avam, cantonCode);

  useEffect(() => {
    if (totalCount !== null) {
      setTrackingRecomStat(recom.rank + 1, { isco08: recom.isco08, count: totalCount });
    }
  }, [positions]);


  if ((totalCount === 0) || (totalCount === null) || (totalCount === undefined)) {
    return (
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title={`${recom.jobTitle}, niveau de proximité: ${recom.rank + 1}`}>
            <Row>
              Nous n’avons actuellement aucune offre correspondant à ce poste spécifique. Retentez
              plus tard, une offre pourrait apparaître.
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }

  const count = `offres disponibles: ${totalCount}`;
  const header = (
    <>
      {`${count}`} <Spin spinning={!!loading} />
    </>
  );

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card title={`${recom.jobTitle}, niveau de proximité: ${recom.rank + 1}`}>
          <Row>
            <Col span={24}>Résultats</Col>
            <Col span={24}>
              <Collapse bordered={false}>
                <Panel header={header} style={{ width: '100%' }}>
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
                      <Position
                        key={i}
                        position={position}
                        isco08={recom.isco08}
                        setJobDetails={setJobDetails}
                      />
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

const RecommendationResults = ({ recoms, setJobDetails, cantonCode, setTrackingRecomStat }) => {
  const middlePoint = Math.floor(recoms.length / 2);
  const colsData = chunk(
    recoms.map((x, i) => ({
      ...x,
      rank: i,
    })),
    middlePoint
  );
  return (
    <>
      <Row gutter={[24, 24]} justify="space-around">
        {[0].map((x, i) => (
          <Col xs={24} lg={12} key={i}>
            {recoms.map((recom, i) => {
              const y = { ...recom };
              y.rank = i;
              return (
                <IndividualResult
                  key={i}
                  recom={y}
                  setJobDetails={setJobDetails}
                  cantonCode={cantonCode}
                  setTrackingRecomStat={setTrackingRecomStat}
                />
              );
            })}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RecommendationResults;
