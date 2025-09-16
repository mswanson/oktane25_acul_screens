import Container from "@/components/common/Container";

import LoginIdForm from "./components/LoginIdForm";
import { useLoginIdManager } from "./hooks/useLoginIdManager";

function LoginIdScreen() {
  const { loginIdInstance } = useLoginIdManager();

  return (
    <Container
      authFlow="login"
      clientId={loginIdInstance.client.id}
      flowLink={loginIdInstance?.screen?.signupLink ?? "#"}
    >
      <LoginIdForm />
    </Container>
  );
}

export default LoginIdScreen;
