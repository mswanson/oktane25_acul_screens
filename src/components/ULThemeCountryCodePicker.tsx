import { forwardRef } from "react";

import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ULThemeCountryCodePickerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Selected country information
   */
  selectedCountry?:
    | {
        name: string;
        code: string; // Country code like "DZ"
        dialCode: string; // Phone code like "+213"
        flag: string; // Flag emoji or URL
      }
    | undefined;
  /**
   * Placeholder text when no country is selected
   */
  placeholder?: string;
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Full width styling
   */
  fullWidth?: boolean;
}

const ULThemeCountryCodePicker = forwardRef<
  HTMLButtonElement,
  ULThemeCountryCodePickerProps
>(
  (
    {
      selectedCountry,
      placeholder = "Select Country",
      isLoading = false,
      fullWidth = false,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    // Base styles with theme overrides
    const baseStyles = cn(
      "inline-flex items-center justify-between px-4 py-4 text-left font-medium transition-colors duration-150 ease-in-out",
      "theme-universal:bg-input-bg",
      "theme-universal:text-input-text",
      "theme-universal:border",
      "theme-universal:border-input-border",
      "theme-universal:text-(length:--ul-theme-font-body-text-size)",
      "theme-universal:font-body",
      "theme-universal:rounded-input",
      "theme-universal:hover:border-base-focus",
      "theme-universal:focus:outline-none theme-universal:focus:ring-2 theme-universal:focus:ring-base-focus/20"
    );

    const widthStyles = fullWidth ? "w-full" : "";
    const disabledStyles =
      disabled || isLoading
        ? "disabled:opacity-70 cursor-not-allowed"
        : "cursor-pointer";

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={cn(baseStyles, widthStyles, disabledStyles, className)}
        {...rest}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {selectedCountry ? (
            <>
              {/* Flag */}
              <div className="flex-shrink-0 w-6 h-4 flex items-center justify-center">
                {selectedCountry.flag.startsWith("http") ? (
                  <img
                    src={selectedCountry.flag}
                    alt={`${selectedCountry.name} flag`}
                    className="w-6 h-4 object-cover rounded-sm"
                  />
                ) : (
                  <span className="text-lg">{selectedCountry.flag}</span>
                )}
              </div>

              {/* Country Info */}
              <div className="flex-1 min-w-0">
                <span className="theme-universal:text-input-text theme-universal:font-body truncate">
                  {selectedCountry.name}, {selectedCountry.code},{" "}
                  {selectedCountry.dialCode}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Placeholder state */}
              <div className="flex-shrink-0 w-6 h-4 theme-universal:bg-input-border rounded-sm"></div>
              <span className="theme-universal:text-input-labels flex-1 truncate">
                {placeholder}
              </span>
            </>
          )}
        </div>

        {/* Chevron */}
        <div className="flex-shrink-0 ml-2">
          <ChevronRight
            className={cn(
              "w-4 h-4 theme-universal:text-input-labels transition-transform duration-200",
              isLoading && "animate-pulse"
            )}
          />
        </div>
      </button>
    );
  }
);

ULThemeCountryCodePicker.displayName = "ULThemeCountryCodePicker";

export default ULThemeCountryCodePicker;
