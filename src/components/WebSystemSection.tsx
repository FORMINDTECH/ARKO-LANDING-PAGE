"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ClipboardList, Ruler, Send, Users } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";
import PanelCarousel from "./PanelCarousel";
import SlideSwap from "./SlideSwap";

const STEPS = [
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (i: number, dir: number) => {
    setDirection(dir);
    setActiveIndex(i);
  };

  return (
    <section id="painel" className="flex min-h-screen items-center bg-bg py-16 sm:py-20">
      <Container>
        <Reveal direction="left" className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            A central de trabalho do seu dia a dia
          </h2>
          <p className="mt-3 text-base text-ink-muted sm:text-lg">
            É pelo computador que você monta treino, dieta e avaliação física
            de cada aluno e acompanha o desempenho de toda a sua base. Tudo
            publicado no painel chega na hora no app do aluno vinculado a
            você.
          </p>
        </Reveal>

        <div className="mt-8 lg:hidden">
          <Reveal
            direction="right"
            className="rounded-[24px] bg-surface-2 p-4"
          >
            <PanelCarousel index={activeIndex} onChange={setActiveIndex} />
          </Reveal>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Passo anterior"
              onClick={() =>
                goTo((activeIndex - 1 + STEPS.length) % STEPS.length, -1)
              }
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
            </button>

            <SlideSwap
              itemKey={activeIndex}
              direction={direction}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-accent bg-accent-panel px-4 py-3 text-sm font-semibold text-white"
            >
              {(() => {
                const ActiveIcon = STEPS[activeIndex].icon;
                return <ActiveIcon className="h-4 w-4 shrink-0" strokeWidth={2} />;
              })()}
              <span className="text-center">{STEPS[activeIndex].title}</span>
            </SlideSwap>

            <button
              type="button"
              aria-label="Próximo passo"
              onClick={() => goTo((activeIndex + 1) % STEPS.length, 1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            {STEPS.map((step, i) => (
              <button
                key={step.title}
                type="button"
                aria-label={step.title}
                onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-line"
                }`}
              />
            ))}
          </div>

          <p className="mt-3 text-center text-sm leading-relaxed text-ink-muted">
            {STEPS[activeIndex].description}
          </p>
        </div>

        <div
          className="mt-8 hidden items-start gap-6 lg:grid lg:grid-cols-2"
          style={{ contain: "content" }}
        >
          <Reveal
            className="flex flex-col gap-2 rounded-[24px] bg-surface-2 p-2"
            style={{ contain: "content" }}
          >
            {STEPS.map(({ icon: Icon, title, description }, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={title}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  className="relative cursor-pointer overflow-hidden rounded-2xl bg-surface p-5 pl-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{ contain: "content" }}
                >
                  <span
                    className={`absolute inset-y-3 left-2 w-1 rounded-full bg-accent transition-transform duration-300 ease-out ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ease-out ${
                        isActive ? "bg-accent-panel" : "bg-surface-2"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 transition-colors duration-300 ease-out ${
                          isActive ? "text-white" : "text-ink-muted"
                        }`}
                        strokeWidth={2}
                      />
                    </div>
                    <h3
                      className={`text-base font-bold transition-colors duration-300 ease-out ${
                        isActive ? "text-ink" : "text-ink-muted"
                      }`}
                    >
                      {title}
                    </h3>
                  </div>
                  <div
                    className={`mt-4 grid transition-[grid-template-rows] duration-300 ease-out ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                    style={{ willChange: "grid-template-rows", contain: "content" }}
                  >
                    <p
                      className={`overflow-hidden pl-0 text-sm leading-relaxed text-ink-muted transition-opacity duration-200 ease-out sm:pl-[60px] ${
                        isActive ? "opacity-100 delay-100" : "opacity-0"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={100} direction="right" className="flex min-w-0 items-center rounded-[24px] bg-surface-2 p-4">
            <PanelCarousel index={activeIndex} onChange={setActiveIndex} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
