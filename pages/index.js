import { withApollo } from "../lib/apollo";
import { Layout } from "antd";
import AppHeader from "~/components/Header";
import Messages from "~/components/Messages";

const { Header, Footer, Sider, Content } = Layout;

const IndexPage = props => {
  return (
    <>
      <Messages />
      <Layout>
        <Header>
          <AppHeader />
        </Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default withApollo(IndexPage);
