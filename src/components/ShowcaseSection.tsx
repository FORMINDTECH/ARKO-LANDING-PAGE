import { Quote } from "lucide-react";
import Container from "./Container";
import PhoneMockup from "./PhoneMockup";
import {
  DashboardScreen,
  GamificationScreen,
  ProgressScreen,
} from "./MockupScreens";

export default function ShowcaseSection() {
  return (
    <section id="produto" className="border-t border-line bg-bg py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Veja o ARKO em ação
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Uma experiência premium para o seu aluno
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            O ARKO tem identidade visual própria, pensada para elevar a
            percepção do seu atendimento, sem a complexidade de construir e
            manter um app.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-start justify-center gap-8 overflow-x-auto py-4">
          <PhoneMockup className="rotate-[-3deg]">
            <DashboardScreen />
          </PhoneMockup>
          <PhoneMockup className="z-10 scale-105 shadow-black/80">
            <ProgressScreen />
          </PhoneMockup>
          <PhoneMockup className="rotate-[3deg]">
            <GamificationScreen />
          </PhoneMockup>
        </div>

        <div className="mt-24 border-t border-line pt-14">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Depoimentos em breve
          </h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-dashed border-line bg-surface/50 p-6"
              >
                <Quote className="h-5 w-5 text-ink-muted/50" strokeWidth={2} />
                <div className="mt-4 space-y-2">
                  <div className="h-2.5 w-full rounded-full bg-surface-2" />
                  <div className="h-2.5 w-4/5 rounded-full bg-surface-2" />
                  <div className="h-2.5 w-3/5 rounded-full bg-surface-2" />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-surface-2" />
                  <div className="space-y-1.5">
                    <div className="h-2 w-20 rounded-full bg-surface-2" />
                    <div className="h-2 w-14 rounded-full bg-surface-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
