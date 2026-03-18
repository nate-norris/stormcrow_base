import "./index.css";
import { Provider } from "jotai";
import { store } from "@/state";
// import QEForm from "@/components/forms/QEForm";
// import DbForm from "@/components/forms/DbForm";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen">
        {/* <QEForm />
        <DbForm /> */}
        <p>Hello</p>
      </div>
    </Provider>
    
  );
}

export default App;