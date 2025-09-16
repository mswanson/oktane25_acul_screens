import { useState } from "react";

import type { Error } from "@auth0/auth0-acul-js";
import { ArrowRight, Mail } from "lucide-react";

import { FormErrors } from "@/components/common/FormErrors";
import { FormInput } from "@/components/common/FormInput";
import { Button } from "@/components/ui/button";
import { getFieldError } from "@/utils/helpers/errorUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function LoginIdForm() {
  const [identifier, setIdentifier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmitIdentifier, errors } = useLoginIdManager();

  // Client-side validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValid = identifier.trim().length > 0 && validateEmail(identifier);

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
    await handleSubmitIdentifier(identifier);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Let's get you signed in
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your email to continue
        </p>
      </div>

      <FormErrors
        formErrors={errors?.filter(
          (error: Error) => !error.field || error.field === null
        )}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
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

export default LoginIdForm;
