import { useState } from "react";

import type { Error } from "@auth0/auth0-acul-js";
import { ArrowLeft, ArrowRight, Mail, Shield } from "lucide-react";

import { FormErrors } from "@/components/common/FormErrors";
import { PasswordInput } from "@/components/common/PasswordInput";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFieldError } from "@/utils/helpers/errorUtils";
import submitForm from "@/utils/helpers/submit-form";

import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";

export type AuthMethod = "password" | "otp";

function LoginPasswordForm() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>("password");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    links,
    data,
    handleLoginPassword,
    loginPasswordInstance,
    errors,
    resetPasswordLink,
  } = useLoginPasswordManager();

  // Client-side validation
  const isPasswordValid = password.length >= 8;

  const getPasswordValidationMessage = () => {
    if (!password.trim()) return "";
    if (!isPasswordValid) {
      return "Your password must be at least 8 characters";
    }
    return "";
  };

  // Password submit handler
  const handlePasswordSubmit = async () => {
    if (!password.trim()) return;
    setIsSubmitting(true);
    const identifier = data?.username ?? "";
    await handleLoginPassword(identifier, password);
    setIsSubmitting(false);
  };

  // OTP submit handler
  const handleSendOtp = () => {
    setIsSubmitting(true);
    submitForm({
      state: loginPasswordInstance.transaction?.state ?? "",
      connection: "email",
    });
    setIsSubmitting(false);
  };

  // Edit identifier handler
  const handleEditIdentifier = () => {
    window.location.href = links?.edit_identifier || "#";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEditIdentifier}
          className="p-1 hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground">
            Verify your identity
          </h2>
          <p className="text-sm text-muted-foreground">{data?.username}</p>
        </div>
      </div>

      <FormErrors
        formErrors={errors?.filter(
          (error: Error) => !error.field || error.field === null
        )}
      />

      <Tabs
        value={authMethod}
        onValueChange={(value: string) => setAuthMethod(value as AuthMethod)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger value="otp" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Send code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="space-y-4 mt-0">
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <PasswordInput
              id="password"
              value={password}
              label="Password"
              placeholder="Enter your password"
              serverError={getFieldError("password", errors)}
              validationError={getPasswordValidationMessage()}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              disabled={!isPasswordValid || isSubmitting}
              className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-medium"
            >
              {isSubmitting ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          <div className="text-center">
            <a
              href={resetPasswordLink ?? "#"}
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              Forgot your password?
            </a>
          </div>
        </TabsContent>

        <TabsContent value="otp" className="space-y-4 mt-0">
          <div className="space-y-4">
            <p className="text-foreground text-center my-12">
              Prefer to receive a code via email instead?
              <span className="block text-sm text-muted-foreground text-center mt-1">
                Your code will be sent to {data?.username}.
              </span>
            </p>
            <Button
              onClick={handleSendOtp}
              disabled={isSubmitting}
              className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-medium"
            >
              {isSubmitting ? (
                "Sending code..."
              ) : (
                <>
                  Send verification code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default LoginPasswordForm;
