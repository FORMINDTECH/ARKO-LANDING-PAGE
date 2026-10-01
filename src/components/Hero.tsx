import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "./Container";
import PhoneMockup from "./PhoneMockup";
import MonitorMockup from "./MonitorMockup";
import Reveal from "./Reveal";
import { AiReportScreen, WebPanelScreen } from "./MockupScreens";

export default function Hero() {
  return (
    <section
      data-snap
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-radial-accent py-16 sm:py-24"
    >
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <Image
            src="/brand/arko-logo.png"
            alt="ARKO"
            width={612}
            height={230}
            priority
            className="h-14 w-auto sm:h-16"
          />

          <span className="mt-6 inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
            Para personal trainers, nutricionistas e academias
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Leve tecnologia{" "}
            <span className="text-gradient-accent">de ponta</span> para seus
            alunos
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            ARKO é o app que centraliza treinos, dietas e evolução dos seus
            alunos e usa IA para transformar tudo isso em relatórios claros
            para você e para o aluno. Sem planilha, sem WhatsApp perdido.
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
        </Reveal>

        <Reveal
          delay={120}
          className="relative flex items-end justify-center gap-5 pb-8 lg:justify-end"
        >
          <div className="pointer-events-none absolute -inset-x-10 -inset-y-10 -z-10 rounded-full bg-accent/20 blur-3xl" />
          <MonitorMockup className="hidden w-[300px] xl:block">
            <WebPanelScreen view="treinos" compact />
          </MonitorMockup>
          <PhoneMockup>
            <AiReportScreen />
          </PhoneMockup>
        </Reveal>
      </Container>
    </section>
  );
}
