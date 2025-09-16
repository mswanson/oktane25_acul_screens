import { useState } from "react";

import type { Error } from "@auth0/auth0-acul-js";
import { ArrowRight, Mail, User } from "lucide-react";

import { FormErrors } from "@/components/common/FormErrors";
import { FormInput } from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { getFieldError } from "@/utils/helpers/errorUtils";

import { useSignupIdManager } from "../hooks/useSignupIdManager";

function SignupIdForm() {
  const [identifier, setIdentifier] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmitIdentifier, errors } = useSignupIdManager();

  // Client-side validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 1 && /^[a-zA-Z\s]+$/.test(name.trim());
  };

  const isValid =
    identifier.trim().length > 0 &&
    validateEmail(identifier) &&
    validateName(fullName);

  const getNameValidationMessage = () => {
    if (!fullName.trim()) return "";
    if (!validateName(fullName)) {
      return "Please enter your full name (letters and spaces only)";
    }
    return "";
  };

  const getEmailValidationMessage = () => {
    if (!identifier.trim()) return "";
    if (!validateEmail(identifier)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSubmitting(true);
    const options = {
      email: identifier,
      "ulp-fullName": fullName,
    };
    await handleSubmitIdentifier(options);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Let's get started
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your name and email to create your account.
        </p>
      </div>

      <FormErrors
        formErrors={errors?.filter(
          (error: Error) => !error.field || error.field === null
        )}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="fullName"
          type="text"
          value={fullName}
          label="Full Name"
          placeholder="Enter your full name"
          icon={
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          }
          validationError={getNameValidationMessage()}
          onChange={(e) => setFullName(e.target.value)}
        />

        <FormInput
          id="email"
          type="email"
          value={identifier}
          label="Email address"
          icon={
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          }
          placeholder="Enter your email"
          serverError={getFieldError("email", errors)}
          validationError={getEmailValidationMessage()}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-medium"
        >
          {isSubmitting ? (
            "Please wait..."
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

export default SignupIdForm;
