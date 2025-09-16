import { useMemo } from "react";

import LoginIdInstance from "@auth0/auth0-acul-js/login-id";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginIdManager = () => {
  const loginIdInstance = useMemo(() => new LoginIdInstance(), []);
  const { screen } = loginIdInstance;
  const { signupLink, resetPasswordLink } = screen;

  const handleSubmitIdentifier = async (identifier: string): Promise<void> => {
    const options: { username: string } = {
      username: identifier?.trim() || "",
    };

    executeSafely(`LoginId with options: ${JSON.stringify(options)}`, () =>
      loginIdInstance.login(options)
    );
  };

  return {
    loginIdInstance,
    handleSubmitIdentifier,
    errors: loginIdInstance.getError(),
    signupLink,
    resetPasswordLink,
  };
};
