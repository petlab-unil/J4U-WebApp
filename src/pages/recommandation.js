import get from 'lodash/get';
import AuthRequired from 'components/HOC/AuthRequiredPage';
import TrackVisit from 'components/HOC/TrackVisit';
import useMe from 'hooks/me';
import usePositions from 'hooks/positions';
import useRecommendation from 'hooks/recommendation';
import { RecommendationSearch, NoRecommendationSearch } from 'components/RecommendationNew';
import { useRouter } from 'next/router';
import { getCertificate } from 'helpers';
import {
  PageHeader,
  Row,
  Col,
  Card,
  List,
  Descriptions,
  Collapse,
  Typography,
  Button,
  Modal,
  Pagination,
  Spin,
} from 'antd';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTracker } from 'hooks/tracker';
import { RecommendationResults } from 'components/Recommendation';
import every from 'lodash/every';
import isEmpty from 'lodash/isEmpty';
import { PermanentTag, ImmediatelyTag, LoadTag } from '../components/Recommendation/Tags';
import styled from 'styled-components';

// X EXTERNAL_CLICK
// X CERTIFICATE_CLICK
// X APPLY_CLICK
// X JOB_CLICK
// X RECOMMENDATION_CLICK
// X NO_RECOMMENDATION_CLICK

const ScrollDiv = styled.div`
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
`;

const RecommendationContext = createContext({});

