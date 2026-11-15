"use client";

import { ReactNode, useEffect, useRef } from "react";

/** O painel começa inclinado e se endireita conforme a página rola (desligado com menos movimento). */
export default function InclinaAoRolar({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const atualizar = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 quando o topo do painel está no fundo da tela, 1 quando chega a 35% da altura
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.65)));
      const ang = 14 * (1 - p);
      const esc = 0.94 + 0.06 * p;
      el.style.transform = `perspective(1600px) rotateX(${ang.toFixed(2)}deg) scale(${esc.toFixed(3)})`;
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(atualizar);
    };
    atualizar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`origin-top will-change-transform ${className}`}>
      {children}
    </div>
  );
}
