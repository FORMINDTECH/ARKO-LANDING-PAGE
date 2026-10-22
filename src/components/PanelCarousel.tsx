"use client";

import { useLayoutEffect, useRef, useState } from "react";
import BrowserMockup from "./BrowserMockup";
import Expandable from "./Expandable";
import { WebPanelScreen, type PanelView } from "./MockupScreens";

// order matches WebSystemSection's STEPS list, so hovering an item there
// shows the matching screen here
const SLIDES: { view: PanelView; label: string }[] = [
  { view: "treinos", label: "Montagem de treino" },
  { view: "avaliacoes", label: "Avaliação física" },
  { view: "alunos", label: "Desempenho dos alunos" },
  { view: "dietas", label: "Montagem de dieta" },
];

export default function PanelCarousel({
  index,
  onChange,
}: {
  index: number;
  onChange: (i: number) => void;
}) {
  const [prevIndex, setPrevIndex] = useState(index);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (index === prevIndex) return;
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.opacity = "0";
    void el.offsetHeight; // force reflow so the snap above is registered

    el.style.transition = "opacity 900ms ease-in-out";
    el.style.opacity = "1";

    setPrevIndex(index);
  }, [index, prevIndex]);

  const slide = SLIDES[index];
  const goTo = (i: number) => onChange((i + SLIDES.length) % SLIDES.length);

  return (
    <div className="flex w-full min-w-0 flex-col items-center gap-3">
      <div className="w-full min-w-0 overflow-hidden rounded-2xl">
        <div ref={trackRef}>
          <Expandable triggerClassName="block w-full">
            {(expanded) => (
              <div className={expanded ? "w-[90vw] max-w-3xl" : "w-full"}>
                <BrowserMockup>
                  <WebPanelScreen view={slide.view} />
                </BrowserMockup>
              </div>
            )}
          </Expandable>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.view}
            type="button"
            onClick={() => goTo(i)}
            aria-label={s.label}
            className={`h-1.5 cursor-pointer rounded-full transition-all ${
              i === index ? "w-6 bg-accent" : "w-1.5 bg-line"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-ink-muted">{slide.label}</p>
    </div>
  );
}
