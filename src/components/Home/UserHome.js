import { Row, Col, Card, Typography } from 'antd';

const { Paragraph } = Typography;

const VerifyCard = ({ me }) => {
  if (!me.verified) {
    return <Card title="Verification du compte">Vous devez verifier votre compte</Card>;
  }
  return null;
};

const SurveyCard = ({ me }) => {
  console.log(me);
  if (!me.formDone) {
    return (
      <Card title="Questionnaires">
        <Paragraph>Vous devez compléter le questionnaires Qualtrics</Paragraph>
        <Paragraph>
          <a href={me.baselineLink}>Questionnaire</a>
        </Paragraph>
      </Card>
    );
  }
  return null;
};

export default ({ me }) => {
  return (
    <Row gutter={[24, 24]}>
      <Col lg={{ span: 12, offset: 6 }} md={{ span: 20, offset: 2 }}>
        <VerifyCard me={me} />
      </Col>
      <Col lg={{ span: 12, offset: 6 }} md={{ span: 20, offset: 2 }}>
        <SurveyCard me={me} />
      </Col>
    </Row>
  );
};
