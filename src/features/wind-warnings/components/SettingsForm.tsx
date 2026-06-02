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
    <div className="max-w-md mx-auto p-6 text-sm font-medium items-center space-y-2">
      {/* Max Wind Speed */}
      <div className="flex items-center gap-4">
        <label>Max Wind Speed (mph)</label>
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
      </div>

      {/* Threshold Percent */}
      <div className="flex items-center gap-4">
        <label>Threshold (%)</label>
        <input
          type="number"
          value={draftConfig.thresholdPercent}
          onChange={(e) =>
            setDraftConfig(prev => ({
              ...prev,
              thresholdPercent: Number(e.target.value)
            }))
          }
          className="w-25 p-2 border rounded-lg"
        />
      </div>

      {/* Weapon Orientation */}
      <div className="flex items-center gap-4">
        <label>Weapon (° N True)</label>
        <input
          type="number"
          value={draftConfig.gunOrient}
          onChange={(e) =>
            setDraftConfig(prev => ({
              ...prev,
              gunOrient: Number(e.target.value)
            }))
          }
          className="w-25 p-2 border rounded-lg"
        />
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
