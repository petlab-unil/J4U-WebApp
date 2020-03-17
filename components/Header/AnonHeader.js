import { useState } from "react";
import { Menu, Typography, Modal } from "antd";
import styled from "styled-components";
import Login from "./Login";

const { Title } = Typography;

const Logo = styled.div`
  height: 31px;
  float: left;
  line-height: 64px;
  color: white !important;
  font-size: 32px;
  margin-right: 200px;
`;

const X = ({ visible, setVisible }) => (
  <Modal
    title="Connection"
    visible={visible}
    onOk={() => setVisible(false)}
    onCancel={() => setVisible(false)}
    width="500px"
  >
    <Login />
  </Modal>
);

export default function() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <X visible={visible} setVisible={setVisible} />
      <Logo>J4U</Logo>
      <Menu
        theme="dark"
        mode="horizontal"
        /*                defaultSelectedKeys={["2"]} */
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item onClick={() => setVisible(true)} key="1">
          Se Connecter
        </Menu.Item>
        <Menu.Item key="2">S'inscrire</Menu.Item>
      </Menu>
    </>
  );
}
