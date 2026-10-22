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
              para o negócio. Passe o mouse em cada card e veja o custo real.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map(({ icon: Icon, title, impact, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div
                tabIndex={0}
                aria-label={`${title}. Passe o mouse para ver o impacto.`}
                className="flip-trigger flip-perspective h-64 w-full"
              >
                <div className="flip-inner">
                  <div className="flip-face card-inset flex h-full flex-col justify-between p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-danger/10">
                      <Icon className="h-5 w-5 text-danger" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink">{title}</h3>
                      <p className="mt-2 text-sm text-ink-muted">
                        Passe o mouse para ver o impacto
                      </p>
                    </div>
                  </div>

                  <div className="flip-face flip-face-back flex h-full flex-col justify-between rounded-2xl border border-danger/30 bg-surface p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-danger/10">
                      <AlertTriangle className="h-5 w-5 text-danger" strokeWidth={2} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-danger">
                        Sem o ARKO
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-ink">
                        {impact}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
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
