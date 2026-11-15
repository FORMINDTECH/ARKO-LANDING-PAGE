"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import type Lenis from "lenis";

/** Altura reservada para o cabeçalho fixo (pílula de 64 px + 16 px de margem + folga). */
const TOPO = 96;

/**
 * Rola até um elemento. Seções marcadas com `data-centralizar` ficam no meio da área visível
 * (abaixo do cabeçalho); as demais encostam logo abaixo do cabeçalho.
 */
export function rolarAte(lenis: Lenis, alvo: HTMLElement, immediate = false) {
  const r = alvo.getBoundingClientRect();
  const topoAtual = r.top + window.scrollY;
  let destino = topoAtual - TOPO;
  if (alvo.hasAttribute("data-centralizar")) {
    const livre = window.innerHeight - TOPO;
    const sobra = livre - r.height;
    destino = sobra > 0 ? topoAtual - TOPO - sobra / 2 : topoAtual - TOPO;
  }
  lenis.scrollTo(Math.max(0, destino), { immediate });
}

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
      requestAnimationFrame(() => rolarAte(lenis, alvo, true));
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
    // só quando a rota muda
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

/** Links para âncoras da própria página: rolagem suave, respeitando `data-centralizar`. */
function AncorasSuaves() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (!url.hash || url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const alvo = document.querySelector(url.hash);
      if (!(alvo instanceof HTMLElement)) return;
      e.preventDefault();
      rolarAte(lenis, alvo);
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

/**
 * Rolagem suave (Lenis), igual à da landing original: sempre ligada. Não depende de
 * prefers-reduced-motion porque o Windows com "efeitos de animação" desligados ativa essa
 * preferência e a rolagem suave sumia.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ duration: 1.5 }}>
      <TopoAoNavegar />
      <AncorasSuaves />
      {children}
    </ReactLenis>
  );
}
