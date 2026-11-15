"use client";

import Link from "next/link";
import { ViewTransition, useState } from "react";
import { ArrowRight } from "lucide-react";
import Phone from "../devices/Phone";
import BrowserFrame from "../devices/BrowserFrame";
import Recorte from "../devices/Recorte";
import { ROTAS } from "@/lib/links";

type Lado = "pro" | "app" | null;

// Movimento único e calmo para tudo o que reage ao foco
const CALMO = "duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Os dois caminhos da porta de entrada. Em vez de linhas ligando os elementos, uma luz
 * ambiente fica entre os dois cartões e se desloca para o que está em foco.
 */
export default function EscolhaPerfil() {
  const [foco, setFoco] = useState<Lado>(null);
  const eventos = (lado: Exclude<Lado, null>) => ({
    onMouseEnter: () => setFoco(lado),
    onMouseLeave: () => setFoco(null),
    onFocus: () => setFoco(lado),
    onBlur: () => setFoco(null),
  });

  return (
    <div className="relative mt-8 md:mt-10">
      {/* luz ambiente compartilhada */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-10 -inset-y-16 hidden md:block">
        <div
          className={`absolute left-1/2 top-1/2 h-[130%] w-[62%] rounded-full transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            foco ? "opacity-100" : "opacity-60"
          }`}
          style={{
            background: "radial-gradient(closest-side, var(--c-glow), transparent)",
            transform: `translate(${foco === "pro" ? "-88%" : foco === "app" ? "-12%" : "-50%"}, -50%)`,
          }}
        />
      </div>

      <div className="relative grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
        {/* Profissional */}
        <Link
          href={ROTAS.profissionais}
          {...eventos("pro")}
          className={`group relative flex min-h-[500px] flex-col overflow-hidden rounded-[28px] border border-line bg-surface p-6 transition-[transform,box-shadow] ${CALMO} hover:-translate-y-[3px] focus-visible:-translate-y-[3px] sm:p-8 md:min-h-[400px]`}
          style={{ boxShadow: foco === "pro" ? "var(--shadow-float)" : "var(--shadow-card)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, var(--c-line-strong) 1px, transparent 0)",
              backgroundSize: "22px 22px",
              maskImage: "linear-gradient(180deg, transparent 30%, #000 100%)",
            }}
            aria-hidden
          />
          <div className="relative md:max-w-[56%]">
            <span className="eyebrow">01 · Para profissionais</span>
            <h3 className="mt-4 text-[1.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-[2.1rem]">Sou profissional</h3>
            <p className="mt-3 max-w-[19rem] text-[1.02rem] leading-relaxed text-ink-muted">
              Sou nutricionista, personal trainer ou faço parte de uma consultoria.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip">Painel web</span>
              <span className="chip">App para seus alunos</span>
            </div>
          </div>

          <div className="relative mt-6">
            <span className="relative z-10 inline-flex items-center gap-3 text-[0.98rem] font-bold">
              Conhecer o painel
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong transition-[background-color,border-color,color] duration-500 ease-out group-hover:border-accent group-hover:bg-accent group-hover:text-carbono group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-carbono">
                <ArrowRight className={`h-4 w-4 transition-transform ${CALMO} group-hover:translate-x-0.5`} strokeWidth={2.25} />
              </span>
            </span>
          </div>

          <div
            className={`pointer-events-none absolute left-6 top-[300px] w-[520px] rotate-[-3deg] transition-transform ${CALMO} group-hover:-translate-y-2 group-focus-visible:-translate-y-2 sm:left-8 md:left-[59%] md:top-[64px] md:w-[600px] md:rotate-[-2deg]`}
          >
            <ViewTransition name="painel-hero" share="morph" default="none">
              <BrowserFrame tela="dashboard" priority sizes="(min-width: 768px) 700px, 600px" />
            </ViewTransition>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" aria-hidden />
        </Link>

        {/* Por conta própria */}
        <Link
          href={ROTAS.app}
          {...eventos("app")}
          className={`group relative flex min-h-[500px] flex-col overflow-hidden rounded-[28px] border border-white/5 bg-carbono p-6 text-giz transition-[transform,box-shadow] ${CALMO} hover:-translate-y-[3px] focus-visible:-translate-y-[3px] sm:p-8 md:min-h-[400px]`}
          style={{ boxShadow: foco === "app" ? "var(--shadow-float)" : "var(--shadow-card)" }}
        >
          <div
            className={`glow -right-20 -top-24 h-[420px] w-[420px] transition-opacity duration-[1400ms] ease-out ${foco === "app" ? "opacity-100" : "opacity-70"}`}
            style={{ background: "radial-gradient(closest-side, rgba(253,130,15,0.35), transparent)" }}
            aria-hidden
          />
          <div className="relative md:max-w-[56%]">
            <span className="eyebrow !text-giz/60">02 · Para você</span>
            <h3 className="mt-4 text-[1.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-[2.1rem]">
              Treino por
              <br /> conta própria
            </h3>
            <p className="mt-3 max-w-[19rem] text-[1.02rem] leading-relaxed text-giz/70">Quero organizar meus treinos e minha alimentação.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip !border-white/10 !bg-white/5 !text-giz/80">App para iOS e Android</span>
              <span className="chip !border-accent/30 !bg-accent/10 !text-accent">7 dias grátis</span>
            </div>
          </div>

          <div className="relative mt-6">
            <span className="relative z-10 inline-flex items-center gap-3 text-[0.98rem] font-bold">
              Conhecer o app
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-[background-color,border-color,color] duration-500 ease-out group-hover:border-accent group-hover:bg-accent group-hover:text-carbono group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-carbono">
                <ArrowRight className={`h-4 w-4 transition-transform ${CALMO} group-hover:translate-x-0.5`} strokeWidth={2.25} />
              </span>
            </span>
          </div>

          <div
            className={`pointer-events-none absolute right-6 top-[318px] w-[200px] rotate-[6deg] transition-transform ${CALMO} group-hover:-translate-y-2 group-focus-visible:-translate-y-2 sm:right-10 md:right-[6%] md:top-[44px] md:w-[min(220px,36%)]`}
          >
            <ViewTransition name="app-phone" share="morph" default="none">
              <Phone tela="inicio" priority sizes="300px" />
            </ViewTransition>
          </div>
          <div
            className={`pointer-events-none absolute hidden w-[200px] -rotate-3 transition-transform delay-75 ${CALMO} group-hover:-translate-y-1 md:right-[30%] md:top-[290px] md:block`}
          >
            <Recorte nome="sequencia" sizes="300px" />
          </div>
        </Link>
      </div>
    </div>
  );
}
