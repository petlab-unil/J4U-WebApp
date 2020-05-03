import Link from 'next/link';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  height: 31px;
  float: left;
  line-height: 64px;
  color: white !important;
  font-size: 32px;
  margin-right: 20px;
`;

export default () => (
  <LogoWrapper>
    <Link href="/">J4U</Link>
  </LogoWrapper>
);
