import { Row, Col, Card, Typography, Alert } from 'antd';

const { Paragraph } = Typography;

const VerifyCard = ({ me }) => {
  if (!me.verified) {
    return (
      <Alert
        message="Verification du compte"
        description="Vous devez verifier votre compte en suivant les intructions recues par email"
        type="error"
        showIcon
      />
    );
  }
  return (
    <Alert
      message="Verification du compte"
      description="Votre compte a bien ete verifie"
      type="success"
      showIcon
    />
  );
};

const SurveyCard = ({ me }) => {
  const desc = (
    <>
      <Paragraph>Vous devez compléter le questionnaire Qualtrics</Paragraph>
      <Paragraph>
        <a href={me.baselineLink}>Questionnaire</a>
      </Paragraph>
    </>
  );

  if (!me.formDone)
    return <Alert message="Questionnaires" description={desc} type="error" showIcon />;
  return (
    <Alert
      message="Questionnaires"
      description={`Questionnaire complete le ${me.formDoneAt}`}
      type="success"
      showIcon
    />
  );
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
