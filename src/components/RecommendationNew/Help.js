import styled from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons';

const HelpIcon = styled(QuestionCircleOutlined)`
  font-size: 28px;
`;

export default ({ url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <HelpIcon />
  </a>
);
