import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

import type { Test, TestConfiguration } from "@/models";




export default function DbForm() {

    const [name, setName] = useState("");
    const [deleteName, setDeleteName] = useState("");

    async function handleInitDb() {
        setName("");
        try {
            const [test, testConfig]: [Test, TestConfiguration] = await invoke("initiate_test_command", { name: name.toUpperCase() });
            alert(JSON.stringify(test));
            alert(JSON.stringify(testConfig));
        } catch (error) {
            alert('error');
            console.log("db error: ", error);
        }
    }

    async function handleDeleteTest() {
        // delete_test_command
        invoke('delete_test_command', { name: deleteName.toUpperCase() })
            .then(() => {
                alert("Test deleted successfully!");
        })
        .catch((err) => {
            console.error("Failed to delete test:", err);
        });
        setDeleteName("");
    }

    async function handleLastTest() {
        try {
            const test: Test = await invoke("get_last_test_command");
            alert(JSON.stringify(test));
        } catch (error) {
            alert("error");
        }
    }

    async function handleAllTests() {
        invoke<Test[]>("get_tests_command")
            .then((tests) => {alert(JSON.stringify(tests, null, 2));})
            .catch((error) => console.error(error));
    }

    return (
        <>
            <div className="bg-zinc-400">
                <label htmlFor="init">Initiate DB</label>
                <input type="text" id="init" value={name}
                        onChange={(e) => setName(e.target.value)} />
                <button className="bg-amber-400" onClick={handleInitDb}>
                    Go
                </button>
            </div>
            <div>
                <label htmlFor="last_test">Last Test</label>
                <button id="last_test" className="bg-amber-400" onClick={handleLastTest}>
                    Go
                </button>
            </div>
            <div>
                <label htmlFor="tests">All Tests</label>
                <button id="tests" className="bg-amber-400" onClick={handleAllTests}>
                    Go
                </button>
            </div>
            <div className="bg-zinc-400">
                <label htmlFor="init">Delete Test</label>
                <input type="text" id="delete" value={deleteName}
                        onChange={(e) => setDeleteName(e.target.value)} />
                <button className="bg-amber-400" onClick={handleDeleteTest}>
                    Go
                </button>
            </div>
        </>
        
        
    );
}