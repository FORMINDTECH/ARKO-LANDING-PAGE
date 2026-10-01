import { ClipboardList, Ruler, Send, Users } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";
import PanelCarousel from "./PanelCarousel";

const FEATURES = [
  {
    icon: ClipboardList,
    title: "Monte treino e dieta",
    description:
      "Construa treinos e planos alimentares sob medida para cada aluno, com o histórico completo à mão.",
  },
  {
    icon: Ruler,
    title: "Avaliação física completa",
    description:
      "Registre medidas, dobras cutâneas e composição corporal para acompanhar a evolução real do aluno.",
  },
  {
    icon: Users,
    title: "Desempenho de cada aluno",
    description:
      "Veja adesão, progresso e pontos de atenção de toda a sua base em um só painel, sem planilha.",
  },
  {
    icon: Send,
    title: "Direto para o app do aluno",
    description:
      "Tudo o que você monta no painel chega automaticamente no app do aluno vinculado a você.",
  },
];

export default function WebSystemSection() {
  return (
    <section
      id="painel"
      data-snap
      className="flex min-h-screen items-center border-t border-line bg-bg py-20 sm:py-28"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Painel web para profissionais
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            A central de trabalho do seu dia a dia
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            É pelo computador que você monta treino, dieta e avaliação física
            de cada aluno e acompanha o desempenho de toda a sua base. Tudo
            publicado no painel chega na hora no app do aluno vinculado a
            você.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-accent-panel">
                  <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-14">
          <PanelCarousel />
        </Reveal>
      </Container>
    </section>
  );
}
