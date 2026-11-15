"use client";

import { useState } from "react";
import Container from "../Container";
import Reveal from "../Reveal";
import Browser, { PainelImagem } from "../devices/Browser";
import Recorte from "../devices/Recorte";
import Titulo from "../ui/Titulo";

/**
 * Substitui os quatro flip cards da landing antiga. Conceito: a tela real de alunos, grande,
 * explicada pela legenda ao lado (sempre visível). Passar o mouse, focar ou tocar num item da
 * legenda contorna o elemento correspondente na própria interface e escurece o resto da tela.
 * Caixas em % da captura alunos (2880 × 1620): x, y, largura, altura.
 */
const NOTAS = [
  {
    id: "convite",
    caixa: { x: 79.3, y: 14.2, w: 17.3, h: 7.2 },
    titulo: "Código de convite",
    texto: "Mande o link para o próximo aluno. Ao abrir, ele já fica vinculado a você.",
  },
  {
    id: "cadastro",
    caixa: { x: 84.3, y: 29.0, w: 12.2, h: 7.0 },
    titulo: "Cadastro manual",
    texto: "Cadastre também quem ainda não instalou o app.",
  },
  {
    id: "busca",
    caixa: { x: 20.2, y: 29.0, w: 63.6, h: 7.0 },
    titulo: "Todos numa lista",
    texto: "Busque por nome ou e-mail e chegue a qualquer aluno em segundos.",
  },
  {
    id: "sem-app",
    caixa: { x: 24.6, y: 83.2, w: 16.6, h: 6.8 },
    titulo: "Quem está sem app",
    texto: "Alunos cadastrados à mão aparecem marcados, para você saber quem ainda falta convidar.",
  },
];

export default function GestaoAlunos() {
  const [ativa, setAtiva] = useState<string | null>(null);
  const atual = NOTAS.find((n) => n.id === ativa) ?? null;

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
          {/* a tela, com o destaque do item da legenda */}
          <Reveal direction="scale" className="relative">
            <Browser tela="alunos">
              <div className="relative overflow-hidden">
                <PainelImagem tela="alunos" />
                {/*
                  Uma caixa só, que desliza de um elemento para o outro. A sombra gigante escurece
                  o resto da tela (efeito de holofote); a borda laranja contorna o elemento.
                */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute rounded-[10px] border-2 border-accent transition-[left,top,width,height,opacity,box-shadow] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    atual
                      ? "opacity-100 shadow-[0_0_0_9999px_rgba(0,0,0,0.42),0_0_24px_rgba(253,130,15,0.45)]"
                      : "opacity-0 shadow-[0_0_0_9999px_rgba(0,0,0,0)]"
                  }`}
                  style={{
                    left: `${(atual ?? NOTAS[0]).caixa.x}%`,
                    top: `${(atual ?? NOTAS[0]).caixa.y}%`,
                    width: `${(atual ?? NOTAS[0]).caixa.w}%`,
                    height: `${(atual ?? NOTAS[0]).caixa.h}%`,
                  }}
                />
              </div>
            </Browser>
          </Reveal>

          {/* legenda sempre visível */}
          <div className="flex flex-col gap-10 self-start">
            <ul onMouseLeave={() => setAtiva(null)} className="flex flex-col divide-y divide-line border-y border-line">
              {NOTAS.map((nota, i) => {
                const on = ativa === nota.id;
                return (
                  <Reveal as="li" key={nota.id} delay={i * 100} direction="right">
                    <button
                      type="button"
                      aria-pressed={on}
                      onMouseEnter={() => setAtiva(nota.id)}
                      onFocus={() => setAtiva(nota.id)}
                      onBlur={() => setAtiva(null)}
                      onClick={() => setAtiva(on ? null : nota.id)}
                      className="relative w-full py-5 pl-5 text-left outline-none"
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-y-4 left-0 w-1 origin-center rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          on ? "scale-y-100" : "scale-y-0"
                        }`}
                      />
                      <span
                        className={`block font-sans text-base font-semibold transition-colors duration-300 ${
                          on ? "text-accent" : "text-ink"
                        }`}
                      >
                        {nota.titulo}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{nota.texto}</span>
                    </button>
                  </Reveal>
                );
              })}
            </ul>

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
