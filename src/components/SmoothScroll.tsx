"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";

const CONSULTA = "(prefers-reduced-motion: reduce)";
const assinar = (aviso: () => void) => {
  const mq = window.matchMedia(CONSULTA);
  mq.addEventListener("change", aviso);
  return () => mq.removeEventListener("change", aviso);
};

/** Rolagem inercial. Desligada para quem pede menos movimento. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduzir = useSyncExternalStore(assinar, () => window.matchMedia(CONSULTA).matches, () => false);

  if (reduzir) return <>{children}</>;

  return (
    <ReactLenis root options={{ duration: 1.15, anchors: { offset: -88 } }}>
      {children}
    </ReactLenis>
  );
}
