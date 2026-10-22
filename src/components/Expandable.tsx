"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function Expandable({
  children,
  label = "Ampliar tela",
  triggerClassName = "",
}: {
  children: (expanded: boolean) => ReactNode;
  label?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={label}
        className={`cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${triggerClassName}`}
      >
        {children(false)}
      </div>

      {open && mounted
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>
              <div
                className="max-h-[88vh] max-w-[92vw] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {children(true)}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
