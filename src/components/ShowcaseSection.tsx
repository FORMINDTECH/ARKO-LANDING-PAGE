"use client";

import Container from "./Container";
import PhoneMockup from "./PhoneMockup";
import Reveal from "./Reveal";
import Expandable from "./Expandable";
import {
  FeedScreen,
  GamificationScreen,
  ProgressScreen,
} from "./MockupScreens";

export default function ShowcaseSection() {
  return (
    <section id="produto" className="relative flex min-h-screen items-center overflow-hidden bg-bg py-16 sm:py-20">
      <Container>
        <Reveal direction="left" className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Uma experiência premium para o seu aluno
          </h2>
          <p className="mt-3 text-base text-ink/80 sm:text-lg">
            O ARKO é o canal direto entre você e o seu aluno: você organiza
            treino, dieta e evolução no painel, e ele acompanha tudo em um
            app com a identidade visual do ARKO.
          </p>
        </Reveal>

        <div className="relative mt-10 rounded-[24px] bg-surface-2 py-10">
          <div className="flex flex-wrap items-start justify-center gap-6">
            <Reveal delay={0}>
              <Expandable>
                {(expanded) => (
                  <PhoneMockup
                    size={expanded ? "lg" : "default"}
                    className={expanded ? undefined : "rotate-[-3deg]"}
                  >
                    <FeedScreen />
                  </PhoneMockup>
                )}
              </Expandable>
            </Reveal>
            <Reveal delay={100}>
              <Expandable triggerClassName="z-10">
                {(expanded) => (
                  <PhoneMockup
                    size={expanded ? "lg" : "default"}
                    className={expanded ? undefined : "scale-105"}
                  >
                    <ProgressScreen />
                  </PhoneMockup>
                )}
              </Expandable>
            </Reveal>
            <Reveal delay={200}>
              <Expandable>
                {(expanded) => (
                  <PhoneMockup
                    size={expanded ? "lg" : "default"}
                    className={expanded ? undefined : "rotate-[3deg]"}
                  >
                    <GamificationScreen />
                  </PhoneMockup>
                )}
              </Expandable>
            </Reveal>
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-[24px] bg-surface-2 p-2 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="card-inset h-full p-5 text-center">
                <p className="font-data text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {stat.label}
                </p>
              </div>
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
