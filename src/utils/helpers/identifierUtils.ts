import type { IdentifierType } from "@auth0/auth0-acul-js";

interface IdentifierDetails {
  label: string;
  type: string; // HTML input type
  autoComplete: IdentifierType | string; // Prefer IdentifierType when applicable
}

// Specific keys for placeholder texts for better type safety in the config map
type PlaceholderKey =
  | "usernameOrEmailPlaceholder"
  | "emailPlaceholder"
  | "phonePlaceholder"
  | "usernameOnlyPlaceholder"
  | "phoneOrEmailPlaceholder"
  | "phoneOrUsernamePlaceholder"
  | "phoneOrUsernameOrEmailPlaceholder";

interface IdentifierConfig {
  labelKey: PlaceholderKey;
  labelFallback: string;
  type?: string; // HTML input type
  autoComplete?: IdentifierType | string; // Prefer IdentifierType when applicable
}

// Shared configuration for individual identifier types
const INDIVIDUAL_IDENTIFIER_CONFIG: Record<IdentifierType, IdentifierConfig> = {
  email: {
    labelKey: "emailPlaceholder",
    labelFallback: "Email Address",
    type: "email",
    autoComplete: "email",
  },
  phone: {
    labelKey: "phonePlaceholder",
    labelFallback: "Phone Number",
    type: "tel",
    autoComplete: "tel",
  },
  username: {
    labelKey: "usernameOnlyPlaceholder",
    labelFallback: "Username",
    type: "text",
    autoComplete: "username",
  },
};

/**
 * Helper function to create a descriptive key for identifier combinations
 */
const createIdentifierKey = (
  hasEmail: boolean,
  hasPhone: boolean,
  hasUsername: boolean
): string => {
  const identifiers = [];
  if (hasEmail) identifiers.push("email");
  if (hasPhone) identifiers.push("phone");
  if (hasUsername) identifiers.push("username");
  return identifiers.join("-");
};

/**
 * Gets individual identifier field details for a specific identifier type.
 * This function is specifically designed for signup screens where identifiers
 * can be either required or optional based on transaction.requiredIdentifiers
 * and transaction.optionalIdentifiers.
 *
 * @param identifierType - The specific identifier type (email, phone, username)
 * @param isRequired - Whether this identifier is required or optional
 * @param screenTexts - The screen.texts object from Auth0 SDK instance
 * @returns An object containing the label, type, and autoComplete for the specific identifier field
 */
export const getIndividualIdentifierDetails = (
  identifierType: IdentifierType,
  isRequired: boolean,
  screenTexts?: Record<string, string> | null
): IdentifierDetails => {
  const suffix = isRequired ? "*" : " (optional)";
  const config = INDIVIDUAL_IDENTIFIER_CONFIG[identifierType];

  if (!config) {
    return {
      label: `${identifierType}${suffix}`,
      type: "text",
      autoComplete: "username",
    };
  }

  const baseLabel = screenTexts?.[config.labelKey] || config.labelFallback;

  return {
    label: `${baseLabel}${suffix}`,
    type: config.type || "text",
    autoComplete: config.autoComplete || "username",
  };
};

/**
 * Determines the appropriate label, input type, and autocomplete attribute
 * for an identifier field based on active connection attributes and screen texts.
 * This function is specifically designed for login screens where all identifier
 * fields are required (using transaction.allowedIdentifiers).
 *
 * @param connectionAttributes - The connection attributes from the transaction object.
 * @param screenTexts - The screen.texts object from Auth0 SDK instance.
 * @returns An object containing the label, type, and autoComplete string for the identifier field.
 */
export const getIdentifierDetails = (
  connectionAttributes?: IdentifierType[],
  screenTexts?: Record<string, string> | null // Auth0 screen.texts object
): IdentifierDetails => {
  // Initialize with the most common / general defaults
  let finalLabel =
    screenTexts?.usernameOrEmailPlaceholder || "Username or Email Address";
  let finalType = "text";
  let finalAutoComplete: IdentifierType | string = "username";

  if (connectionAttributes) {
    const hasEmail = connectionAttributes.includes("email");
    const hasPhone = connectionAttributes.includes("phone");
    const hasUsername = connectionAttributes.includes("username");

    // Create a descriptive key based on active identifiers
    const identifierKey = createIdentifierKey(hasEmail, hasPhone, hasUsername);

    const configMap: Record<string, IdentifierConfig> = {
      // Individual identifier configs using shared config
      email: INDIVIDUAL_IDENTIFIER_CONFIG.email,
      phone: INDIVIDUAL_IDENTIFIER_CONFIG.phone,
      username: INDIVIDUAL_IDENTIFIER_CONFIG.username,
      // Combined identifier configs
      "email-phone": {
        labelKey: "phoneOrEmailPlaceholder",
        labelFallback: "Phone Number or Email Address",
        autoComplete: "username",
      },
      "email-username": {
        labelKey: "usernameOrEmailPlaceholder",
        labelFallback: "Username or Email Address",
        autoComplete: "username",
      },
      "phone-username": {
        labelKey: "phoneOrUsernamePlaceholder",
        labelFallback: "Phone Number or Username",
        autoComplete: "username",
      },
      "email-phone-username": {
        labelKey: "phoneOrUsernameOrEmailPlaceholder",
        labelFallback: "Phone, Username, or Email",
        autoComplete: "username",
      },
    };

    const config = configMap[identifierKey];

    if (config) {
      finalLabel = screenTexts?.[config.labelKey] || config.labelFallback;
      if (config.type) {
        finalType = config.type;
      }
      if (config.autoComplete) {
        finalAutoComplete = config.autoComplete;
      }
    }
  }

  // For login screens, always append asterisk since all fields are required
  if (!finalLabel.endsWith("*")) {
    finalLabel += "*";
  }

  return {
    label: finalLabel,
    type: finalType,
    autoComplete: finalAutoComplete,
  };
};
