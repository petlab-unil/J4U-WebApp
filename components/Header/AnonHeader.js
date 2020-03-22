import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Menu, Typography, Modal, Button } from "antd";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";

const Logo = styled.div`
  height: 31px;
  float: left;
  line-height: 64px;
  color: white !important;
  font-size: 32px;
  margin-right: 200px;
`;

const LoginModal = ({ visible, reset }) => (
  <Modal
    title="Connection"
    visible={visible}
    onOk={reset}
    onCancel={reset}
    width="500px"
  >
    <Login />
  </Modal>
);

const SignupModal = ({ visible, reset }) => (
  <Modal
    title="Connection"
    visible={visible}
    onOk={reset}
    onCancel={reset}
    width="500px"
  >
    <Signup />
  </Modal>
);

export default function() {
  const router = useRouter();

  const loginVisible = "login" in router.query;
  const signupVisible = "signup" in router.query;

  const setLoginVisible = () =>
    router.push("/?login", "/?login", { shallow: true });
  const setSignupVisible = () =>
    router.push("/?signup", "/?signup", { shallow: true });
  const reset = () => router.push("/", "/", { shallow: true });

  return (
    <>
      <LoginModal visible={loginVisible} reset={reset} />
      <SignupModal visible={signupVisible} reset={reset} />
      <Logo>J4U</Logo>
      <Menu mode="horizontal" theme="dark" style={{ lineHeight: "64px" }}>
        <Menu.Item onClick={setLoginVisible} key="1">
          <Link href="/?login" shallow>
            <a> Se Connecter</a>
          </Link>
        </Menu.Item>
        <Menu.Item onClick={setSignupVisible} key="2">
          <Link href="/?signup" shallow>
            <a> S'inscrire</a>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
}
