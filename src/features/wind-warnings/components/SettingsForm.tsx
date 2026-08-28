import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { toast } from "sonner";
import { CompassIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { activeWindConfigAtom } from "../state/windWarnAtom";
import { canUpdateConfigsAtom } from "../state/canUpdateConfigsAtom";
import { persistWindWarningConfig } from "@/tauri";
import { LocationDialog, isLocationDialogOpenAtom } from "@/features/location";
import { CONFIG_LIMITS } from "../core/constants";
import { getWindWarningConfigError } from "../core/getWindWarningConfigError";

export default function WindWarningForm() {
  const canUpdateConfigs = useAtomValue(canUpdateConfigsAtom);
  // global wind warning config atom
  const [activeWindConfig, setActiveWindConfig] = useAtom(activeWindConfigAtom);
  // pre-loaded config for local form values
  const [draftConfig, setDraftConfig] = useState(activeWindConfig);
  // display any errors upon input
  const [formError, setFormError] = useState<string>("");
  // modal for azimuth calculations
  //    allow TestModal to open/close
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useAtom(isLocationDialogOpenAtom);


  useEffect(() => {
    setDraftConfig(activeWindConfig);
  }, [activeWindConfig]);


  const handleUpdate = async () => {

    // update ui for any error messages
    //  return if one is present
    const error = getWindWarningConfigError(draftConfig);
    setFormError(error);
    if (error != "") {
      return;
    }

    try {
      await persistWindWarningConfig(draftConfig);
      setActiveWindConfig(draftConfig);
      toast.success("Configuration successfully updated.")
    } catch (err) {
      toast.error("Configuration failed to update.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 text-sm font-medium items-center">
      <form>
        <FieldGroup>
          <Field className="flex items-center gap-4 flex-row">
            {/* max wind speed */}
            <FieldLabel htmlFor="max-ws">Max Wind Speed (m/s)</FieldLabel>
            <Input 
              id="max-ws"
              type="number"
              min={CONFIG_LIMITS.maxWind.min}
              max={CONFIG_LIMITS.maxWind.max}
              step="1"
              value={draftConfig.maxWind}
              onChange={(e) =>
                setDraftConfig(prev => ({
                  ...prev,
                  maxWind: Number(e.target.value)
                }))
              }
              className="bg-input text-foreground"
            />
          </Field>
          {/* threshold percent of warning up to max */}
          <Field className="flex items-center gap-4 flex-row">
            <FieldLabel htmlFor="threshold-ps">Threshold (%)</FieldLabel>
            <Input
              id="threshold-ps"
              type="number"
              min={CONFIG_LIMITS.percentage.min}
              max={CONFIG_LIMITS.percentage.max}
              step="5"
              value={draftConfig.thresholdPercent}
              onChange={(e) =>
                setDraftConfig(prev => ({
                  ...prev,
                  thresholdPercent: Number(e.target.value)
                }))
              }
              className="bg-input text-foreground"
            />
          </Field>
          {/* direction for wind degrees */}
          <Field className="flex items-center gap-4 flex-row">
            <FieldLabel htmlFor="weapon-deg">Weapon <br />(° N True)</FieldLabel>
              <span>
                <Button 
                  className="text-xs mb-2 h-6" 
                  size="sm" 
                  variant="secondary"
                  type="button"
                  disabled={!canUpdateConfigs}
                  onClick={() => setIsLocationDialogOpen(true)}
                >
                  Calculate
                  <CompassIcon />
                </Button>
                <Input
                  id="weapon-deg"
                  type="number"
                  min={CONFIG_LIMITS.direction.min}
                  max={CONFIG_LIMITS.direction.max}
                  step="1"
                  value={draftConfig.gunOrient}
                  onChange={(e) =>
                    setDraftConfig(prev => ({
                      ...prev,
                      gunOrient: Number(e.target.value)
                    }))
                  }
                  className="bg-input text-foreground"
                />
              </span>
          </Field>
          {/* number of expected sites receiving */}
          <Field className="flex items-center gap-4 flex-row">
            <FieldLabel htmlFor="exp-sites">Expected Sites</FieldLabel>
            <Input
              id="exp-sites"
              type="number"
              min={CONFIG_LIMITS.siteCount.min}
              max={CONFIG_LIMITS.siteCount.max}
              step="1"
              value={draftConfig.expectedSites}
              onChange={(e) =>
                setDraftConfig(prev => ({
                  ...prev,
                  expectedSites: Number(e.target.value)
                }))
              }
              className="w-25 bg-input text-foreground"
            />
          </Field>
          <div className="flex ml-auto">
            <span className="text-destructive">{formError}</span>
            <Button
              type="button"
              disabled={!canUpdateConfigs}
              onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </FieldGroup>
      </form>
      {/* modal for auto calculating gun azimuth */}
      {isLocationDialogOpen && (
          <LocationDialog
              onCancel={() => setIsLocationDialogOpen(false)}
              onConfirm={(val) => {
                setDraftConfig(prev => ({
                  ...prev,
                  gunOrient: val
                }));
                setIsLocationDialogOpen(false);
            }}
          />
      )}
    </div>
  );
}
