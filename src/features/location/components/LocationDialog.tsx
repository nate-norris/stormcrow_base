import { CompassIcon, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { type Hemisphere, type AzimuthRawInput, toInput } from "../core/models";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog";
import { FieldLabel } from "@/components/ui/field";
import { UtmZone } from "./UtmZone";
import { SyncUtmSwitch } from "./SyncUtmSwitch";
import { HemisphereToggle } from "./HemisphereToggle";
import { NorthingEastingInput } from "./NorthingEastingInput";
import { validateAzimuthInputs } from "../core/validateAzimuthInputs";
import { calculateAzimuth } from "../core/calculateAzimuth";
import { persistLocationConfig } from "@/tauri";
import { CONFIG_LIMITS } from "../core/constants";

type Props = {
    onCancel: () => void;
    onConfirm: (orient: number) => void;
}

export function LocationDialog({ onCancel, onConfirm }: Props) {
    const [enabledSyncUtm, setEnabledSyncUtm] = useState(true); // set target to same utm as weapon
    const [wUtm, setWUtm] = useState<number>(11); // weapon utm
    const [tUtm, setTUtm] = useState<number>(11); // target utm
    const [wHem, setWHem] = useState<Hemisphere>("N"); // weapon hemisphere
    const [tHem, setTHem] = useState<Hemisphere>("N"); // target hemisphere
    const [wEasting, setWEasting] = useState<string>(""); // weapon easting
    const [tEasting, setTEasting] = useState<string>(""); // target easting
    const [wNorthing, setWNorthing] = useState<string>(""); // weapon northing
    const [tNorthing, setTNorthing] = useState<string>(""); // target northing
    const [errorString, setErrorString] = useState<string>(""); // returned error upon submission

    async function prepareAzimuth(): Promise<boolean> {
        try {
            const w: AzimuthRawInput = {
                utm: wUtm,
                hemisphere: wHem,
                easting: wEasting,
                northing: wNorthing
            };
            const t: AzimuthRawInput = {
                utm: !enabledSyncUtm ? tUtm : wUtm,
                hemisphere: !enabledSyncUtm ? tHem : wHem,
                easting: tEasting,
                northing: tNorthing
            };
            const errorString = validateAzimuthInputs(w, t);
            setErrorString(errorString); // will be "" if no errors

            if (errorString) {
                return false;
            }

            const azimuth = calculateAzimuth(toInput(w), toInput(t));
            await persistLocationConfig(w, t);
            onConfirm(azimuth);
            toast.success("Azimuth updated success");
            return true;
        } catch (err) {
            console.log(err);
            toast.error("Azimuth update failed");
            return false;
            // TODO: log error
        }
    }

    return (
        <AlertDialog open={true}  onOpenChange={(o) => !o && onCancel()}>
            <AlertDialogContent size="default" className="bg-popover text-popover-foreground">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
                        <CompassIcon />
                    </AlertDialogMedia>
                    <AlertDialogTitle className="font-bold">
                        Calculate Weapon Azimuth
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Provide the weapon and target position details to calculate.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-4">
                    <FieldLabel htmlFor="sync-utm">Sync Target UTM:</FieldLabel>
                    <SyncUtmSwitch tagId="sync-utm" enabled={enabledSyncUtm} setEnabled={setEnabledSyncUtm} />
                </div>
                <div className="grid grid-cols-[auto_1fr_1fr] gap-x-6 gap-y-4 items-center">
                    {/* Headers */}
                    <div />
                    <div className="text-center font-medium">Weapon</div>
                    <div className="text-center font-medium">Target</div>

                    {/* Zone */}
                    <FieldLabel>Zone</FieldLabel>
                    <div className="flex justify-center">
                        <UtmZone utm={wUtm} setUtm={setWUtm} />
                    </div>
                    <div className="flex justify-center">
                        <UtmZone utm={!enabledSyncUtm ? tUtm : wUtm} setUtm={setTUtm} isDisabled={enabledSyncUtm} />
                    </div>

                    {/* Hemisphere */}
                    <FieldLabel>Hemisphere</FieldLabel>
                    <div className="flex justify-center">
                        <HemisphereToggle val={wHem} setVal={setWHem} />
                    </div>
                    <div className="flex justify-center">
                        <HemisphereToggle val={!enabledSyncUtm ? tHem : wHem} setVal={setTHem} isDisabled={enabledSyncUtm} />
                    </div>

                    {/* Easting min/max */}
                    <div />
                    <div className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                        <span>{CONFIG_LIMITS.easting.min.toLocaleString()}</span>
                        <ArrowRight className="size-3" />
                        <span>{CONFIG_LIMITS.easting.max.toLocaleString()}</span>
                    </div>
                    <div />

                    {/* Easting */}
                    <FieldLabel>Easting</FieldLabel>
                    <div className="flex justify-center">
                        <NorthingEastingInput val={wEasting} setVal={setWEasting} />
                    </div>
                    <div className="flex justify-center">
                        <NorthingEastingInput val={tEasting} setVal={setTEasting} />
                    </div>

                    {/* Weapon Northing */}
                    <div />
                    <div className="flex items-center gap-0.5 text-[11px] 
                        text-muted-foreground">
                        <span>{wHem === "N" ? 
                            CONFIG_LIMITS.northingNorth.min.toLocaleString() : 
                            CONFIG_LIMITS.northingSouth.min.toLocaleString()
                        }</span>
                        <ArrowRight className="size-3" />
                        <span>{wHem === "N" ? 
                            CONFIG_LIMITS.northingNorth.max.toLocaleString() : 
                            CONFIG_LIMITS.northingSouth.max.toLocaleString()
                        }</span>
                    </div>

                    {/* Target Northing */}
                    <div className="flex items-center gap-0.5 text-[11px] 
                        text-muted-foreground">
                        <span>{(!enabledSyncUtm ? tHem : wHem) === "N" ? 
                            CONFIG_LIMITS.northingNorth.min.toLocaleString() : 
                            CONFIG_LIMITS.northingSouth.min.toLocaleString()
                        }</span>
                        <ArrowRight className="size-3" />
                        <span>{(!enabledSyncUtm ? tHem : wHem) === "N" ? 
                            CONFIG_LIMITS.northingNorth.max.toLocaleString() : 
                            CONFIG_LIMITS.northingSouth.max.toLocaleString()
                        }</span>
                    </div>

                    {/* Northing */}
                    <FieldLabel>Northing</FieldLabel>
                    <div className="flex justify-center">
                        <NorthingEastingInput val={wNorthing} setVal={setWNorthing} />
                    </div>
                    <div className="flex justify-center">
                        <NorthingEastingInput val={tNorthing} setVal={setTNorthing} />
                    </div>

                    {/* Error Display */}
                    <div />
                    <div />
                    <FieldLabel className="text-xs text-destructive justify-end w-full">{errorString}</FieldLabel>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async (e) => {
                            if (!(await prepareAzimuth())) {
                                e.preventDefault();
                            }
                        }}
                        variant="default">
                        Update Weapon Orientation
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
