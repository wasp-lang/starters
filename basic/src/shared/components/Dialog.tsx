import React from "react";
import { createPortal } from "react-dom";
import { usePortalContainer } from "../hooks/usePortal";

interface DialogProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
}

export function Dialog({
  open,
  onClose,
  children,
  closeOnClickOutside = true,
  closeOnEscape = true,
}: DialogProps) {
  const container = usePortalContainer();

  React.useEffect(
    function handleCloseOnClickOutside() {
      if (!open) return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    },
    [open, container],
  );

  React.useEffect(
    function handleCloseOnEscape() {
      if (!open || !closeOnEscape) return;

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", onKeyDown);
      return () => {
        window.removeEventListener("keydown", onKeyDown);
      };
    },
    [open, onClose],
  );

  if (!open || !container) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
        onClick={closeOnClickOutside ? onClose : undefined}
        aria-hidden="true"
      />
      <div className="relative z-10 shadow-lg">{children}</div>
    </div>,
    container,
  );
}
