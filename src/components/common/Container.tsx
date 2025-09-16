import React from "react";

import { getBrandPageLayout } from "@/utils/helpers/brandUtils";

export type ContainerProps = {
  clientId: string;
  authFlow: "login" | "signup";
  flowLink: string;
  children: React.ReactNode;
};

const Container = ({
  clientId,
  authFlow,
  flowLink,
  children,
}: ContainerProps) => {
  const PageLayout = getBrandPageLayout(clientId);

  return (
    <>
      {PageLayout ? (
        <PageLayout authFlow={authFlow} flowLink={flowLink ?? "#"}>
          {children}
        </PageLayout>
      ) : (
        <div className="min-h-screen flex flex-col justify-center-safe bg-auth-bg">
          <div className="flex flex-none self-center-safe justify-self-center">
            {children}
          </div>
          <footer className="text-center text-muted-foreground my-4">
            No page layout defined.
          </footer>
        </div>
      )}
    </>
  );
};

export default Container;
