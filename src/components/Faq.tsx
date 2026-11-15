"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

export type Pergunta = { pergunta: string; resposta: string };

/** Lista de perguntas em acordeão. Um item aberto por vez. */
export default function Faq({ itens, abertoInicial = 0 }: { itens: Pergunta[]; abertoInicial?: number | null }) {
  const [aberto, setAberto] = useState<number | null>(abertoInicial);
  const base = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {itens.map((item, i) => {
        const open = aberto === i;
        const idBotao = `${base}-b${i}`;
        const idPainel = `${base}-p${i}`;
        return (
          <div key={item.pergunta}>
            <h3 className="font-sans" style={{ fontStretch: "100%" }}>
              <button
                id={idBotao}
                type="button"
                aria-expanded={open}
                aria-controls={idPainel}
                onClick={() => setAberto(open ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-semibold text-ink transition-colors hover:text-accent-ink sm:py-6 sm:text-lg"
              >
                {item.pergunta}
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    open ? "rotate-45 border-accent bg-accent text-carbono" : "border-line-strong text-ink-muted group-hover:border-ink"
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </button>
            </h3>
            <div
              id={idPainel}
              role="region"
              aria-labelledby={idBotao}
              className={`grid transition-[grid-template-rows] duration-400 ease-out-expo ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className={`max-w-2xl pb-6 pr-12 leading-relaxed text-ink-muted transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
                  {item.resposta}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
