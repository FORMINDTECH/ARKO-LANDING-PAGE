"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardList, LineChart, MessagesSquare, Settings2 } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import BrowserFrame, { PainelImagem, type TelaPainel } from "../devices/BrowserFrame";

type Recurso = {
  titulo: string;
  texto: string;
  tela: TelaPainel;
  /** Área em destaque na tela, em % (x, y, largura, altura). */
  area: [number, number, number, number];
};

type Contexto = { id: string; rotulo: string; frase: string; icone: typeof ClipboardList; recursos: Recurso[] };

// Funções reais do painel (ARKO-WEB), agrupadas pelo momento de uso.
const CONTEXTOS: Contexto[] = [
  {
    id: "montar",
    rotulo: "Montar",
    frase: "Prescreva sem planilha.",
    icone: ClipboardList,
    recursos: [
      {
        titulo: "Treinos por aluno",
        texto: "Monte a divisão de cada aluno com exercícios, séries, carga e técnica. O perfil e as medidas ficam ao lado enquanto você prescreve.",
        tela: "treinos",
        area: [19.5, 71, 78.5, 29],
      },
      {
        titulo: "Plano alimentar",
        texto: "Defina calorias, macros e água, e veja a distribuição na hora. Templates de refeição aceleram o próximo plano.",
        tela: "alimentacao",
        area: [42.5, 17, 55.5, 51.5],
      },
      {
        titulo: "Modelos reutilizáveis",
        texto: "Crie um modelo de treino ou de dieta uma vez e aplique a vários alunos. Cada um recebe a própria cópia para ajustar.",
        tela: "modelos",
        area: [19.5, 21.5, 78.5, 78.5],
      },
    ],
  },
  {
    id: "acompanhar",
    rotulo: "Acompanhar",
    frase: "Veja a evolução, não só a sensação.",
    icone: LineChart,
    recursos: [
      {
        titulo: "Avaliação física",
        texto: "Peso, IMC, circunferências e dobras cutâneas, com a variação desde a última avaliação em cada medida.",
        tela: "medidas",
        area: [19, 48.5, 79, 17],
      },
      {
        titulo: "Atividade da base",
        texto: "Quem treinou nos últimos 7 dias, quem está parado e há quanto tempo. Dá para agir antes de o aluno sumir.",
        tela: "dashboard",
        area: [19.5, 45, 40, 53],
      },
    ],
  },
  {
    id: "engajar",
    rotulo: "Engajar",
    frase: "Esteja presente entre as sessões.",
    icone: MessagesSquare,
    recursos: [
      {
        titulo: "Chat com treino e refeições",
        texto: "Converse com cada aluno e com grupos. Treinos concluídos e o total do dia aparecem direto na conversa.",
        tela: "chat",
        area: [41.5, 38, 20, 38],
      },
      {
        titulo: "Desafios em grupo",
        texto: "Dias seguidos, minutos treinados, água ou calorias: crie o desafio e os alunos disputam o placar no app.",
        tela: "desafios",
        area: [20, 23.5, 78, 76.5],
      },
    ],
  },
  {
    id: "gerir",
    rotulo: "Gerir",
    frase: "A operação em ordem.",
    icone: Settings2,
    recursos: [
      {
        titulo: "Convite em um link",
        texto: "Mande o seu código de convite. Ao abrir o link, o aluno já fica vinculado a você. Ou cadastre o aluno manualmente.",
        tela: "alunos",
        area: [19.5, 12, 78.5, 12.5],
      },
      {
        titulo: "Vagas sob controle",
        texto: "Veja quantas vagas estão em uso e quantas sobram para os próximos alunos, direto no dashboard.",
        tela: "dashboard",
        area: [77, 11.5, 21, 15.5],
      },
    ],
  },
];

