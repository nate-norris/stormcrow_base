import "./index.css";
import { Provider } from "jotai";
import { store } from "@/state";
import WeatherSites from "@/components/widgets/WeatherSites"

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen">
        <WeatherSites />
      </div>
    </Provider>
    
  );
}

export default App;