import { Layout } from "antd";
import AppHeader from "~/components/Header";

const { Header, Footer, Sider, Content } = Layout;

const IndexPage = props => {
  return (
    <Layout>
      <Header>
        <AppHeader />
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default IndexPage;
