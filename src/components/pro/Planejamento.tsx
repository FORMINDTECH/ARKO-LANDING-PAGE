"use client";

import { useState } from "react";
import Container from "../Container";
import Reveal from "../Reveal";
import Browser, { PainelImagem } from "../devices/Browser";
import Titulo from "../ui/Titulo";
import type { TelaPainel } from "../devices/telas";

/**
 * Preserva o padrão da seção do painel da landing original (lista com barra laranja que comanda
 * a tela, troca em crossfade de 900 ms), mas agora com o painel real em tamanho de trabalho:
 * a tela ocupa dois terços da largura e a lista vira um índice numerado.
 */
const ETAPAS: { tela: TelaPainel; titulo: string; texto: string }[] = [
  {
    tela: "treinos",
    titulo: "Treino de cada aluno",
    texto: "Escolha o aluno, veja o perfil e as medidas ao lado e monte os treinos dele. Exporte ou parta de um modelo.",
  },
  {
    tela: "alimentacao",
    titulo: "Metas de dieta",
    texto: "Calorias, proteína, carboidrato, gordura e água por aluno, com a distribuição calculada na hora.",
  },
  {
    tela: "modelos",
    titulo: "Modelos reutilizáveis",
    texto: "Monte uma vez e aplique a vários alunos. Cada um recebe uma cópia, que você ajusta sem mexer no modelo.",
  },
  {
    tela: "desafios",
    titulo: "Desafios em grupo",
    texto: "Crie desafios que só os seus alunos enxergam. Eles entram com um toque e disputam o placar.",
  },
];

export default function Planejamento() {
  const [ativa, setAtiva] = useState(0);

  return (
    <section id="planejamento" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Titulo
          rotulo="02 · Planejamento"
          titulo="Monte uma vez. Ajuste para cada um."
          apoio="Treino, dieta, modelos e desafios ficam no computador, onde dá para trabalhar com calma."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[340px_minmax(0,1fr)]">
          {/* índice: no celular vira uma fileira rolável */}
          <Reveal direction="left" className="min-w-0">
            <div role="tablist" aria-label="Partes do planejamento" className="sem-barra -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
              {ETAPAS.map((e, i) => {
                const on = ativa === i;
                return (
                  <button
                    key={e.tela}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="planejamento-tela"
                    onMouseEnter={() => setAtiva(i)}
                    onFocus={() => setAtiva(i)}
                    onClick={() => setAtiva(i)}
                    className={`relative shrink-0 cursor-pointer rounded-2xl px-5 py-3 text-left transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:py-5 lg:pl-7 ${
                      on ? "bg-surface-2" : "hover:bg-surface-2/60"
                    }`}
                  >
                    <span
                      className={`absolute inset-y-3 left-2 hidden w-1 rounded-full bg-accent transition-transform duration-300 ease-out lg:block ${
                        on ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <span className="flex items-baseline gap-3">
                      <span className={`font-data text-xs font-semibold ${on ? "text-accent" : "text-ink-muted"}`}>
                        0{i + 1}
                      </span>
                      <span className={`whitespace-nowrap text-base font-semibold transition-colors ${on ? "text-ink" : "text-ink-muted"}`}>
                        {e.titulo}
                      </span>
                    </span>
                    <span
                      className={`hidden transition-[grid-template-rows] duration-300 ease-out lg:grid ${
                        on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <span
                        className={`overflow-hidden pl-8 text-sm leading-relaxed text-ink-muted transition-opacity duration-200 ${
                          on ? "pt-2 opacity-100 delay-100" : "opacity-0"
                        }`}
                      >
                        {e.texto}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted lg:hidden">{ETAPAS[ativa].texto}</p>
          </Reveal>

          {/* tela: as quatro empilhadas, só a ativa aparece */}
          <Reveal delay={100} direction="right" className="min-w-0">
            <Browser tela={ETAPAS[ativa].tela}>
              <div id="planejamento-tela" role="tabpanel" className="grid">
                {ETAPAS.map((e, i) => (
                  <div
                    key={e.tela}
                    aria-hidden={ativa !== i}
                    className={`col-start-1 row-start-1 transition-opacity duration-[900ms] ease-in-out ${
                      ativa === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <PainelImagem tela={e.tela} sizes="(min-width: 1280px) 860px, 96vw" />
                  </div>
                ))}
              </div>
            </Browser>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
