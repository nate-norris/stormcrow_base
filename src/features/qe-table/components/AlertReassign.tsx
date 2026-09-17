import { useState, useMemo } from "react";
import { useAtomValue } from "jotai";
import { ReplaceIcon } from "lucide-react"
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge";
import { type QEType, type QE, QECountSpinner, QETypeSelector, QE_COMMANDS, 
  processQECommand } from "@/features/qe";
  
import { weatherRowsAtom } from "../state/weatherRowsAtom";

type ConfirmDeleteProps = {
  qe: QE;
  onCancel: () => void;
};

export function AlertReassignDialog({qe, onCancel }: ConfirmDeleteProps) {
  
  const [open, setOpen] = useState<boolean>(true);
  const [count, setCount] = useState<number>(qe.count);
  const [qet, setQet] = useState<QEType>(qe.qeType);
  const weatherRows = useAtomValue(weatherRowsAtom);
  const [error, setError] = useState<string>("");

  // new distination will be overwritten
  const isOverwriting: boolean = useMemo(() => {
    return weatherRows.some(
      row =>
        row.count === count &&
        row.qeType === qet
    );
  }, [count, qet, weatherRows]);
  
  // attempting to overwrite the same qe
  const isSourceDestinationSame: boolean = useMemo(() => {
    return qe.count === count && qe.qeType === qet;
  }, [count, qet]);
  
  async function handleConfirm() {
    setError("");

    const isReassigned = await processQECommand({
      type: QE_COMMANDS.REASSIGN,
      base: qe,
      destination: {count: count, qeType: qet},
    });

    if (!isReassigned) {
      setError("QE failed to reassign");
      return;
    }

    toast.success("QE reassignment success")
    setOpen(false);
  }

  return (
    <AlertDialog 
      open={!!qe && open}
      onOpenChange={(open) => {
        if (!open) {
          onCancel();
        }
      }}
    >
      <AlertDialogContent size="default" className="bg-popover text-popover-foreground">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <ReplaceIcon />
          </AlertDialogMedia>
          <AlertDialogTitle className="font-bold">Reassign QE {qe.count}{qe.qeType}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will overwrite any previous quality evalution sites at the new destination.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="text-lg font-semibold ml-auto">Destination</div>
          {isOverwriting && <Badge variant="destructive">Overwriting</Badge>}
        </div>
        <div className="flex gap-x-4 justify-center">
          <QECountSpinner value={count} onChange={setCount}/>
          <QETypeSelector value={qet} onChange={setQet} />
        </div>
        <div className="text-destructive">{error}</div>
        <AlertDialogFooter>
          {isSourceDestinationSame && <div className="mt-1 mr-5 font-small text-status-danger">Select a new destination</div>}
          <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isSourceDestinationSame}
            onClick={handleConfirm}
            variant="destructive">
            Reassign
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}