import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { activeWindConfigAtom } from "../state/windWarnAtom";
import { persistWindWarningConfig } from "@/tauri";

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
      await persistWindWarningConfig(draftConfig);
      setActiveWindConfig(draftConfig);
      toast.success("Configuration successfully updated.")
    } catch (err) {
      // TODO confirm why empty test is allowing updateConfiguration
      // may just need conditional check here.... db is probably checking for update where test id is -1
      toast.error("Configuration failed to update.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 text-sm font-medium items-center">
      <form>
        <FieldGroup>
          <Field className="flex items-center gap-4 flex-row">
            {/* TODO: enforce positive */}
            <FieldLabel htmlFor="max-ws">Max Wind Speed (mph)</FieldLabel>
            <Input 
              id="max-ws"
              type="number"
              step="1"
              value={draftConfig.maxWind}
              onChange={(e) =>
                setDraftConfig(prev => ({
                  ...prev,
                  maxWind: Number(e.target.value)
                }))
              }
              className="w-25 bg-white"
            />
          </Field>
          {/* TODO: 0-100 enforced; may need to be above 0 */}
          <Field className="flex items-center gap-4 flex-row">
            <FieldLabel htmlFor="threshold-ps">Threshold (%)</FieldLabel>
            <Input
              id="threshold-ps"
              type="number"
              step="5"
              value={draftConfig.thresholdPercent}
              onChange={(e) =>
                setDraftConfig(prev => ({
                  ...prev,
                  thresholdPercent: Number(e.target.value)
                }))
              }
              className="w-25 bg-white"
            />
          </Field>
          {/* TODO: 0 - 359 enforced */}
          <Field className="flex items-center gap-4 flex-row">
            <FieldLabel htmlFor="weapon-deg">Weapon (° N True)</FieldLabel>
            <Input
              id="weapon-deg"
              type="number"
              step="1"
              value={draftConfig.gunOrient}
              onChange={(e) =>
                setDraftConfig(prev => ({
                  ...prev,
                  gunOrient: Number(e.target.value)
                }))
              }
              className="w-25 bg-white"
            />
          </Field>
          <Field className="flex items-center gap-4 flex-row">
            <FieldLabel htmlFor="exp-sites">Expected Sites</FieldLabel>
            <Input
              id="exp-sites"
              type="number"
              step="1"
              value={draftConfig.expectedSites}
              onChange={(e) =>
                setDraftConfig(prev => ({
                  ...prev,
                  expectedSites: Number(e.target.value)
                }))
              }
              className="w-25 bg-white"
            />
          </Field>
          <div className="flex ml-auto">
            <button
              onClick={handleUpdate}
              className="w-42 bg-blue-600 text-white p-1 rounded-xl font-semibold hover:opacity-90"
            >
              Update
            </button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
