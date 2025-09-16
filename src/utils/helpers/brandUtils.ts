import { lazy } from "react";

import { PageLayoutProps } from "@/components/common/my_learning/PageLayout";

interface iBrand {
  name: string;
  pageLayoutComponent: React.LazyExoticComponent<
    React.ComponentType<PageLayoutProps>
  > | null;
}

const BRANDS: Record<string, iBrand> = {
  "8zPb30K9yv0BZjjSBZI3OHcOF0F0GTmk": {
    name: "my-learning",
    pageLayoutComponent: lazy(
      () => import("@/components/common/my_learning/PageLayout")
    ),
  },
  lAAXj8NNbOx9yV8cwjGZv4QT5vCP7NOp: {
    name: "streamward",
    pageLayoutComponent: lazy(
      () => import("@/components/common/streamward/PageLayout")
    ),
  },
  default: { name: "default", pageLayoutComponent: null },
};

const getBrand = (clientId: string) => {
  return BRANDS[clientId] || BRANDS["default"];
};

export const setBrandTheme = (clientId: string) => {
  const rootEl = document.querySelector("#root");
  const brand = getBrand(clientId) || "";
  rootEl?.setAttribute("data-brand", brand?.name);
};

export const getBrandPageLayout = (clientId: string) => {
  const brand = getBrand(clientId);
  return brand?.pageLayoutComponent || null;
};
