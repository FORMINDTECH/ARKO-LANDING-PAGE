"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

/** Ao trocar de página, volta ao topo (ou à âncora do link) sem animar. */
function TopoAoNavegar() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    const alvo = hash ? document.querySelector(hash) : null;
    if (alvo instanceof HTMLElement) {
      // deixa a página nova pintar antes de ir até a seção
      requestAnimationFrame(() => lenis.scrollTo(alvo, { offset: -80, immediate: true }));
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
    // só quando a rota muda
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

/**
 * Rolagem suave (Lenis), igual à da landing original: sempre ligada. Não depende de
 * prefers-reduced-motion porque o Windows com "efeitos de animação" desligados ativa essa
 * preferência e a rolagem suave sumia.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.5,
        anchors: { offset: -80 },
      }}
    >
      <TopoAoNavegar />
      {children}
    </ReactLenis>
  );
}
