import Link from 'next/link';
import { Row, Col, Typography, Button } from 'antd';

const { Paragraph, Title } = Typography;

export default () => {
  return (
    <Row justify="center">
      <Col lg={10} xs={22}>
        <Title>Contact</Title>
        <Paragraph>
          Vous pouvez à tout moment poser vos questions et demander des précisions complémentaires à
          l’adresse suivante : <a href="mailto:j4u@unil.ch">j4u@unil.ch</a>. Notre équipe se fera un
          plaisir de répondre.
        </Paragraph>
      </Col>
      <Col span={24} />
      <Col lg={10} xs={22}>
        <Paragraph>
          <Link href="/">
            <Button type="link">Page d'acceuil</Button>
          </Link>
        </Paragraph>
      </Col>
    </Row>
  );
};
