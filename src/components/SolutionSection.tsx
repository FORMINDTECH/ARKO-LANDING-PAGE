import {
  CheckCircle2,
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";

const FEATURED = {
  icon: Sparkles,
  title: "Relatórios gerados por IA",
  description:
    "A IA do ARKO transforma treino, dieta e evolução em relatórios prontos para o aluno e para o profissional. Menos tempo interpretando dado solto, mais tempo atendendo quem paga.",
  highlights: [
    "Resumo automático da semana de cada aluno",
    "Insights de adesão e evolução, sem planilha",
    "Pronto para enviar direto para o aluno",
  ],
};

const FEATURES = [
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
      className="relative flex min-h-screen items-center overflow-hidden bg-bg py-12 sm:py-16"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Uma plataforma para profissionalizar seu atendimento
            </h2>
          </Reveal>
          <Reveal delay={100} className="flex items-end justify-start lg:justify-end">
            <p className="max-w-lg text-ink-muted">
              Padronize o acompanhamento dos seus alunos com relatórios
              automáticos, evolução em tempo real e gamificação que mantém
              todo mundo engajado.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-[24px] bg-surface-2 p-2">
          <Reveal>
            <SpotlightCard className="grid gap-4 rounded-2xl bg-surface p-5 sm:gap-6 sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-8">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-panel sm:h-12 sm:w-12">
                  <FEATURED.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-ink sm:mt-5 sm:text-xl lg:text-2xl">
                  {FEATURED.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted sm:mt-3 sm:text-base">
                  {FEATURED.description}
                </p>
              </div>
              <ul className="flex flex-col gap-2 sm:gap-3">
                {FEATURED.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-line bg-surface-2 px-4 py-2.5 sm:py-3"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      strokeWidth={2.25}
                    />
                    <span className="text-sm text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }, i) => (
              <Reveal
                key={title}
                delay={(i + 1) * 80}
                className={i === FEATURES.length - 1 ? "col-span-2 sm:col-span-1" : ""}
              >
                <SpotlightCard className="card-inset h-full p-4 sm:p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-panel sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-3 text-sm font-bold tracking-tight text-ink sm:mt-4 sm:text-lg">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted sm:mt-2 sm:text-sm">
                    {description}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
