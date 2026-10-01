import Container from "./Container";
import PhoneMockup from "./PhoneMockup";
import Reveal from "./Reveal";
import {
  FeedScreen,
  GamificationScreen,
  ProgressScreen,
} from "./MockupScreens";

export default function ShowcaseSection() {
  return (
    <section
      id="produto"
      data-snap
      className="flex min-h-screen items-center border-t border-line bg-bg py-6 sm:py-8"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Veja o ARKO em ação
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Uma experiência premium para o seu aluno
          </h2>
          <p className="mt-2 text-base text-ink-muted sm:text-lg">
            O ARKO tem identidade visual própria, pensada para elevar a
            percepção do seu atendimento, sem a complexidade de construir e
            manter um app.
          </p>
        </Reveal>

        <div className="mt-4 flex flex-wrap items-start justify-center gap-6">
          <Reveal delay={0}>
            <PhoneMockup className="rotate-[-3deg]">
              <FeedScreen />
            </PhoneMockup>
          </Reveal>
          <Reveal delay={100}>
            <PhoneMockup className="z-10 scale-105 shadow-black/80">
              <ProgressScreen />
            </PhoneMockup>
          </Reveal>
          <Reveal delay={200}>
            <PhoneMockup className="rotate-[3deg]">
              <GamificationScreen />
            </PhoneMockup>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 border-t border-line pt-4 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center">
              <p className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const STATS = [
  { value: "94%", label: "Retenção mensal de alunos ativos" },
  { value: "IA", label: "Relatórios de evolução gerados sob medida" },
  { value: "1 app", label: "Treino, dieta, evolução e feed em um só lugar" },
];
