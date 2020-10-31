import { useState } from 'react';
import { PageHeader } from 'antd';
import {
  RecommendationSearch,
  NoRecommendationSearch,
  RecommendationResults,
  JobDetails,
} from 'components/Recommendation';
import { useRouter } from 'next/router';
import get from 'lodash/get';
import AuthRequired from 'components/HOC/AuthRequiredPage';
import TrackVisit from 'components/HOC/TrackVisit';
import useRecommendation from 'hooks/recommendation';
import useMe from 'hooks/me';
import JobResults from 'components/Recommendation/JobResults';

const WithRecommendation = () => {
  const [jobDetails, setJobDetails] = useState(undefined);
  const router = useRouter();
  const me = useMe();
  const searchEnabled = get(me, 'cohort.search');
  const { recoms, setRecomVariables, cantonCode } = useRecommendation();

  const cancel = () => setJobDetails(undefined);

  return (
    <div gutter={[10, 10]}>
      <PageHeader
        ghost={false}
        onBack={() => router.push('/')}
        title="Recommandations"
        subTitle="Cet outil recommande des emplois"
      >
        {searchEnabled ? <RecommendationSearch setRecomVariables={setRecomVariables} /> : null}
      </PageHeader>
      <br />
      <RecommendationResults
        recoms={recoms}
        setJobDetails={setJobDetails}
        cantonCode={cantonCode}
      />
      <JobDetails position={jobDetails} cancel={cancel} />
    </div>
  );
};

const WithoutRecommendation = () => {
  const [jobDetails, setJobDetails] = useState(undefined);
  const [recomVariables, setRecomVariables] = useState({});
  const router = useRouter();
  const me = useMe();
  const searchEnabled = get(me, 'cohort.search');

  const cancel = () => setJobDetails(undefined);

  const { job, cantonCode } = recomVariables;

  return (
    <div gutter={[10, 10]}>
      <PageHeader
        ghost={false}
        onBack={() => router.push('/')}
        title="Recommandations"
        subTitle="Cet outil recommande des emplois"
      >
        {searchEnabled ? <NoRecommendationSearch setRecomVariables={setRecomVariables} /> : null}
      </PageHeader>
      <br />
      <JobResults selectedJob={job} cantonCode={cantonCode} setJobDetails={setJobDetails} />
      <JobDetails position={jobDetails} cancel={cancel} />
    </div>
  );
};

const Recommendation = () => {
  const me = useMe();

  const withRecom = get(me, 'cohort.recommendations');
  console.log(me);
  console.log(withRecom);

  if (withRecom) return <WithRecommendation />;

  return <WithoutRecommendation />;
};

export default AuthRequired(TrackVisit(Recommendation));
