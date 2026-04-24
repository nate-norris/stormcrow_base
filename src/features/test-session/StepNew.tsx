import { useState } from "react";
import { Test, WindWarningConfig } from "@/models";
import { initiateTest } from "./sessionService";

// define the props
type NewProps = {
    onBack: () => void;
    onSubmit: () => void;
    tests: Test[];
};

export default function NewView({ onBack, onSubmit, tests }: NewProps) {
    const [name, setName] = useState(""); // test name provided by user
    const [isNameConflict, setIsNameConflict] = useState(false);

    const handleSubmit = async () => {
        // set name to upper case
        const n = name.toUpperCase();

        // confirm unique name entry
        const exists = tests.some(test => test.name === n);
        if (exists) {
            setIsNameConflict(true);
            return;
        }
        
        // submit the name and retrieve the Test and WindWarningConfig
        try {
            const [test, windConfig]: [Test, WindWarningConfig] = await initiateTest(n);
        } catch (error) {
            alert('error');
        }


        // verify no existing test with the provided name
        // TODO this is wrong
        // if (last && n == last.name) {
        //     setIsNameConflict(true);
        //     return;
        // }

        // update globals
        // close the modal
        // onSubmit();
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-4">Create a new test</h2>
            <div>
                <input
                    className="border p-2 rounded"
                    type="text"
                    placeholder="Test name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {isNameConflict ? (
                    <p className="text-red-900">Test already exists.</p>
                ): (<></>)}
            </div>
            <button className="btn" onClick={handleSubmit}>Submit</button>
            <button className="btn" onClick={onBack}>Back</button>
        </div>
    );
}