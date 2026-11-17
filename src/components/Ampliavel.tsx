"use client";

import { ReactNode } from "react";
import { Maximize2 } from "lucide-react";
import Expandable from "./Expandable";

/**
 * Clique/toque para ver em tamanho grande (lightbox da landing original).
 * `ampliado` é o que aparece no lightbox (ex.: o mesmo aparelho, com a largura ajustada à tela);
 * sem ele, o próprio conteúdo é mostrado numa largura grande. Aceita conteúdo de server components.
 */
export default function Ampliavel({
  children,
  ampliado,
  className = "",
  label = "Ampliar tela",
}: {
  children: ReactNode;
  ampliado?: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <Expandable label={label} triggerClassName={`group/amp relative block shrink-0 ${className}`}>
      {(expanded) =>
        expanded ? (
          (ampliado ?? <div className="w-[min(94vw,1400px)]">{children}</div>)
        ) : (
          <>
            {children}
            {/* no celular: só o ícone, pequeno e discreto; no desktop: com texto, aparece no hover */}
            <span className="pointer-events-none absolute bottom-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white/90 backdrop-blur transition-opacity group-hover/amp:opacity-100 sm:bottom-3 sm:right-3 sm:h-auto sm:w-auto sm:gap-1.5 sm:bg-black/70 sm:px-3 sm:py-1.5 sm:text-[11px] sm:font-semibold sm:opacity-0">
              <Maximize2 className="h-3 w-3" strokeWidth={2.5} />
              <span className="hidden sm:inline">Ampliar</span>
            </span>
          </>
        )
      }
    </Expandable>
  );
}
