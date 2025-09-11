import { Suspense, useEffect, useState } from "react";

import { getCurrentScreen } from "@auth0/auth0-acul-js";

import { getScreenComponent } from "@/utils/screen/screenLoader";

const App = () => {
  const [screen, setScreen] = useState("login-id");

  useEffect(() => {
    const currentScreenDetails = getCurrentScreen();
    if (currentScreenDetails) {
      setScreen(currentScreenDetails);
    }
  }, []);

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
