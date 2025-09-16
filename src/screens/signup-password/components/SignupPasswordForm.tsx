import { useState } from "react";

import type { Error } from "@auth0/auth0-acul-js";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { FormErrors } from "@/components/common/FormErrors";
import { PasswordInput } from "@/components/common/PasswordInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getFieldError } from "@/utils/helpers/errorUtils";

import { useSignupPasswordManager } from "../hooks/useSignupPasswordManager";

function SignupPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSignupPassword,
    // signupPasswordInstance,
    errors,
    data,
    editLink,
  } = useSignupPasswordManager();

  // Client-side validation
  const isPasswordValid = password.length >= 8;
  const passwordsMatch = password.trim() === confirmPassword.trim();

  const getPasswordValidationMessage = () => {
    if (!password.trim()) return "";
    if (!isPasswordValid) {
      return "Your password must be at least 8 characters";
    }
    return "";
  };

  const getPasswordsMatchValidationMessage = () => {
    if (!password.trim() || !confirmPassword.trim()) return "";
    if (!passwordsMatch) {
      return "Your passwords must match";
    }
    return "";
  };

  // Password submit handler
  const handlePasswordSubmit = async () => {
    if (!password.trim()) return;
    setIsSubmitting(true);
    await handleSignupPassword({
      email: data?.email ?? "",
      password: password,
      "ulp-acceptedTerms": acceptedTerms,
    });
    setIsSubmitting(false);
  };

  // Edit identifier handler
  const handleEditIdentifier = () => {
    window.location.href = editLink || "#";
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
            Create your password
          </h2>
          <p className="text-sm text-muted-foreground">
            Let's secure your account
          </p>
        </div>
      </div>

      <FormErrors
        formErrors={errors?.filter(
          (error: Error) => !error.field || error.field === null
        )}
      />

      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        {/* Password */}
        <PasswordInput
          id="password"
          value={password}
          label="Password"
          placeholder="Enter your password"
          serverError={getFieldError("password", errors)}
          validationError={getPasswordValidationMessage()}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="confirm-password"
          value={confirmPassword}
          label="Confirm password"
          placeholder="Confirm your password"
          validationError={getPasswordsMatchValidationMessage()}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Terms of Service */}
        <div className="flex items-center space-x-3 p-4 bg-accent/50 rounded-lg">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
            className="mt-0.5"
          />
          <div className="flex-1">
            <Label
              htmlFor="terms"
              className="text-sm cursor-pointer leading-relaxed"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-primary hover:text-primary-dark underline"
                onClick={(e) => e.preventDefault()}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-primary hover:text-primary-dark underline"
                onClick={(e) => e.preventDefault()}
              >
                Privacy Policy
              </a>
            </Label>
          </div>
        </div>
        <Button
          type="submit"
          disabled={!isPasswordValid || !passwordsMatch || isSubmitting}
          className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-medium"
        >
          {isSubmitting ? (
            "Creating account..."
          ) : (
            <>
              Sign Up
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

export default SignupPasswordForm;
