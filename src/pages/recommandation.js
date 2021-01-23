import { useState, useEffect } from 'react';
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
import { useImmer } from 'use-immer';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import JobResults from 'components/Recommendation/JobResults';
import { useTracker } from 'hooks/tracker';

function useTrackingSearch(type) {
  const nRes = type === 'RECOMMENDATION_CLICK' ? 10 : 1;

  const [trackingData, updateTrackingData] = useImmer({
    meta: {},
    perRecomStat: {},
  });

  const tracker = useTracker();

  const setTrackingMeta = (meta) => {
    updateTrackingData((draft) => {
      draft.meta = meta;
    });
  };

  const setTrackingRecomStat = (i, stat) =>
    updateTrackingData((draft) => {
      if (!isEqual(draft.perRecomStat[i], stat)) draft.perRecomStat[i] = stat;
    });

  console.log(trackingData, 'AAAAAAA');

  useEffect(() => {
    if (Object.keys(trackingData.perRecomStat).length === nRes && !isEmpty(trackingData.meta)) {
      const stats = {};
      Object.entries(trackingData.perRecomStat).map(([key, val]) => {
        const iscoName = `rank_${key}_isco08`;
        const countName = `rank_${key}_count`;
        stats[iscoName] = val.isco08;
        stats[countName] = val.count;
      });
      const data = { ...trackingData.meta, ...stats };
      tracker.track(type, data);
      updateTrackingData((draft) => {
        draft.meta = {};
        draft.perRecomStat = {};
      });
      console.log('TRACKING TRACKING TRACKING TRACKING TRACKING TRACKING TRACKING TRACNKING');
    }
  }, [trackingData]);

  return { setTrackingMeta, setTrackingRecomStat };
}

const WithRecommendation = () => {
  const [jobDetails, setJobDetails] = useState(undefined);
  const router = useRouter();
  const me = useMe();
  const searchEnabled = get(me, 'cohort.search');
  const { recoms, setRecomVariables, cantonCode } = useRecommendation();

  const cancel = () => setJobDetails(undefined);

  const { setTrackingMeta, setTrackingRecomStat } = useTrackingSearch('RECOMMENDATION_CLICK');

  return (
    <div gutter={[10, 10]}>
      <PageHeader
        ghost={false}
        onBack={() => router.push('/')}
        title="Recommandations"
        subTitle="Cet outil recommande des emplois"
      >
        {searchEnabled ? (
          <RecommendationSearch
            setRecomVariables={setRecomVariables}
            setTrackingMeta={setTrackingMeta}
          />
        ) : null}
      </PageHeader>
      <br />
      <RecommendationResults
        recoms={recoms}
        setJobDetails={setJobDetails}
        cantonCode={cantonCode}
        setTrackingRecomStat={setTrackingRecomStat}
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
  const { setTrackingMeta, setTrackingRecomStat } = useTrackingSearch('NO_RECOMMENDATION_CLICK');

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
        {searchEnabled ? (
          <NoRecommendationSearch
            setRecomVariables={setRecomVariables}
            setTrackingMeta={setTrackingMeta}
          />
        ) : null}
      </PageHeader>
      <br />
      <JobResults
        selectedJob={job}
        cantonCode={cantonCode}
        setJobDetails={setJobDetails}
        setTrackingRecomStat={setTrackingRecomStat}
      />
      <JobDetails position={jobDetails} cancel={cancel} />
    </div>
  );
};

const Recommendation = () => {
  const me = useMe();

  const withRecom = get(me, 'cohort.recommendations');

  if (withRecom) return <WithRecommendation />;

  return <WithoutRecommendation />;
};

export default AuthRequired(TrackVisit(Recommendation));
