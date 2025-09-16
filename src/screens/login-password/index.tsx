import Container from "@/components/common/Container";

import PasswordForm from "./components/PasswordForm";
import { useLoginPasswordManager } from "./hooks/useLoginPasswordManager";

function LoginPasswordScreen() {
  const { loginPasswordInstance } = useLoginPasswordManager();

  return (
    <Container
      authFlow="login"
      clientId={loginPasswordInstance.client.id}
      flowLink={loginPasswordInstance?.screen?.signupLink ?? "#"}
    >
      <PasswordForm />
    </Container>
  );
}

export default LoginPasswordScreen;
