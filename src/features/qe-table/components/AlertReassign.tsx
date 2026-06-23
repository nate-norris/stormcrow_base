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
import type { QEKey } from "../core/qeKey";
import { type QEBase, type QEType } from "@/features/qe-logging/";
import { QECountSpinner } from "./QECountSpinner";
import { QETypeSelector } from "./QETypeSelector";
import { weatherRowsAtom } from "../state/weatherRowsAtom";
import { buildQEBaseFromKey } from "../actions/buildQEBaseFromKey";

type ConfirmDeleteProps = {
  qeKey: QEKey;
  onCancel: () => void;
  onConfirm: (source: QEBase, destination: QEBase) => void;
};

export function AlertReassignDialog({qeKey, onCancel, onConfirm}: ConfirmDeleteProps) {
  
  const [count, setCount] = useState<number>(qeKey.count);
  const [qet, setQet] = useState<QEType>(qeKey.qeType);
  const weatherRows = useAtomValue(weatherRowsAtom);

  const isOverwriting: boolean = useMemo(() => {
    return weatherRows.some(
      row =>
        row.count === count &&
        row.qeType === qet
    );
  }, [count, qet, weatherRows]);
  
  const isSourceDestionationSame: boolean = useMemo(() => {
    return qeKey.count === count && qeKey.qeType === qet;
  }, [count, qet]);

  function prepareReassignment() {
    const source = buildQEBaseFromKey(qeKey);
    const destination = buildQEBaseFromKey({
      count: count,
      qeType: qet,
    });
    // confirm proper source and destination
    if (!source || !destination) return;

    try {
      onConfirm(source, destination);
      toast.success("QE reassignment success")

    } catch (err) {
      toast.error("QE reassignment failed");
      //TODO: log error
    }
  }

  return (
    <AlertDialog open={!!qeKey} onOpenChange={(o) => !o && onCancel()}>
      <AlertDialogContent size="default" className="bg-white">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <ReplaceIcon />
          </AlertDialogMedia>
          <AlertDialogTitle className="font-bold">Reassign QE {qeKey.count}{qeKey.qeType}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will overwrite any previous quality evalution sites at the new destination.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="text-lg font-semibold ml-auto">Destination</div>
          {isOverwriting && <Badge variant="destructive">Overwriting</Badge>}
        </div>
        <div className="flex gap-x-4 justify-center">
            <QECountSpinner val={count} setVal={setCount} />
            <QETypeSelector val={qet} setVal={setQet} />
        </div>
        <AlertDialogFooter>
          {isSourceDestionationSame && <div className="mt-1 mr-5 font-small text-red-500">Select a new destination</div>}
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isSourceDestionationSame}
            onClick={() => prepareReassignment()}
            variant="destructive">
            Reassign
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}