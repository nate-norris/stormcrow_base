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
      toast.error("Configuration failed to update.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg border">
      <h2 className="text-xl font-semibold mb-4">Wind Configuration</h2>

      {/* Max Wind Speed */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Max Wind Speed (mph)</label>
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
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Threshold Percent */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Threshold (%)</label>
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
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Weapon Orientation */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Weapon Degrees (True North)</label>
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
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Expected Sites */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Expected Weather Sites</label>
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
          className="w-full p-2 border rounded-lg"
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
