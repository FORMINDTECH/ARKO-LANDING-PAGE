"use client";

import { useState } from "react";
import Container from "../Container";
import Reveal from "../Reveal";
import Browser, { PainelImagem } from "../devices/Browser";
import Recorte from "../devices/Recorte";
import Titulo from "../ui/Titulo";

/**
 * Substitui os quatro flip cards da landing antiga. Conceito: a tela real de alunos, grande,
 * anotada como um manual. Marcadores numerados ficam sobre a própria interface e a legenda
 * ao lado está sempre visível; passar o mouse (ou o foco) numa legenda acende o marcador.
 * Coordenadas em % da captura alunos (2880 × 1620).
 */
const NOTAS = [
  {
    n: 1,
    x: 78.5,
    y: 17.5,
    titulo: "Código de convite",
    texto: "Mande o link para o próximo aluno. Ao abrir, ele já fica vinculado a você.",
  },
  {
    n: 2,
    x: 84.5,
    y: 30,
    titulo: "Cadastro manual",
    texto: "Cadastre também quem ainda não instalou o app.",
  },
  {
    n: 3,
    x: 20.6,
    y: 30,
    titulo: "Todos numa lista",
    texto: "Busque por nome ou e-mail e chegue a qualquer aluno em segundos.",
  },
  {
    n: 4,
    x: 41,
    y: 85.3,
    titulo: "Quem está sem app",
    texto: "Alunos cadastrados à mão aparecem marcados, para você saber quem ainda falta convidar.",
  },
];

export default function GestaoAlunos() {
  const [ativa, setAtiva] = useState<number | null>(null);

  return (
    <section id="alunos" className="relative py-24 sm:py-32">
      <Container>
        <Titulo
          rotulo="01 · Gestão de alunos"
          titulo={
            <>
              Cada aluno no lugar certo, <span className="grifo">sem planilha</span>.
            </>
          }
          apoio="É a primeira tela do seu dia: quem são seus alunos, como chegam até você e quem precisa de atenção."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* tela anotada */}
          <Reveal direction="scale" className="relative">
            <Browser tela="alunos">
              <div className="relative">
                <PainelImagem tela="alunos" sizes="(min-width: 1280px) 860px, 96vw" />
                {NOTAS.map((nota) => (
                  <span
                    key={nota.n}
                    aria-hidden
                    className={`absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-data text-[11px] font-semibold transition-[transform,background-color,box-shadow] duration-300 sm:h-8 sm:w-8 sm:text-xs ${
                      ativa === nota.n
                        ? "scale-125 bg-accent text-[#0b0b0c] shadow-[0_0_0_6px_rgba(253,130,15,0.25)]"
                        : "bg-accent text-[#0b0b0c] shadow-[0_0_0_4px_rgba(253,130,15,0.18)]"
                    }`}
                    style={{ left: `${nota.x}%`, top: `${nota.y}%` }}
                  >
                    {nota.n}
                  </span>
                ))}
              </div>
            </Browser>

          </Reveal>

          {/* legenda sempre visível */}
          <div className="flex flex-col gap-10 self-start">
          <ol className="flex flex-col divide-y divide-line border-y border-line">
            {NOTAS.map((nota, i) => (
              <Reveal as="li" key={nota.n} delay={i * 100} direction="right">
                <div
                  tabIndex={0}
                  onMouseEnter={() => setAtiva(nota.n)}
                  onMouseLeave={() => setAtiva(null)}
                  onFocus={() => setAtiva(nota.n)}
                  onBlur={() => setAtiva(null)}
                  className="group flex gap-4 py-5 outline-none"
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-data text-xs font-semibold transition-colors duration-300 ${
                      ativa === nota.n ? "border-accent bg-accent text-[#0b0b0c]" : "border-accent/60 text-accent"
                    }`}
                  >
                    {nota.n}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-ink [font-stretch:100%]">{nota.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{nota.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

            {/* o outro lado do dia: quem parou, vindo do dashboard */}
            <Reveal delay={400} direction="right">
              <Recorte nome="atividade" rotulo="No dashboard: quem parou de treinar" sizes="340px" />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
