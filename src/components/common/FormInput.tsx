import { useEffect, useId, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type FormInputProps = React.ComponentPropsWithRef<"input"> & {
  label: string;
  icon?: React.ReactNode;
  serverError?: string | undefined;
  validationError?: string;
  classNames?: string;
};

export const FormInput = ({
  ref,
  id: idProp,
  label,
  icon,
  serverError,
  validationError,
  classNames,
  onChange,
  ...attributes
}: FormInputProps) => {
  const [changed, setChanged] = useState(false);
  const genId = useId();
  const id = idProp ?? genId;

  // If a *new* server error arrives (e.g., after another submit),
  // show it again until the user edits.
  useEffect(() => {
    if (serverError) setChanged(false);
  }, [serverError]);

  const errors = [
    ...(validationError ? [validationError] : []),
    ...(!changed && serverError ? [serverError] : []),
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!changed) setChanged(true);
    onChange?.(e); // preserve the callers handler
  };

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      {icon ? (
        <div className="relative">
          {icon}
          <Input
            id={id}
            ref={ref}
            onChange={handleChange}
            {...attributes}
            className={cn(
              "h-12 pl-10",
              classNames,
              errors.length > 0
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            )}
          />
        </div>
      ) : (
        <Input
          id={id}
          ref={ref}
          onChange={handleChange}
          {...attributes}
          className={cn(
            "h-12",
            classNames,
            errors.length > 0
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          )}
        />
      )}
      <div role="alert" aria-live="polite">
        {errors.map((error, i) => (
          <p key={`${error}-${i}`} className="text-sm text-destructive mb-1">
            {error}
          </p>
        ))}
      </div>
    </div>
  );
};
