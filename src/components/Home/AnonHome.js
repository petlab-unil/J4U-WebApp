import Link from 'next/link';
import { Row, Col, Card, Typography, Alert, Button } from 'antd';
import styled from 'styled-components';

const { Paragraph, Title } = Typography;

const LogoImg = styled.img`
  width: 200px;
`;

const CenterContainer = styled.div`
  margin: auto;
  width: 600px;
`;

const CenterContent = styled.div`
  margin: auto;
  text-align: center;
`;

const IntroText = () => (
  <Col span={24}>
    <CenterContainer>
      <CenterContent>
        <LogoImg src="/logo-unil.png" />
        <LogoImg src="/logo-unige.png" />
      </CenterContent>
      <br />
      <br />
      <Title> Bienvenue sur Jobs For You </Title>
      <Paragraph>
        Les universités de Lausanne et de Genève mènent actuellement une étude sur l'amélioration de
        la recherche d'emploi.
      </Paragraph>
      <Paragraph>
        Dans le cadre de cette étude, des scientifiques ont développé un outil de recherche d’emploi
        innovant qui est mis à disposition des participants à l'étude. L'objectif de cet outil est
        d'aider les participants à retrouver un emploi rapidement ou à un retrouver un emploi qui
        correspondrait mieux à leurs compétences
      </Paragraph>
      <Paragraph>
        Veuillez cliquer{' '}
        <Link href="/legal">
          <a href="/legal">ici </a>
        </Link>
        pour en savoir plus sur nous.
      </Paragraph>
    </CenterContainer>
  </Col>
);

export default () => {
  return (
    <Row gutter={[24, 24]} align="middle" justify="center">
      <IntroText />
    </Row>
  );
};
