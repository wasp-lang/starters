import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

interface DialogProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export function Dialog({ open, onClose, children }: DialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 shadow-lg">{children}</div>
    </div>,
    document.body,
  );
}
