import "./index.css";
import { useEffect } from "react";
import { Provider } from "jotai";
import { Toaster } from "@/components/ui/sonner";

import { store } from "@/state";
import { bootstrapApp } from "./bootstrap";
import { AppCoordinator } from "@/app-shell";

function App() {

  useEffect(() => {
    bootstrapApp();
  }, []);

  return (
    <Provider store={store}>
      <AppCoordinator />
      <Toaster />
    </Provider>
  );
}

export default App;