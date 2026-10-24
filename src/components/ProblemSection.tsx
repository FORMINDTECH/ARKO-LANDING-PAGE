"use client";

import { useState } from "react";
import {
  AlertTriangle,
  FileSpreadsheet,
  MessageCircleWarning,
  TrendingDown,
  UserX,
} from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";

const PAINS = [
  {
    icon: FileSpreadsheet,
    title: "Planilhas espalhadas",
    impact: "Horas perdidas por semana",
    description:
      "Treinos e dietas em arquivos separados, sem histórico centralizado e fáceis de perder.",
  },
  {
    icon: MessageCircleWarning,
    title: "WhatsApp perdido",
    impact: "Ajuste que nunca chega",
    description:
      "Ajustes de treino e dúvidas de alunos somem em conversas que ninguém consegue rastrear depois.",
  },
  {
    icon: TrendingDown,
    title: "Evolução sem visibilidade",
    impact: "Resultado difícil de provar",
    description:
      "Sem dados de progresso em tempo real, fica difícil provar resultado e ajustar o plano a tempo.",
  },
  {
    icon: UserX,
    title: "Churn de alunos",
    impact: "Receita que vaza todo mês",
    description:
      "Sem acompanhamento próximo e engajamento, o aluno perde motivação e cancela.",
  },
];

export default function ProblemSection() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <section className="relative flex min-h-screen items-center bg-bg py-16 sm:py-20">
      <div className="w-full">
        <div className="hazard-stripe h-5 w-full sm:h-6" />
        <Container className="my-14 sm:my-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Gerenciar alunos não devia ser assim
            </h2>
          </Reveal>
          <Reveal delay={100} className="flex items-end justify-start lg:justify-end">
            <p className="max-w-lg text-ink/80">
              A maior parte do tempo do profissional é perdida em tarefas
              administrativas que não geram resultado, nem para o aluno, nem
              para o negócio. Toque ou passe o mouse em cada card e veja o
              custo real.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {PAINS.map(({ icon: Icon, title, impact, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div
                role="button"
                tabIndex={0}
                aria-label={`${title}. Toque ou passe o mouse para ver o impacto.`}
                onClick={() =>
                  setFlippedIndex((prev) => (prev === i ? null : i))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFlippedIndex((prev) => (prev === i ? null : i));
                  }
                }}
                className={`flip-trigger flip-perspective h-48 w-full cursor-pointer sm:h-64 ${
                  flippedIndex === i ? "is-flipped" : ""
                }`}
              >
                <div className="flip-inner">
                  <div className="flip-face card-inset flex h-full flex-col justify-between p-3 sm:p-5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger/10 sm:h-11 sm:w-11 sm:rounded-xl">
                      <Icon className="h-4 w-4 text-danger sm:h-5 sm:w-5" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink sm:text-base">{title}</h3>
                      <p className="mt-1 text-xs text-ink-muted sm:mt-2 sm:text-sm">
                        Toque para ver o impacto
                      </p>
                    </div>
                  </div>

                  <div className="flip-face flip-face-back flex h-full flex-col justify-between rounded-2xl border border-danger/30 bg-surface p-3 sm:p-5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger/10 sm:h-11 sm:w-11 sm:rounded-xl">
                      <AlertTriangle className="h-4 w-4 text-danger sm:h-5 sm:w-5" strokeWidth={2} />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-danger sm:text-xs">
                        Sem o ARKO
                      </span>
                      <h3 className="mt-1 text-sm font-bold leading-snug text-ink sm:text-lg">
                        {impact}
                      </h3>
                      <p className="mt-1 text-xs leading-snug text-ink-muted sm:mt-2 sm:text-sm sm:leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        </Container>
        <div className="hazard-stripe h-5 w-full sm:h-6" />
      </div>
    </section>
  );
}
