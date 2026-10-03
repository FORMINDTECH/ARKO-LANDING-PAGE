import { LayoutDashboard, Sparkles, TrendingUp, Trophy } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Relatórios gerados por IA",
    description:
      "A IA do ARKO transforma treino, dieta e evolução em relatórios prontos para o aluno e para o profissional. Menos tempo interpretando dado solto, mais tempo atendendo quem paga.",
  },
  {
    icon: TrendingUp,
    title: "Acompanhamento em tempo real",
    description:
      "Medidas, fotos de progresso, check-ins de treino e alimentação, tudo em um painel único, atualizado pelo próprio aluno.",
  },
  {
    icon: Trophy,
    title: "Gamificação que retém",
    description:
      "Sequência de dias treinados, ranking entre alunos, feed social e conquistas. Aluno engajado é aluno que renova.",
  },
  {
    icon: LayoutDashboard,
    title: "Painel de gestão completo",
    description:
      "Todos os seus alunos, treinos e planos alimentares organizados em um só lugar, sem depender de planilha ou de outro app.",
  },
];

export default function SolutionSection() {
  return (
    <section
      id="solucao"
      className="relative flex min-h-screen items-center overflow-hidden bg-bg bg-radial-accent py-12 sm:py-16"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Como o ARKO resolve
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Uma plataforma para profissionalizar seu atendimento
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/40">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-accent-panel">
                  <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
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
