import { useState, useMemo } from "react";
import { useAtomValue } from "jotai";
import { ReplaceIcon } from "lucide-react"

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
import { QEType } from "@/features/qe-logging/";
import { QECountSpinner } from "./QECountSpinner";
import { QETypeSelector } from "./QETypeSelector";
import { weatherRowsAtom } from "../state/weatherRowsAtom";

type ConfirmDeleteProps = {
  qeKey: QEKey;
  onCancel: () => void;
  onConfirm: (key: QEKey) => void;
};

export function AlertReassignDialog({qeKey, onCancel, onConfirm}: ConfirmDeleteProps) {
  
  const [count, setCount] = useState<number>(qeKey.count);
  const [qet, setQet] = useState<QEType>(qeKey.qeType);
  const weatherRows = useAtomValue(weatherRowsAtom);

  const isOverwriting = useMemo(() => {
    return weatherRows.some(
      row =>
        row.count === count &&
        row.qeType === qet
    );
  }, [count, qet, weatherRows]);

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
        <div className="flex justify-center gap-x-4">
          <div className="text-lg font-semibold">Destination</div>
          {isOverwriting && <Badge variant="destructive">Overwriting</Badge>}
        </div>
        <div className="flex gap-x-4 justify-center">
            <QECountSpinner val={count} setVal={setCount} />
            <QETypeSelector val={qet} setVal={setQet} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => onConfirm(qeKey)}
            variant="destructive">
            Reassign
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}