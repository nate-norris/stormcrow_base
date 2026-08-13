import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import type { WindWarningConfig } from "../core/models";
import { activeWindConfigAtom } from "../state/windWarnAtom";
import { canUpdateConfigsAtom } from "../state/canUpdateConfigsAtom";
import { persistWindWarningConfig } from "@/tauri";

const CONFIG_LIMITS = {
  maxWind: { min: 0, max: 20 },
  percentage: { min: 0, max: 100 },
  direction: { min: 1, max: 359 },
  siteCount: { min: 1, max: 26 }, // A-Z
};

export default function WindWarningForm() {
  const canUpdateConfigs = useAtomValue(canUpdateConfigsAtom);
  // global wind warning config atom
  const [activeWindConfig, setActiveWindConfig] = useAtom(activeWindConfigAtom);
  // pre-loaded config for local form values
  const [draftConfig, setDraftConfig] = useState(activeWindConfig);
  // display any errors upon input
  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    setDraftConfig(activeWindConfig);
  }, [activeWindConfig]);

  function validateConfig(config: WindWarningConfig): string {
    alert(config);
    // confirm max wind
    if (config.maxWind < CONFIG_LIMITS.maxWind.min || 
      config.maxWind > CONFIG_LIMITS.maxWind.max) {
      return `Max wind must be between ${CONFIG_LIMITS.maxWind.min} and 
        ${CONFIG_LIMITS.maxWind.max} m/s.`;
    }

    // confirm threshold percent
    if (config.thresholdPercent < CONFIG_LIMITS.percentage.min || 
      config.thresholdPercent > CONFIG_LIMITS.percentage.max) {
      return `Threshold must be between ${CONFIG_LIMITS.percentage.min} and 
        ${CONFIG_LIMITS.percentage.max} %.`;
    }

    // confirm weapon orientation
    if (config.gunOrient < CONFIG_LIMITS.direction.min || 
      config.gunOrient > CONFIG_LIMITS.direction.max) {
      return `Weapon direction must be between ${CONFIG_LIMITS.direction.min}° and 
        ${CONFIG_LIMITS.direction.max}°.`;
    }
  
    // confirm site count
    if (config.expectedSites < CONFIG_LIMITS.siteCount.min || 
      config.expectedSites > CONFIG_LIMITS.siteCount.max) {
      return `Site count must be between ${CONFIG_LIMITS.siteCount.min} and 
        ${CONFIG_LIMITS.siteCount.max}.`;
    }

    return "";
  }

  const handleUpdate = async () => {

    // update ui for any error messages
    //  return if one is present
    const error = validateConfig(draftConfig);
    setFormError(error);
    if (error != "") {
      return;
    }

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
              className="w-25 bg-input text-foreground"
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
              className="w-25 bg-input text-foreground"
            />
          </Field>
          {/* direction for wind degrees */}
          <Field className="flex items-center gap-4 flex-row">
            <FieldLabel htmlFor="weapon-deg">Weapon (° N True)</FieldLabel>
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
              className="w-25 bg-input text-foreground"
            />
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
    </div>
  );
}
