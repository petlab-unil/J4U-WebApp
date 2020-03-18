import { Layout } from "antd";
import AppHeader from "~/components/Header";
const { Header, Content, Footer } = Layout;

export default ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <AppHeader />
      </Header>
      <Content style={{ padding: "0 150px" }}>
        <Layout
          style={{ minHeight: "400px", padding: "24px 0", background: "#fff" }}
        >
          <Content style={{ padding: "0 24px" }}>{children}</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Made with &hearts; by <a href="https://google.com">J4U</a>
      </Footer>
    </Layout>
  );
};
