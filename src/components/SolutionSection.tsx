import { LayoutDashboard, Sparkles, TrendingUp, Trophy } from "lucide-react";
import Container from "./Container";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Treinos gerados por IA",
    description:
      "A IA do ARKO monta o treino ideal com base no perfil, objetivo e histórico de cada aluno. Menos tempo montando planilha, mais tempo atendendo quem paga.",
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
    <section id="solucao" className="border-t border-line bg-bg py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Como o ARKO resolve
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Uma plataforma para profissionalizar seu atendimento
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-line bg-surface p-8 transition-colors hover:border-accent/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent-panel">
                <Icon className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
