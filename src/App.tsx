import "./index.css";

import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
// import QEForm from "@/components/forms/QEForm";
// import DbForm from "@/components/forms/DbForm";

function App() {

  const [ready, setReady] = useState(false);

  useEffect(() => {
    // wait for Rust to complete
    const unlisten = listen("rust-ready", () => {
      setReady(true); // now it's safe to render main GUI
    });

    return () => {
      unlisten.then(f => f());
    };
  }, []);

  if (!ready) return null; 

  return (
    <div className="min-h-screen">
      {/* <QEForm />
      <DbForm /> */}
      <p>Hello Turd</p>
    </div>
  );
}

export default App;