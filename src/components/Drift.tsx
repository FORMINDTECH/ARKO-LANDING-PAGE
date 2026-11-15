"use client";

import { CSSProperties, ReactNode, useEffect, useRef } from "react";

/**
 * Deslocamento leve ligado à rolagem (parallax contido). Não prende a rolagem:
 * só move o elemento alguns pixels conforme ele atravessa a tela.
 *
 * - `y` / `x`: deslocamento máximo em px (positivo = desce/vai para a direita ao rolar).
 * - `rotate`: rotação extra máxima em graus.
 * - `tilt`: inclinação em X (graus) que vai a zero quando o centro do bloco chega ao meio da tela.

 */
export default function Drift({
  children,
  y = 0,
  x = 0,
  rotate = 0,
  tilt = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  y?: number;
  x?: number;
  rotate?: number;
  tilt?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let visivel = false;
    let raf = 0;

    const atualizar = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 quando o bloco entra por baixo, 0 no meio da tela, 1 quando sai por cima
      const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
      const t = tilt ? Math.max(0, -p) * tilt : 0;
      el.style.transform = `perspective(1600px) translate3d(${(p * x).toFixed(2)}px, ${(p * y).toFixed(2)}px, 0) rotate(${(p * rotate).toFixed(2)}deg) rotateX(${t.toFixed(2)}deg)`;
    };

    const pedir = () => {
      if (visivel && !raf) raf = requestAnimationFrame(atualizar);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visivel = e.isIntersecting;
        if (visivel) pedir();
      },
      { rootMargin: "100px 0px" }
    );
    io.observe(el);
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    atualizar();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [x, y, rotate, tilt]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`} style={style}>
      {children}
    </div>
  );
}
