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
  const searchEnabled = get(me, 'group.uiConfig.search');
  const { recoms, setRecomVariables } = useRecommendation();

  const cancel = () => setJobDetails(undefined);

  return (
    <div gutter={[10, 10]}>
      <PageHeader
        ghost={false}
        onBack={() => router.push('/')}
        title="Recommandation"
        subTitle="Recommande des jobs"
      >
        {searchEnabled ? <RecommendationSearch setRecomVariables={setRecomVariables} /> : null}
      </PageHeader>
      <br />
      <RecommendationResults recoms={recoms} setJobDetails={setJobDetails} />
      <JobDetails position={jobDetails} cancel={cancel} />
    </div>
  );
};

const WithoutRecommendation = () => {
  const [jobDetails, setJobDetails] = useState(undefined);
  const [selectedJob, setSelectedJob] = useState(undefined);
  const router = useRouter();
  const me = useMe();
  const searchEnabled = get(me, 'group.uiConfig.search');

  const cancel = () => setJobDetails(undefined);

  return (
    <div gutter={[10, 10]}>
      <PageHeader
        ghost={false}
        onBack={() => router.push('/')}
        title="Recommandation"
        subTitle="Recommande des jobs"
      >
        {searchEnabled ? <NoRecommendationSearch setRecomVariables={setSelectedJob} /> : null}
      </PageHeader>
      <br />
      <JobResults selectedJob={selectedJob} setJobDetails={setJobDetails} />
      <JobDetails position={jobDetails} cancel={cancel} />
    </div>
  );
};

const Recommendation = () => {
  const me = useMe();

  const withRecom = get(me, 'group.uiConfig.recommendations');
  console.log(me);
  console.log(withRecom);

  if (withRecom) return <WithRecommendation />;

  return <WithoutRecommendation />;
};

export default AuthRequired(TrackVisit(Recommendation));
