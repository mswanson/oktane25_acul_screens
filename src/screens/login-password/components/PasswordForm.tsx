import { useState } from "react";

// import type { Error } from "@auth0/auth0-acul-js";
// import { getFieldError } from "@/utils/helpers/errorUtils";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Mail, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import submitForm from "@/utils/helpers/submit-form";

import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";

export type AuthMethod = "password" | "otp";

function PasswordForm() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>("password");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    links,
    data,
    handleLoginPassword,
    loginPasswordInstance,
    // errors,
    resetPasswordLink,
  } = useLoginPasswordManager();

  // Extract general errors (not field-specific) from the SDK
  // const generalErrors =
  //   errors?.filter((error: Error) => !error.field || error.field === null) ||
  //   [];

  // Extract field-specific errors for username, password, and CAPTCHA
  // const usernameSDKError =
  //   getFieldError("username", errors) || getFieldError("email", errors);
  // const passwordSDKError = getFieldError("password", errors);
  // const captchaSDKError = getFieldError("captcha", errors);

  // Get password policy (e.g., minimum length) from the SDK
  // const passwordPolicy =
  //   loginPasswordInstance?.transaction?.getPasswordPolicy();
  const isPasswordValid = password.length >= 8;

  const handlePasswordSubmit = async () => {
    if (!password.trim()) return;

    setIsSubmitting(true);
    const identifier = data?.username ?? "";
    await handleLoginPassword(identifier, password);
    setIsSubmitting(false);
  };

  const handleSendOtp = () => {
    setIsSubmitting(true);
    submitForm({
      state: loginPasswordInstance.transaction?.state ?? "",
      connection: "email",
    });
    setIsSubmitting(false);
  };

  const handleEditIdentifier = () => {
    window.location.href = links?.edit_identifier || "#";
  };

  // {/* General alerts at the top */ }
  // {generalErrors.length > 0 && (
  // <div className="space-y-3 mb-4">
  // {generalErrors.map((error: Error, index: number) => (
  // <p key={index} className="text-sm text-destructive text-center">
  // {error.message}
  // </p>
  // ))}
  // </div>
  // )}
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
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <div className="text-right -mt-1">
                <a
                  href={resetPasswordLink ?? "#"}
                  className="text-sm text-primary hover:text-primary-dark font-medium"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

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

export default PasswordForm;
