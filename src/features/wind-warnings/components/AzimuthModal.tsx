import { CompassIcon } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner";

import { Hemisphere, Point } from "../core/models";
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



type Props = {
    onCancel: () => void;
    onConfirm: (zone: number, hemisphere: Hemisphere, gun: Point, target: Point) => void;
}

export function AzimuthDialog({ onCancel, onConfirm }: Props) {

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

    function prepareAzimuth() {
        try {
            // onConfirm();
            toast.success("Azimuth updated success");
        } catch (err) {
            toast.error("Azimuth update failed");
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

                    {/* Easting */}
                    <FieldLabel>Easting</FieldLabel>
                    <div className="flex justify-center">
                        <NorthingEastingInput val={wEasting} setVal={setWEasting} />
                    </div>
                    <div className="flex justify-center">
                        <NorthingEastingInput val={!enabledSyncUtm ? tEasting : wEasting} setVal={setTEasting} isDisabled={enabledSyncUtm} />
                    </div>

                    {/* Northing */}
                    <FieldLabel>Northing</FieldLabel>
                    <div className="flex justify-center">
                        <NorthingEastingInput val={wNorthing} setVal={setWNorthing} />
                    </div>
                    <div className="flex justify-center">
                        <NorthingEastingInput val={!enabledSyncUtm ? tNorthing : wNorthing} setVal={setTNorthing} isDisabled={enabledSyncUtm} />
                    </div>

                    {/* Error Display */}
                    <div />
                    <div />
                    <FieldLabel className="text-xs text-destructive">{errorString}</FieldLabel>
                </div>
                
                <AlertDialogFooter>
                    <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={true}
                        onClick={() => prepareAzimuth()}
                        variant="default">
                        Update Weapon Orientation
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}