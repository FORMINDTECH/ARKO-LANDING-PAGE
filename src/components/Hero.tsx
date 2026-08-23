import { ArrowRight } from "lucide-react";
import Container from "./Container";
import PhoneMockup from "./PhoneMockup";
import { AiWorkoutScreen } from "./MockupScreens";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-radial-accent pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
            Para personal trainers, nutricionistas e academias
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Leve tecnologia{" "}
            <span className="text-gradient-accent">de ponta</span> para seus
            alunos
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            ARKO é o app com IA que centraliza treinos, dietas e evolução dos
            seus alunos, sem planilha, sem WhatsApp perdido. Menos tempo
            administrando, mais tempo atendendo.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#planos"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Agende uma demonstração
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <a
              href="#solucao"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface"
            >
              Ver como funciona
            </a>
          </div>

          <p className="mt-8 text-sm text-ink-muted">
            Já usado por profissionais para gerenciar treinos, dietas e
            evolução de centenas de alunos.
          </p>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="pointer-events-none absolute -inset-x-10 -inset-y-10 -z-10 rounded-full bg-accent/20 blur-3xl" />
          <PhoneMockup>
            <AiWorkoutScreen />
          </PhoneMockup>
        </div>
      </Container>
    </section>
  );
}
