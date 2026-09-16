import { Trash2Icon } from "lucide-react"
import { useState } from "react";
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
import { QE, processQECommand, QE_COMMANDS } from "@/features/qe";

type ConfirmDeleteProps = {
  qe: QE;
  onCancel: () => void;
};

export function AlertDeleteDialog({qe, onCancel }: ConfirmDeleteProps) {
  const [open, setOpen] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  async function handleConfirm() {
    setError("");

    const isDeleted = await processQECommand({
      type: QE_COMMANDS.DELETE,
      qe: qe,
    });

    if (!isDeleted) {
      setError("QE failed to delete.");
      return;
    }

    toast.success("QE delete success.")
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
      <AlertDialogContent size="sm" className="bg-popover text-popover-foreground">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle className="font-bold">Delete QE {qe.count}{qe.qeType}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all site data associated with this quality evaluation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="text-destructive">{error}</div>
        <AlertDialogFooter>
          <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm} 
            variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
