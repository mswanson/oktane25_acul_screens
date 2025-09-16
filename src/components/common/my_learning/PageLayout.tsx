import logo from "@/assets/logos/my_learning_logo_color.svg";

import Footer from "./Footer";
import HeroPanelLogin from "./HeroPanelLogin";
import HeroPanelSignup from "./HeroPanelSignup";

export type PageLayoutProps = {
  authFlow: "login" | "signup";
  flowLink?: string;
  children: React.ReactNode;
};

const PageLayout = ({ authFlow, flowLink, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Auth Form */}
        <div className="w-full lg:w-1/2 bg-auth-bg flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <img src={logo} alt="My Learning" className="h-12 mx-auto mb-4" />
              {authFlow == "login" && (
                <>
                  <h1 className="text-2xl font-bold text-foreground">
                    Welcome back
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Continue your learning journey
                  </p>
                </>
              )}
              {authFlow == "signup" && (
                <>
                  <h1 className="text-2xl font-bold text-foreground">
                    Join My Learning
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Start your learning journey today
                  </p>
                </>
              )}
            </div>

            {/* Form */}
            <div className="bg-auth-card rounded-xl shadow-lg border p-6">
              {children}
            </div>

            {/* Footer Link */}
            <div className="text-center mt-6">
              {authFlow == "login" && (
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <a
                    href={flowLink ?? "#"}
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Sign up for free
                  </a>
                </p>
              )}
              {authFlow == "signup" && (
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a
                    href={flowLink ?? "#"}
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Sign in
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Hero Panel */}
        {authFlow === "login" && <HeroPanelLogin />}
        {authFlow === "signup" && <HeroPanelSignup />}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PageLayout;
