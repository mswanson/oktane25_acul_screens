import Container from "@/components/common/Container";

import IdentifierForm from "./components/IdentifierForm";
import { useLoginIdManager } from "./hooks/useLoginIdManager";

function LoginIdScreen() {
  const { loginIdInstance } = useLoginIdManager();

  return (
    <Container
      authFlow="login"
      clientId={loginIdInstance.client.id}
      flowLink={loginIdInstance?.screen?.signupLink ?? "#"}
    >
      <IdentifierForm />
    </Container>
  );
}

export default LoginIdScreen;
