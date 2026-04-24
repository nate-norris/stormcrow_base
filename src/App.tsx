import "./index.css";
import { useEffect } from "react";
import { Provider } from "jotai";
import { store } from "@/state";
import { bootstrapApp } from "./bootstrap";
import WeatherSites from "@/components/widgets/WeatherSites"
import { TestModal } from "./features/test-session";


function App() {
  useEffect(() => {
    bootstrapApp();
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen flex">
        <WeatherSites />
        <TestModal isOnStartup={true}/>
      </div>
    </Provider>
    
  );
}

export default App;