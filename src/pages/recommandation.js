import { PageHeader } from 'antd';
import { RecommendationSearch, RecommendationcResults } from 'components/Recommendation';
import { useRouter } from 'next/router';
import useRecommendation from 'hooks/recommendation';
import RecommendationResults from 'components/Recommendation/RecommendationResults';

const Recommendation = () => {
  const router = useRouter();

  const { recoms, setRecomVariables } = useRecommendation();

  console.log(recoms, 'ahahah');

  return (
    <div gutter={[10, 10]}>
      <PageHeader
        ghost={false}
        onBack={() => router.push('/')}
        title="Recommandation"
        subTitle="Recommande des jobs"
      >
        <RecommendationSearch setRecomVariables={setRecomVariables} />
      </PageHeader>
      <br />
      <RecommendationResults recoms={recoms} />
    </div>
  );
};

export default Recommendation;
