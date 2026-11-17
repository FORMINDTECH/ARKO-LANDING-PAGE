"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/** Duração da entrada e da saída do lightbox (ms). */
const DURACAO = 320;

/**
 * Lightbox: clique no conteúdo para ver em tamanho grande.
 * Abre e fecha com transição suave: o fundo escurece/clareia e o conteúdo cresce/encolhe de leve.
 */
export default function Expandable({
  children,
  label = "Ampliar tela",
  triggerClassName = "",
}: {
  children: (expanded: boolean) => ReactNode;
  label?: string;
  triggerClassName?: string;
}) {
  // montado: o portal existe; visivel: está no estado final da transição
  const [montado, setMontado] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const abrir = () => {
    if (timer.current) clearTimeout(timer.current);
    setMontado(true);
    // dois quadros: o portal pinta no estado inicial e só então vai para o final (dispara a transição)
    requestAnimationFrame(() => requestAnimationFrame(() => setVisivel(true)));
  };

  const fechar = useCallback(() => {
    setVisivel(false);
    timer.current = setTimeout(() => setMontado(false), DURACAO);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!montado) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [montado, fechar]);

  const curva = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={abrir}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            abrir();
          }
        }}
        aria-label={label}
        className={`cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${triggerClassName}`}
      >
        {children(false)}
      </div>

      {montado
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={label}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
              onClick={fechar}
              style={{
                backgroundColor: visivel ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0)",
                backdropFilter: visivel ? "blur(6px)" : "blur(0px)",
                transition: `background-color ${DURACAO}ms ease, backdrop-filter ${DURACAO}ms ease`,
              }}
            >
              <button
                type="button"
                onClick={fechar}
                aria-label="Fechar"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5 sm:top-5"
                style={{ opacity: visivel ? 1 : 0, transition: `opacity ${DURACAO}ms ease` }}
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>
              <div
                data-lenis-prevent
                className="max-h-[88vh] max-w-full overflow-auto overscroll-contain sm:max-w-[92vw]"
                onClick={(e) => e.stopPropagation()}
                style={{
                  opacity: visivel ? 1 : 0,
                  transform: visivel ? "translateY(0) scale(1)" : "translateY(12px) scale(0.94)",
                  transition: `opacity ${DURACAO}ms ${curva}, transform ${DURACAO + 80}ms ${curva}`,
                }}
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
