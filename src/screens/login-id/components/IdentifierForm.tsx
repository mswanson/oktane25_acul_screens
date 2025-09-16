import { useState } from "react";

// import type { Error, TransactionMembersOnLoginId } from "@auth0/auth0-acul-js";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { getFieldError } from "@/utils/helpers/errorUtils";
import { useLoginIdManager } from "../hooks/useLoginIdManager";

function IdentifierForm() {
  const [identifier, setIdentifier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleLoginId,
    // errors,
    // loginIdInstance,
  } = useLoginIdManager();

  // Client-side validation for email and phone
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValid = identifier.trim().length > 0 && validateEmail(identifier);

  const getValidationMessage = () => {
    if (!identifier.trim()) return "";
    if (!validateEmail(identifier)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  // Get general errors (not field-specific)
  // const generalErrors =
  //   errors?.filter((error: Error) => !error.field || error.field === null) ||
  //   [];

  // const identifierSDKError =
  //   getFieldError("identifier", errors) ||
  //   getFieldError("email", errors) ||
  //   getFieldError("phone", errors) ||
  //   getFieldError("username", errors);

  // Submit handler
  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSubmitting(true);
    await handleLoginId(identifier);
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

      {/* General alerts at the top */}
      {/* {generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error: Error, index: number) => (
            <p key={index} className="text-sm text-destructive text-center">
              {error.message}
            </p>
          ))}
        </div>
      )} */}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className={`h-12 ${getValidationMessage() ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          {getValidationMessage() && (
            <p className="text-sm text-destructive">{getValidationMessage()}</p>
          )}
        </div>

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

export default IdentifierForm;
