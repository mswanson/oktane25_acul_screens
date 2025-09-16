import { useMemo } from "react";

import LoginPassword from "@auth0/auth0-acul-js/login-password";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginPasswordManager = () => {
  const loginPasswordInstance = useMemo(() => new LoginPassword(), []);
  const { screen } = loginPasswordInstance;
  const { signupLink, resetPasswordLink, editIdentifierLink, links, data } =
    screen;

  const handleLoginPassword = async (
    identifier: string,
    password: string
  ): Promise<void> => {
    const options: { username: string; password: string } = {
      username: identifier?.trim() || "",
      password: password?.trim() || "",
    };

    executeSafely(
      `LoginPassword with options: ${JSON.stringify(options)}`,
      () => loginPasswordInstance.login(options)
    );
  };

  return {
    loginPasswordInstance,
    handleLoginPassword,
    errors: loginPasswordInstance.getError(),
    links,
    editIdentifierLink,
    signupLink,
    resetPasswordLink,
    data,
  };
};
