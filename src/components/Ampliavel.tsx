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
            <span className="pointer-events-none absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white opacity-90 backdrop-blur transition-opacity group-hover/amp:opacity-100 sm:opacity-0">
              <Maximize2 className="h-3 w-3" strokeWidth={2.5} />
              Ampliar
            </span>
          </>
        )
      }
    </Expandable>
  );
}
