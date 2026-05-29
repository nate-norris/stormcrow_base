import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { toast } from "sonner";

import { activeWindConfigAtom } from "../state/windWarnAtom";
import { updateConfiguration } from "../services/updateConfigInDb";

export default function WindWarningForm() {
  // global wind warning config atom
  const [activeWindConfig, setActiveWindConfig] = useAtom(activeWindConfigAtom);
  // pre-loaded config for local form values
  const [draftConfig, setDraftConfig] = useState(activeWindConfig);

  useEffect(() => {
    setDraftConfig(activeWindConfig);
  }, [activeWindConfig]);

  const handleUpdate = async () => {
    try {
      await updateConfiguration(draftConfig);
      setActiveWindConfig(draftConfig);
      toast.success("Configuration successfully updated.")
    } catch (err) {
      // TODO confirm why empty test is allowing updateConfiguration
      // may just need conditional check here.... db is probably checking for update where test id is -1
      toast.error("Configuration failed to update.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg border text-sm font-medium items-center space-y-4">
      <h2 className="text-xl font-semibold mb-4">Wind Configuration</h2>

      {/* Max Wind Speed */}
      <div className="flex items-center gap-4">
        <label>Max Wind Speed</label>
        <span>
          <input
            type="number"
            step="1"
            value={draftConfig.maxWind}
            onChange={(e) =>
              setDraftConfig(prev => ({
                ...prev,
                maxWind: Number(e.target.value)
              }))
            }
            className="w-25 p-2 border rounded-lg"
          />
          <label> mph</label>
        </span>
        
      </div>

      {/* Threshold Percent */}
      <div className="flex items-center gap-4">
        <label>Threshold</label>
        <span>
          <input
            type="number"
            // placeholder="1 - 100"
            value={draftConfig.thresholdPercent}
            onChange={(e) =>
              setDraftConfig(prev => ({
                ...prev,
                thresholdPercent: Number(e.target.value)
              }))
            }
            className="w-25 p-2 border rounded-lg"
          />
          <label className="font-bold"> %</label>

        </span>
        
      </div>

      {/* Weapon Orientation */}
      <div className="flex items-center gap-4">
        <label>Weapon</label>
        <span>
          <input
            type="number"
            placeholder="0 - 360"
            value={draftConfig.gunOrient}
            onChange={(e) =>
              setDraftConfig(prev => ({
                ...prev,
                gunOrient: Number(e.target.value)
              }))
            }
            className="w-25 p-2 border rounded-lg"
          />
          <label> ° N True</label>
        </span>
      </div>

      {/* Expected Sites */}
      <div className="mb-6 flex items-center gap-4">
        <label>Expected Sites</label>
        <input
          type="number"
          step="1"
          value={draftConfig.expectedSites}
          onChange={(e) =>
            setDraftConfig(prev => ({
              ...prev,
              expectedSites: Number(e.target.value)
            }))
          }
          className="w-25 p-2 border rounded-lg"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 text-white p-2 rounded-xl font-semibold hover:opacity-90"
      >
        Update
      </button>
    </div>
  );
}
