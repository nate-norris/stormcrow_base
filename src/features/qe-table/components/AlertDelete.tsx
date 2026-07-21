import { Trash2Icon } from "lucide-react"

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
import type { QEKey } from "../core/qeKey";

type ConfirmDeleteProps = {
  qeKey: QEKey;
  onCancel: () => void;
  onConfirm: (key: QEKey) => void;
};

export function AlertDeleteDialog({qeKey, onCancel, onConfirm}: ConfirmDeleteProps) {
  return (
    <AlertDialog open={!!qeKey} onOpenChange={(o) => !o && onCancel()}>
      <AlertDialogContent size="sm" className="bg-popover text-popover-foreground">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle className="font-bold">Delete QE {qeKey.count}{qeKey.qeType}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all site data associated with this quality evaluation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => onConfirm(qeKey)} 
            variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
