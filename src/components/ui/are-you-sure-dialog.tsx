"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AreYouSureDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  okText?: string;
  cancelText?: string;
};

export function AreYouSureDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  okText = "Confirm",
  cancelText = "Cancel"
}: AreYouSureDialogProps) {
  const handleConfirm = () => {
    onOpenChange(false);
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button type='button' onClick={handleConfirm}>
            {okText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
