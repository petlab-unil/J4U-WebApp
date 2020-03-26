import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Modal } from "antd";
import Login from "./Login";
import Signup from "./Signup";
import Logo from "./Logo";

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
        <Menu.Item key="1">
          <Link href="/?login" shallow>
            <a> Se Connecter</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/?signup" shallow>
            <a> S'inscrire</a>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
}
