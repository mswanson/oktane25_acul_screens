import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  "login-id": lazy(() => import("@/screens/login-id")),
  "login-password": lazy(() => import("@/screens/login-password")),
  "login-passwordless-email-code": lazy(
    () => import("@/screens/login-passwordless-email-code")
  ),
  "signup-id": lazy(() => import("@/screens/signup-id")),
  "signup-password": lazy(() => import("@/screens/signup-password")),
};

export const getScreenComponent = (
  screenName: string
): React.ComponentType | null => {
  return SCREEN_COMPONENTS[screenName] || null;
};
