import Container from "@/components/common/Container";

import LoginPasswordlessEmailOtpForm from "./components/LoginPasswordlessEmailCodeForm";
import { useLoginPasswordlessEmailCode } from "./hooks/useLoginPasswordlessEmailCode";

function LoginPasswordlessEmailCodeScreen() {
  const { loginPasswordlessEmailCodeInstance } =
    useLoginPasswordlessEmailCode();

  return (
    <Container
      authFlow="login"
      clientId={loginPasswordlessEmailCodeInstance.client.id}
      flowLink={loginPasswordlessEmailCodeInstance?.screen?.signupLink ?? "#"}
    >
      <LoginPasswordlessEmailOtpForm />
    </Container>
  );
}

export default LoginPasswordlessEmailCodeScreen;
