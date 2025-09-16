import { useMemo } from "react";

import type { SignupOptions } from "@auth0/auth0-acul-js/signup";
import SignupIdInstance from "@auth0/auth0-acul-js/signup-id";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useSignupIdManager = () => {
  const signupIdInstance = useMemo(() => new SignupIdInstance(), []);

  const handleSubmitIdentifier = async (args: SignupOptions): Promise<void> => {
    const options = {
      email: args.email?.trim() || "",
      ...args,
    };

    executeSafely(`SignupId with options: ${JSON.stringify(options)}`, () =>
      signupIdInstance.signup(options)
    );
  };

  return {
    signupIdInstance,
    handleSubmitIdentifier,
    errors: signupIdInstance.getError(),
  };
};