export default function RecursosPainel() {
  const [ctx, setCtx] = useState(0);
  const [rec, setRec] = useState(0);
  const contexto = CONTEXTOS[ctx];
  const recurso = contexto.recursos[rec];
  const telas = Array.from(new Set(CONTEXTOS.flatMap((c) => c.recursos.map((r) => r.tela))));

  // O destaque tem vida própria: ao trocar de tela ele some, as telas fazem o crossfade e só
  // então ele reaparece na área nova. Na mesma tela, ele apenas desliza até a outra área.
  const [destaque, setDestaque] = useState<{ area: Recurso["area"]; visivel: boolean }>({ area: recurso.area, visivel: true });
  const timers = useRef<{ intencao?: number; destaque?: number }>({});
  useEffect(() => {
    const t = timers.current;
    return () => {
      window.clearTimeout(t.intencao);
      window.clearTimeout(t.destaque);
    };
  }, []);

  const selecionar = (c: number, i: number) => {
    const proximo = CONTEXTOS[c].recursos[i];
    if (c === ctx && i === rec) return;
    window.clearTimeout(timers.current.destaque);
    if (proximo.tela === recurso.tela) {
      setDestaque({ area: proximo.area, visivel: true });
    } else {
      setDestaque((d) => ({ ...d, visivel: false }));
      timers.current.destaque = window.setTimeout(() => setDestaque({ area: proximo.area, visivel: true }), 380);
    }
    setCtx(c);
    setRec(i);
  };
  // passar o mouse só troca depois de uma pequena pausa (evita trocas em cascata ao cruzar a lista)
  const comIntencao = (c: number, i: number) => {
    window.clearTimeout(timers.current.intencao);
    timers.current.intencao = window.setTimeout(() => selecionar(c, i), 140);
  };
  const cancelarIntencao = () => window.clearTimeout(timers.current.intencao);
  const [x, y, w, h] = destaque.area;

  return (
    <section id="recursos" aria-labelledby="recursos-titulo" className="relative py-20 sm:py-28">
      <span id="painel" className="absolute -top-20" aria-hidden />
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">O painel por dentro</p>
            <h2 id="recursos-titulo" className="mt-4 text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
              Organizado pelo seu dia de trabalho.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-lg text-lg leading-relaxed text-ink-muted lg:ml-auto">
              Do treino montado de manhã à conversa com o aluno à noite. Escolha um momento e veja a tela real do painel.
            </p>
          </Reveal>
        </div>

        <div role="tablist" aria-label="Momentos de uso" className="no-scrollbar -mx-6 mt-10 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          {CONTEXTOS.map((c, i) => {
            const Icone = c.icone;
            const ativo = ctx === i;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={ativo}
                aria-controls="painel-recursos"
                onClick={() => selecionar(i, 0)}
                className={`flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-3 text-left transition-all duration-300 sm:px-5 ${
                  ativo ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                <Icone className="h-[18px] w-[18px]" strokeWidth={2} />
                <span className="font-bold">{c.rotulo}</span>
              </button>
            );
          })}
        </div>

        <div id="painel-recursos" role="tabpanel" aria-labelledby={`tab-${contexto.id}`} className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-10">
          <div>
            <p className="text-xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-archivo)", fontStretch: "125%" }}>
              {contexto.frase}
            </p>
            <ul className="mt-5 flex flex-col gap-2">
              {contexto.recursos.map((r, i) => {
                const ativo = rec === i;
                return (
                  <li key={r.titulo}>
                    <button
                      type="button"
                      aria-pressed={ativo}
                      onClick={() => selecionar(ctx, i)}
                      onMouseEnter={() => comIntencao(ctx, i)}
                      onMouseLeave={cancelarIntencao}
                      onFocus={() => selecionar(ctx, i)}
                      className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-[background-color,border-color,box-shadow] duration-500 ease-out sm:p-5 ${
                        ativo ? "border-line bg-surface" : "border-transparent hover:bg-surface/60"
                      }`}
                      style={ativo ? { boxShadow: "var(--shadow-card)" } : undefined}
                    >
                      <span className={`absolute inset-y-4 left-0 w-[3px] rounded-r-full bg-accent transition-transform duration-500 ease-out-expo ${ativo ? "scale-y-100" : "scale-y-0"}`} />
                      <span className={`block font-bold transition-colors duration-500 ${ativo ? "text-ink" : "text-ink-muted"}`}>{r.titulo}</span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity,margin] duration-[600ms] ease-out-expo ${ativo ? "mt-2 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}
                      >
                        <span className="min-h-0 overflow-hidden text-[0.95rem] leading-relaxed text-ink-muted">{r.texto}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0">
            <BrowserFrame tela={recurso.tela}>
              {/* tudo o que anima fica recortado dentro da área da tela, abaixo da barra do navegador */}
              <div className="relative overflow-hidden">
                {telas.map((t, i) => {
                  const ativa = t === recurso.tela;
                  return (
                    <div
                      key={t}
                      aria-hidden={!ativa}
                      className={`transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${i === 0 ? "relative" : "absolute inset-0"} ${
                        ativa ? "z-[1] scale-100 opacity-100" : "scale-[1.012] opacity-0"
                      }`}
                    >
                      <PainelImagem tela={t} sizes="(min-width: 1024px) 900px, 100vw" />
                    </div>
                  );
                })}
                {/* área em destaque */}
                <div className={`pointer-events-none absolute inset-0 z-[2] transition-opacity ease-out ${destaque.visivel ? "opacity-100 duration-500" : "opacity-0 duration-200"}`} aria-hidden>
                  <div
                    className="absolute rounded-[10px] transition-[left,top,width,height] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: `${w}%`,
                      height: `${Math.min(h, 100 - y - 0.8)}%`,
                      boxShadow: "0 0 0 2px var(--c-accent), 0 0 0 200vmax color-mix(in srgb, var(--c-bg) 38%, transparent), 0 0 32px 4px rgba(253,130,15,0.3)",
                    }}
                  />
                </div>
              </div>
            </BrowserFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
