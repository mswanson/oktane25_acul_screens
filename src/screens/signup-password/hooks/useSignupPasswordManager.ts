import { useMemo } from "react";

import type { SignupPasswordOptions } from "@auth0/auth0-acul-js";
import SignupPassword from "@auth0/auth0-acul-js/signup-password";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useSignupPasswordManager = () => {
  const signupPasswordInstance = useMemo(() => new SignupPassword(), []);
  const { screen } = signupPasswordInstance;
  const { loginLink, editLink, links, data } = screen;

  const handleSignupPassword = async (
    args: SignupPasswordOptions
  ): Promise<void> => {
    const options = {
      email: args.email?.trim() || "",
      ...args,
    };

    executeSafely(
      `SignupPassword with options: ${JSON.stringify(options)}`,
      () => signupPasswordInstance.signup(options)
    );
  };

  return {
    signupPasswordInstance,
    handleSignupPassword,
    errors: signupPasswordInstance.getError(),
    links,
    editLink,
    loginLink,
    data,
  };
};
