import Container from "@/components/common/Container";

import LoginPasswordForm from "./components/LoginPasswordForm";
import { useLoginPasswordManager } from "./hooks/useLoginPasswordManager";

function LoginPasswordScreen() {
  const { loginPasswordInstance } = useLoginPasswordManager();

  return (
    <Container
      authFlow="login"
      clientId={loginPasswordInstance.client.id}
      flowLink={loginPasswordInstance?.screen?.signupLink ?? "#"}
    >
      <LoginPasswordForm />
    </Container>
  );
}

export default LoginPasswordScreen;
