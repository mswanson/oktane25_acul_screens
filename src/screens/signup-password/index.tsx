import Container from "@/components/common/Container";

import SignupPasswordForm from "./components/SignupPasswordForm";
import { useSignupPasswordManager } from "./hooks/useSignupPasswordManager";

function LoginPasswordScreen() {
  const { signupPasswordInstance } = useSignupPasswordManager();

  return (
    <Container
      authFlow="signup"
      clientId={signupPasswordInstance.client.id}
      flowLink={signupPasswordInstance?.screen?.loginLink ?? "#"}
    >
      <SignupPasswordForm />
    </Container>
  );
}

export default LoginPasswordScreen;
