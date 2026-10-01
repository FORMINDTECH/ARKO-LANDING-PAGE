"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BrowserMockup from "./BrowserMockup";
import { WebPanelScreen, type PanelView } from "./MockupScreens";

const SLIDES: { view: PanelView; label: string }[] = [
  { view: "alunos", label: "Desempenho dos alunos" },
  { view: "treinos", label: "Montagem de treino" },
  { view: "dietas", label: "Montagem de dieta" },
  { view: "avaliacoes", label: "Avaliação física" },
];

export default function PanelCarousel() {
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    setIndex((i + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center gap-3 sm:gap-6">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Ver parte anterior do painel"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent/60 hover:text-accent"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
        </button>

        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div key={slide.view} className="w-full shrink-0">
                <BrowserMockup>
                  <WebPanelScreen view={slide.view} />
                </BrowserMockup>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Ver próxima parte do painel"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent/60 hover:text-accent"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.view}
            type="button"
            onClick={() => goTo(i)}
            aria-label={slide.label}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-accent" : "w-1.5 bg-line"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-ink-muted">{SLIDES[index].label}</p>
    </div>
  );
}
