import { ViewTransition } from "react";
import Container from "../Container";
import Phone from "../devices/Phone";
import Recorte from "../devices/Recorte";
import BotoesLoja from "./BotoesLoja";
import { DIAS_TESTE_GRATIS, PLANOS_INDEPENDENTE, brl } from "@/lib/precos";

/** Arco de progresso atrás do celular (mesmo desenho dos anéis de meta do app). */
function ArcoProgresso({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <circle cx="100" cy="100" r="92" fill="none" stroke="var(--c-line)" strokeWidth="1.2" />
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="none"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        pathLength={1}
        transform="rotate(-90 100 100)"
        style={{ strokeDasharray: "0.72 1", animation: "draw-arc 2.2s 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
      />
      <style>{`@keyframes draw-arc { from { stroke-dasharray: 0 1; } to { stroke-dasharray: 0.72 1; } }`}</style>
    </svg>
  );
}

export default function AppHero() {
  const anual = PLANOS_INDEPENDENTE.find((p) => p.id === "anual")!;
  return (
    <section aria-labelledby="app-titulo" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      <div className="page-atmosphere" aria-hidden>
        <div className="glow right-[-10%] top-[-10%] h-[760px] w-[760px]" />
      </div>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="max-w-xl">
            <p className="eyebrow">App Arko · iOS e Android</p>
            <h1 id="app-titulo" className="mt-5 text-[2.7rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-[4.3rem]">
              Seu treino, sua dieta, sua <span className="mark-arc">sequência</span>.
            </h1>
            <p className="mt-6 max-w-lg text-[1.08rem] leading-relaxed text-ink-muted sm:text-lg">
              Monte seus treinos, registre o que você come e veja a carga subir semana após semana, com relatórios de evolução gerados por IA. Tudo num app só, sem precisar de um profissional.
            </p>
            <BotoesLoja className="mt-8" />
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {DIAS_TESTE_GRATIS} dias grátis, sem cobrança
              </span>
              <span className="text-line-strong">·</span>
              <span>depois, a partir de R$ {brl(anual.preco / anual.meses)}/mês</span>
            </p>
          </div>

          <div className="relative mx-auto h-[540px] w-full max-w-[460px] sm:h-[600px] lg:h-[660px] lg:max-w-none">
            <ArcoProgresso className="absolute left-1/2 top-1/2 w-[520px] max-w-[130%] -translate-x-1/2 -translate-y-1/2 sm:w-[600px]" />
            <div className="absolute left-1/2 top-1/2 w-[236px] -translate-x-1/2 -translate-y-1/2 sm:w-[270px] lg:w-[292px]">
              <ViewTransition name="app-phone" share="morph" default="none">
                <Phone tela="inicio" priority sizes="400px" />
              </ViewTransition>
            </div>
            <div className="absolute -left-2 top-[3%] w-[168px] -rotate-[5deg] sm:left-[-8%] sm:w-[250px] lg:left-[-12%] lg:top-[7%] lg:w-[270px]">
              <div className="animate-float">
                <Recorte nome="carga" sizes="400px" />
              </div>
            </div>
            <div className="absolute -right-2 bottom-[9%] w-[170px] rotate-[4deg] sm:right-[-4%] sm:w-[230px] lg:right-[-4%] lg:w-[250px]">
              <div className="animate-float-slow">
                <Recorte nome="calorias" sizes="400px" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
