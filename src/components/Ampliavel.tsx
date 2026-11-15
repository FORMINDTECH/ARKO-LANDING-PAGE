"use client";

import { ReactNode } from "react";
import { Maximize2 } from "lucide-react";
import Expandable from "./Expandable";

/**
 * Toque/clique para ver a tela em tamanho grande (lightbox da landing original).
 * Útil no celular, onde o painel aparece pequeno. Aceita conteúdo vindo de server components.
 */
export default function Ampliavel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Expandable label="Ampliar tela" triggerClassName={`group/amp relative block ${className}`}>
      {(expanded) =>
        expanded ? (
          <div className="w-[min(94vw,1400px)]">{children}</div>
        ) : (
          <>
            {children}
            <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white opacity-90 backdrop-blur transition-opacity group-hover/amp:opacity-100 sm:opacity-0">
              <Maximize2 className="h-3 w-3" strokeWidth={2.5} />
              Ampliar
            </span>
          </>
        )
      }
    </Expandable>
  );
}
