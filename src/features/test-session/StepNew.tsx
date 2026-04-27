import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ModalBackButton } from "@/components/ui/modal";
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
    const [isNameConflict, setIsNameConflict] = useState(true);

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
      <div className="flex flex-col items-center gap-3">
        <ModalBackButton action={onBack} />
        <h2 className="text-xl font-semibold">Create a new test</h2>
        <div className="flex items-start gap-2 mt-5">
          <div className="flex flex-col">
            <input 
              className="border p-2 rounded-2xl" 
              type="text"
              placeholder="Test name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {isNameConflict ? (
              <p className="text-sm mt-1 text-red-900">Test already exists.</p>
            ): (<></>)}
          </div>
          
          <Button onClick={handleSubmit}>Go</Button>
        </div>
      </div>
    );
}