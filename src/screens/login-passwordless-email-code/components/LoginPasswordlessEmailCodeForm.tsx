import { useEffect, useState } from "react";

import type { Error } from "@auth0/auth0-acul-js";
import { ArrowLeft, ArrowRight, Mail, RefreshCw } from "lucide-react";

import { FormErrors } from "@/components/common/FormErrors";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

import { useLoginPasswordlessEmailCode } from "../hooks/useLoginPasswordlessEmailCode";

function LoginPasswordlessEmailOtpForm() {
  const [code, setCode] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    // loginPasswordlessEmailCodeInstance,
    handleSubmitOtp,
    handleResendCode,
    errors,
    data,
    editIdentifierLink,
  } = useLoginPasswordlessEmailCode();
  const email = data?.username || "";
  const maskedEmail = `${email.split("@")[0].slice(0, 2)}*** @${email.split("@")[1]}`;
  const isValidCode = code.length === 6;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmitCode: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (isValidCode) return;
    setIsSubmitting(true);
    await handleSubmitOtp(code, email);
    setIsSubmitting(false);
  };

  const handleResend = async () => {
    setIsResending(true);
    await handleResendCode();
    setIsResending(false);
  };

  // Edit identifier handler
  const handleEditIdentifier = () => {
    window.location.href = editIdentifierLink || "#";
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
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Enter verification code
          </h2>
          <p className="text-sm text-muted-foreground">
            We sent a 6-digit code to {maskedEmail}
          </p>
        </div>
      </div>

      <div className="text-center py-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      <FormErrors
        formErrors={errors?.filter(
          (error: Error) => !error.field || error.field === null
        )}
      />

      <form onSubmit={handleSubmitCode} className="space-y-6">
        <div className="space-y-4">
          <Label className="text-center block">Verification code</Label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center text-sm">
            {!canResend ? (
              <p className="text-muted-foreground">
                Resend code in {timeLeft}s
              </p>
            ) : (
              <Button
                type="button"
                variant="link"
                onClick={handleResend}
                disabled={isResending}
                className="text-primary hover:text-primary-dark p-0 h-auto"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Didn't receive the code? Send again"
                )}
              </Button>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValidCode || isSubmitting}
          className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground font-medium"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
              Verifying...
            </>
          ) : (
            <>
              Verify code
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
      <div className="text-center pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Make sure to check your spam folder if you don't see the code
        </p>
      </div>
    </div>
  );
}

export default LoginPasswordlessEmailOtpForm;
