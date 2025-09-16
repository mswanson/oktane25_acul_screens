import Container from "@/components/common/Container";

import SignupIdForm from "./components/SignupIdForm";
import { useSignupIdManager } from "./hooks/useSignupIdManager";

function SignupIdScreen() {
  const { signupIdInstance } = useSignupIdManager();

  return (
    <Container
      authFlow="signup"
      clientId={signupIdInstance.client.id}
      flowLink={signupIdInstance?.screen?.loginLink ?? "#"}
    >
      <SignupIdForm />
    </Container>
  );
}

export default SignupIdScreen;
