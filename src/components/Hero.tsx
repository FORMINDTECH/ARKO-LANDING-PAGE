"use client";

import Container from "./Container";
import PhoneMockup from "./PhoneMockup";
import MonitorMockup from "./MonitorMockup";
import Reveal from "./Reveal";
import Logo from "./Logo";
import Expandable from "./Expandable";
import { AiReportScreen, WebPanelScreen } from "./MockupScreens";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-bg py-16 sm:py-24">
      <Container className="relative z-10 pointer-events-none">
        <Reveal direction="left" className="pointer-events-auto max-w-2xl">
          <Logo className="h-14 w-auto sm:h-16" />

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Leve tecnologia{" "}
            <span className="text-accent">de ponta</span> para seus
            alunos
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            ARKO é o app que centraliza treinos, dietas e evolução dos seus
            alunos e usa IA para transformar tudo isso em relatórios claros
            para você e para o aluno. Sem planilha, sem WhatsApp perdido.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="https://arko.formind.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
            >
              Comece agora mesmo
            </a>
            <a
              href="#solucao"
              className="btn-secondary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
            >
              Ver como funciona
            </a>
          </div>

          <p className="mt-8 text-sm text-ink-muted">
            Já usado por profissionais para gerenciar treinos, dietas e
            evolução de centenas de alunos.
          </p>
        </Reveal>
      </Container>

      <div className="pointer-events-none absolute inset-y-0 left-[56%] z-0 hidden items-center lg:flex">
        <Reveal
          delay={120}
          direction="right"
          className="pointer-events-auto relative flex items-center"
        >
          <div className="pointer-events-none absolute -inset-x-10 -inset-y-10 -z-10 rounded-full bg-accent/20 blur-3xl" />
          <Expandable triggerClassName="z-10 mt-16 sm:mt-20">
            {(expanded) => (
              <PhoneMockup size={expanded ? "lg" : "default"}>
                <AiReportScreen />
              </PhoneMockup>
            )}
          </Expandable>
          <Expandable triggerClassName="hidden -ml-16 -mt-20 sm:-ml-24 sm:-mt-28 xl:block">
            {(expanded) => (
              <MonitorMockup
                className={expanded ? "w-[900px]" : "w-[820px] 2xl:w-[980px]"}
                aspectRatio="4 / 3"
              >
                <WebPanelScreen view="treinos" />
              </MonitorMockup>
            )}
          </Expandable>
        </Reveal>
      </div>
    </section>
  );
}
