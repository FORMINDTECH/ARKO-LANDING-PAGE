import { FileSpreadsheet, MessageCircleWarning, TrendingDown, UserX } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";

const PAINS = [
  {
    icon: FileSpreadsheet,
    title: "Planilhas espalhadas",
    description:
      "Treinos e dietas em arquivos separados, sem histórico centralizado e fáceis de perder.",
  },
  {
    icon: MessageCircleWarning,
    title: "WhatsApp perdido",
    description:
      "Ajustes de treino e dúvidas de alunos somem em conversas que ninguém consegue rastrear depois.",
  },
  {
    icon: TrendingDown,
    title: "Evolução sem visibilidade",
    description:
      "Sem dados de progresso em tempo real, fica difícil provar resultado e ajustar o plano a tempo.",
  },
  {
    icon: UserX,
    title: "Churn de alunos",
    description:
      "Sem acompanhamento próximo e engajamento, o aluno perde motivação e cancela.",
  },
];

export default function ProblemSection() {
  return (
    <section
      className="flex min-h-screen items-center bg-bg py-20 sm:py-28"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Gerenciar alunos não devia ser assim
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            A maior parte do tempo do profissional é perdida em tarefas
            administrativas que não geram resultado, nem para o aluno, nem
            para o negócio.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2">
                  <Icon className="h-5 w-5 text-danger" strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
