"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./Container";
import PhoneMockup from "./PhoneMockup";
import Reveal from "./Reveal";
import Expandable from "./Expandable";
import SlideSwap from "./SlideSwap";
import {
  FeedScreen,
  GamificationScreen,
  ProgressScreen,
} from "./MockupScreens";

const PHONES = [
  { key: "feed", label: "Feed dos alunos", Screen: FeedScreen },
  { key: "progress", label: "Evolução do aluno", Screen: ProgressScreen },
  { key: "gamification", label: "Gamificação", Screen: GamificationScreen },
];

export default function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const ActiveScreen = PHONES[activeIndex].Screen;

  const goTo = (i: number, dir: number) => {
    setDirection(dir);
    setActiveIndex(i);
  };

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
          <div className="sm:hidden">
            <div className="flex items-center justify-center gap-2 px-4">
              <button
                type="button"
                aria-label="Tela anterior"
                onClick={() =>
                  goTo((activeIndex - 1 + PHONES.length) % PHONES.length, -1)
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:text-ink"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
              </button>

              <SlideSwap
                itemKey={activeIndex}
                direction={direction}
                className="flex flex-1 items-center justify-center"
              >
                <Expandable key={PHONES[activeIndex].key}>
                  {(expanded) => (
                    <PhoneMockup size={expanded ? "lg" : "default"}>
                      <ActiveScreen />
                    </PhoneMockup>
                  )}
                </Expandable>
              </SlideSwap>

              <button
                type="button"
                aria-label="Próxima tela"
                onClick={() => goTo((activeIndex + 1) % PHONES.length, 1)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:text-ink"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5">
              {PHONES.map((phone, i) => (
                <button
                  key={phone.key}
                  type="button"
                  aria-label={phone.label}
                  onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-line"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-center text-sm text-ink-muted">
              {PHONES[activeIndex].label}
            </p>
          </div>

          <div className="hidden flex-wrap items-start justify-center gap-6 sm:flex">
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
  { value: "R$ 0", label: "Custo para o aluno vinculado a um profissional" },
  { value: "IA", label: "Relatórios de evolução gerados sob medida" },
  { value: "1 app", label: "Treino, dieta, evolução e feed em um só lugar" },
];
