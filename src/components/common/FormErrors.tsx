import type { Error } from "@auth0/auth0-acul-js";

export type FormErrorProps = {
  formErrors: Error[];
};

export const FormErrors = ({ formErrors }: FormErrorProps) => {
  return (
    <>
      {formErrors.length > 0 && (
        <div className="space-y-3 mb-4 p-2 rounded-token border bg-destructive-foreground border-destructive">
          {formErrors.map((error: Error, index: number) => (
            <p key={index} className="text-sm text-destructive text-center">
              {error.message}
            </p>
          ))}
        </div>
      )}
    </>
  );
};
