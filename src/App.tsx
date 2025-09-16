import { Suspense, useEffect, useState } from "react";

import { getCurrentScreen } from "@auth0/auth0-acul-js";

import { getScreenComponent } from "@/utils/screen/screenLoader";

import { setBrandTheme } from "./utils/helpers/brandUtils";

const App = () => {
  const [screen, setScreen] = useState("login-id");
  const [clientId, setClientId] = useState("default");

  useEffect(() => {
    const screenName = getCurrentScreen();
    if (screenName) {
      setScreen(screenName);
    }
    setClientId(window.universal_login_context.client.id);
  }, []);

  // Set brand theme
  setBrandTheme(clientId);

  // Get the current screen component
  const ScreenComponent = getScreenComponent(screen);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {ScreenComponent ? (
        <ScreenComponent />
      ) : (
        <div>Screen &quot;{screen}&quot; not implemented yet</div>
      )}
    </Suspense>
  );
};

export default App;
