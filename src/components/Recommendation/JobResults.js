import { Typography, Card, Collapse, Row, Col, Spin, Tooltip, Pagination } from 'antd';
import styled from 'styled-components';
import get from 'lodash/get';
import usePositions from 'hooks/positions';
import { PermanentTag, ImmediatelyTag, LoadTag } from './Tags';
import { useEffect } from 'react';
import { useTracker } from 'hooks/tracker';

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

const Position = ({ isco08, position, setJobDetails }) => {
  const tracker = useTracker();
  console.log('ISCO', isco08);
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

const GridContainer = styled.div`
  padding: 1rem 1rem;
  display: grid;
  justify-content: center;
  align-items: start;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 500px));
`;

const JobResults = ({ isco08, selectedJob, cantonCode, setJobDetails, setTrackingRecomStat }) => {
  const avam = get(selectedJob, 'avam');

  if (!avam) return null;

  const { positions, totalCount, loading, page, setPage } = usePositions(avam, cantonCode);

  useEffect(() => {
    if (totalCount !== null) {
      setTrackingRecomStat(1, { count: totalCount });
    }
  }, [positions]);

  const count = totalCount === undefined ? '' : `Offres disponibles: ${totalCount}`;

  const header = (
    <>
      {`${count}`} <Spin spinning={!!loading} />
    </>
  );
  return (
    <>
      {header}
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
        <GridContainer id="zoo">
          {positions.map((position, i) => (
            <Position isco08={isco08} key={i} position={position} setJobDetails={setJobDetails} />
          ))}
        </GridContainer>
      </Spin>
    </>
  );
};

export default JobResults;
