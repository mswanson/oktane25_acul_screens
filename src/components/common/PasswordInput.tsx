import { useEffect, useId, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

export type PasswordInputProps = React.ComponentPropsWithRef<"input"> & {
  label: string;
  serverError?: string | undefined;
  validationError?: string;
  classNames?: string;
};

export const PasswordInput = ({
  ref,
  id: idProp,
  label,
  serverError,
  validationError,
  classNames,
  onChange,
  ...attributes
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="relative">
        <Input
          id={id}
          ref={ref}
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          autoComplete="off"
          {...attributes}
          className={cn(
            "h-12 pr-10",
            classNames,
            errors.length > 0
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          )}
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
