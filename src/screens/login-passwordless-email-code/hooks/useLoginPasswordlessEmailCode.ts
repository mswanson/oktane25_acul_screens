import { useMemo } from "react";

import LoginPasswordlessEmailCodeInstance from "@auth0/auth0-acul-js/login-passwordless-email-code";

import { executeSafely } from "@/utils/helpers/executeSafely";

export const useLoginPasswordlessEmailCode = () => {
  const loginPasswordlessEmailCodeInstance = useMemo(
    () => new LoginPasswordlessEmailCodeInstance(),
    []
  );
  const { screen } = loginPasswordlessEmailCodeInstance;
  const { data, signupLink, editIdentifierLink } = screen;

  const handleSubmitOtp = async (
    identifier: string,
    code: string
  ): Promise<void> => {
    const options: { email: string; code: string } = {
      email: identifier?.trim() || "",
      code: code?.trim() || "",
    };

    executeSafely(
      `LoginPasswordlessEmailCode SubmitOtp with options: ${JSON.stringify(options)}`,
      () => loginPasswordlessEmailCodeInstance.submitCode(options)
    );
  };

  const handleResendCode = async (): Promise<void> => {
    executeSafely(
      "LoginPasswordlessEmailCode Resend",
      () => () => loginPasswordlessEmailCodeInstance.resendCode()
    );
  };

  return {
    loginPasswordlessEmailCodeInstance,
    handleSubmitOtp,
    handleResendCode,
    errors: loginPasswordlessEmailCodeInstance.getError(),
    signupLink,
    data,
    editIdentifierLink,
  };
};
