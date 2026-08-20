import "./index.css";
import { useEffect } from "react";
import { Provider } from "jotai";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { store } from "@/state";
import { bootstrapApp } from "./bootstrap";
import { AppCoordinator } from "@/app-shell";

function App() {

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    bootstrapApp().then(fn => {
      cleanup = fn;
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <Provider store={store}>
      <TooltipProvider>
        <AppCoordinator />
        <Toaster />
      </TooltipProvider>
    </Provider>
  );
}

export default App;