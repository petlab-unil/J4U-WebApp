import ReactPlayer from 'react-player';
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

export default () => (
  <Row
    type="flex"
    style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }}
  >
    <div>
      <Title> Comment procéder?</Title>
    </div>
    <div>
      <ReactPlayer url="https://www.youtube.com/watch?v=LFuaxI0npMQ" />
    </div>
  </Row>
);
