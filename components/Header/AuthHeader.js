import { useState } from "react";
import { Menu, Typography, Modal } from "antd";
import styled from "styled-components";
import { useMe } from "~hooks/me";

const Logo = styled.div`
  height: 31px;
  float: left;
  line-height: 64px;
  color: white !important;
  font-size: 32px;
  margin-right: 200px;
`;

export default function() {
  const me = useMe();
  if (!me) return null;

  return (
    <>
      <Logo>J4U</Logo>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        <Menu.Item key="1">
          Bienvenue {me.firstName} {me.lastName}
        </Menu.Item>
        <Menu.Item key="2">{me.email}</Menu.Item>
      </Menu>
    </>
  );
}