const PositionDetails = ({ details, isInfoView }) => {
  const { position, recom } = details;
  const { isco08 } = recom;

  const {
    id,
    externalUrl,
    descriptions: [{ title, description }],
    location: { city, countryCode, cantonCode },
    contact: { firstName, lastName, phone, email },
    company: { name: companyName, city: companayCity, countryCode: companyCountyCode },
    employment: { startDate, endDate },
  } = position;

  const emptyContact = every([firstName, lastName, phone, email], isEmpty);
  return (
    <>
      <Descriptions title="General" layout="vertical" column={3}>
        <Descriptions.Item label="Titre">{title}</Descriptions.Item>
        <Descriptions.Item label="Tags">
          <PermanentTag position={position} />
          <ImmediatelyTag position={position} />
          <LoadTag position={position} />
        </Descriptions.Item>
        <Descriptions.Item label="Dates">
          {startDate ? `Début: ${startDate}` : null}
          {endDate ? `Fin: ${endDate}` : null}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Description">
          <ScrollDiv>{description}</ScrollDiv>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Entreprise" layout="horizontal">
        <Descriptions.Item label="Nom">{companyName}</Descriptions.Item>
        <Descriptions.Item label="Ville">{companayCity}</Descriptions.Item>
        <Descriptions.Item label="Pays">{companyCountyCode}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Job Localisation" layout="horizontal">
        <Descriptions.Item label="Ville">{city}</Descriptions.Item>
        <Descriptions.Item label="Pays">{countryCode || 'CH'}</Descriptions.Item>
        <Descriptions.Item label="Canton">{cantonCode}</Descriptions.Item>
      </Descriptions>

      {emptyContact || isInfoView ? null : (
        <Descriptions title="Contact" layout="horitontal">
          <Descriptions.Item label="Prenom">{firstName}</Descriptions.Item>
          <Descriptions.Item label="Nom">{lastName}</Descriptions.Item>
          <Descriptions.Item label="Telephone">{phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{email}</Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
};

const JobModal = ({ details, isDetailsModalOpen, toggleModal }) => {
  if (!details) return null;
  const [isInfoView, setIsInfoView] = useState(true);
  const { position, recom } = details;
  const me = useMe();
  const withRecom = get(me, 'cohort.recommendations');

  const tracker = useTracker();
  const certificateClick = (title) => {
    getCertificate(me, position.descriptions[0].title);
    tracker.track('CERTIFICATE_CLICK', {
      job_id: position.id,
      job_title: position.descriptions[0].title,
      isco08: recom.isco08,
    });
  };
  const externalClick = () => {
    tracker.track('EXTERNAL_CLICK', {
      job_id: position.id,
      job_title: position.descriptions[0].title,
      external_url: position.externalUrl,
      isco08: recom.isco08,
    });
  };

  const applyClick = () => {
    setIsInfoView(false);
    tracker.track('APPLY_CLICK', {
      job_id: position.id,
      job_title: position.descriptions[0].title,
      isco08: recom.isco08,
    });
  };
  const onCancel = () => {
    setIsInfoView(true);
    toggleModal();
  };

  let cc;

  if (isInfoView) {
    cc = [
      <Button type="primary" onClick={applyClick}>
        Postuler
      </Button>,
    ];
  } else {
    cc = [
      withRecom ? (
        <Button type="primary" onClick={certificateClick}>
          Certificat
        </Button>
      ) : null,
      position.externalUrl ? (
        <a href="" target="_blank" href={position.externalUrl} onClick={externalClick}>
          <Button type="link">Postuler sur site externe</Button>
        </a>
      ) : null,
    ];
  }

  return (
    <Modal title="Details" visible={isDetailsModalOpen} onCancel={onCancel} footer={cc} width="80%">
      <PositionDetails details={details} isInfoView={isInfoView} />
    </Modal>
  );
};

const RecommandationResult = ({ recom, i }) => {
  const { toggleModal, setDetails, cantonCode, ...other } = useContext(RecommendationContext);
  const tracker = useTracker();
  const me = useMe();
  const withRecom = get(me, 'cohort.recommendations');

  const onDetailsClick = (position) => {
    toggleModal();
    setDetails({ recom, position });
    tracker.track('JOB_CLICK', {
      job_id: position.id,
      job_title: position.descriptions[0].title,
      isco08: recom.isco08,
    });
  };

  if (!cantonCode) return null;

  const { positions, totalCount, loading, page, setPage } = usePositions(recom.avam, cantonCode);

  if (!withRecom) {
    useEffect(() => {
      if (withRecom) return;
      if (!positions || !other.recomVariables || loading) return;
      const xx = {
        canton_code: other.recomVariables.cantonCode,
        job_isco08: other.recomVariables.job.isco08,
        job_title: other.recomVariables.job.title,
        count: totalCount,
      };
      tracker.track('NO_RECOMMENDATION_CLICK', xx);
    }, [positions]);
    //}, [positions, other.recomVariables.job.title]);
  }

  const ss = i >= 0 ? `Rang ${i + 1}: ${recom.jobTitle}` : 'Jobs';
  const header =
    totalCount
      ? `${totalCount} offres d'emploi`
      : 'Nous n’avons actuellement aucune offre correspondant à ce poste spécifique. Retentez plus tard, une offre pourrait apparaître.';



  return (
    <Card title={ss} style={{ width: '100%' }}>
      <Collapse defaultActiveKey={['0']}>
        <Collapse.Panel header={header} key={1}>
          <Pagination
            simple
            current={page}
            defaultPageSize={10}
            total={totalCount}
            onChange={(p) => {
              setPage(p);
            }}
          />
          <List>
            {positions.map((position, i) => {
              return (
                <List.Item key={i}>
                  <Row>
                    <Col span={24}>
                      <Typography.Paragraph style={{ fontSize: '1.25rem', fontWeight: 'bold' }} as>
                        {position.company.name}
                      </Typography.Paragraph>
                    </Col>

                    <Col span={24}>
                      <Typography.Paragraph style={{ fontSize: '1.25rem' }} as>
                        {position.descriptions[0].title}
                      </Typography.Paragraph>
                    </Col>

                    <Col span={24}>
                      <Typography.Paragraph
                        ellipsis={{
                          rows: 3,
                        }}
                      >
                        {position.descriptions[0].description}
                      </Typography.Paragraph>
                    </Col>
                    <Col span={24}>
                      <Button type="primary" onClick={() => onDetailsClick(position)}>
                        DETAILS
                      </Button>
                    </Col>
                  </Row>
                </List.Item>
              );
            })}
          </List>
        </Collapse.Panel>
      </Collapse>
    </Card>
  );
};

const RecommendationsZone = ({ recoms }) => {
  if (!recoms) return null;

  return (
    <Row gutter={[8, 8]}>
      {recoms.map((x, i) => {
        return (
          <>
            <Col span={6} />
            <Col span={12}>
              <RecommandationResult recom={x} i={i} />
            </Col>
            <Col span={6} />
          </>
        );
      })}
    </Row>
  );
};

const WithRecommendation = () => {
  const me = useMe();

  const {
    recoms,
    setRecomVariables,
    cantonCode,
    recomsLoading,
    recomVariables,
  } = useRecommendation();
  const router = useRouter();
  const searchEnabled = get(me, 'cohort.search');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [details, setDetails] = useState(undefined);
  const toggleModal = () => setIsDetailsModalOpen(!isDetailsModalOpen);
  const tracker = useTracker();

  useEffect(() => {
    // tracker.track('', { pathname });
    if (!recoms || !recomVariables || recomsLoading) return;
    const obj = {};
    recoms.map((x, i) => {
      obj[`rank_${i + 1}_count`] = x.isco08;
      obj[`rank_${i + 1}_isco08`] = x.positionsCount;
    });
    const xx = {
      canton_code: recomVariables.cantonCode,
      old_job_isco08: recomVariables.oldJobData.isco08,
      old_job_title: recomVariables.oldJobData.title,
      alpha: recomVariables.alpha,
      beta: recomVariables.beta,
      ...obj,
    };
    tracker.track('RECOMMENDATION_CLICK', xx);
  }, [recoms]);

  return (
    <RecommendationContext.Provider value={{ cantonCode, toggleModal, setDetails }}>
      <div gutter={[10, 10]}>
        <PageHeader
          ghost={false}
          onBack={() => router.push('/')}
          title="Recommandations"
          subTitle="Cet outil recommande des emplois"
        >
          {searchEnabled ? <RecommendationSearch setRecomVariables={setRecomVariables} /> : null}
        </PageHeader>

        {recomsLoading && <Spin />}

        <RecommendationsZone recoms={recoms} />

        <JobModal
          isDetailsModalOpen={isDetailsModalOpen}
          toggleModal={toggleModal}
          details={details}
        />
      </div>
    </RecommendationContext.Provider>
  );
};

const WithoutRecommendation = () => {
  const me = useMe();

  const router = useRouter();
  const searchEnabled = get(me, 'cohort.search');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [details, setDetails] = useState(undefined);
  const toggleModal = () => setIsDetailsModalOpen(!isDetailsModalOpen);
  const [recomVariables, setRecomVariables] = useState({});

  return (
    <RecommendationContext.Provider
      value={{ cantonCode: recomVariables.cantonCode, toggleModal, setDetails, recomVariables }}
    >
      <div gutter={[10, 10]}>
        <PageHeader
          ghost={false}
          onBack={() => router.push('/')}
          title="Recommandations"
          subTitle="Cet outil recommande des emplois"
        >
          {searchEnabled ? <NoRecommendationSearch setRecomVariables={setRecomVariables} /> : null}
        </PageHeader>

        {recomVariables.job && (
          <RecommandationResult
            recom={{
              isco08: recomVariables.job.isco08,
              avam: recomVariables.job.avam,
            }}
          />
        )}

        <JobModal
          isDetailsModalOpen={isDetailsModalOpen}
          toggleModal={toggleModal}
          details={details}
        />
      </div>
    </RecommendationContext.Provider>
  );
};

const Recommendation = () => {
  const me = useMe();
  const withRecom = get(me, 'cohort.recommendations');

  if (withRecom) return <WithRecommendation />;
  else return <WithoutRecommendation />;
};
export default AuthRequired(TrackVisit(Recommendation));
