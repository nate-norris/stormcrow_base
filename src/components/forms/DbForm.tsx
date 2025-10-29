import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type Test = {
  id: number;
  name: string;
  time: number;
};

type TestConfiguration = {
  id: number;
  cross: number;
  cross_type: string;
  tail: number;
  tail_type: string;
  gun_orient: number;
  tolerance: number;
};


export default function DbForm() {

    const [name, setName] = useState("");

    async function handleInitDb() {
        setName("");
        try {
            const [test, testConfig]: [Test, TestConfiguration] = await invoke("initiate_test_command", { name: name.toUpperCase() });
            // console.log(result);
            alert(JSON.stringify(test));
            alert(JSON.stringify(testConfig));
            // invoke('login', { user: 'tauri', password: '0j4rijw8=' })
            //     .then((message) => console.log(message))
            //     .catch((error) => console.error(error));
        } catch (error) {
            alert('error');
            console.log("db error: ", error);
        }
    }

    return (
        <div className="bg-zinc-400">
            <label htmlFor="init">Initiate DB</label>
            <input type="text" id="init" value={name}
                    onChange={(e) => setName(e.target.value)} />
            <button className="bg-amber-400" onClick={handleInitDb}>
                Go
            </button>
        </div>
        
    );
}