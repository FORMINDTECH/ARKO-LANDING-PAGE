"use client";

import { useState } from "react";
import { Check, Ticket } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import { DIAS_TESTE_GRATIS, PLANOS_INDEPENDENTE, brl } from "@/lib/precos";

// O que o Premium libera (ver Fluxos-de-usuarios/aluno premium e aluno free no ARKO-MOBILE)
const PREMIUM = [
  "Treinos ilimitados",
  "Relatórios de evolução gerados por IA",
  "Calendário completo e dias congelados",
  "Gráficos de evolução e progressão de carga",
  "Leitor de código de barras",
  "Mapa de grupos musculares",
  "Publicações sem limite no feed",
];

const GRATIS = ["Até 5 treinos próprios", "Registro de refeições e água", "Medidas e fotos de progresso", "Feed e amigos"];

export default function PlanosApp() {
  const [sel, setSel] = useState<(typeof PLANOS_INDEPENDENTE)[number]["id"]>("anual");
  const plano = PLANOS_INDEPENDENTE.find((p) => p.id === sel)!;
  const mensal = PLANOS_INDEPENDENTE[0];
  const porMes = plano.preco / plano.meses;
  const economia = Math.round((1 - porMes / mensal.preco) * 100);

  return (
    <section id="planos" aria-labelledby="planos-titulo" className="relative py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Planos</p>
          <h2 id="planos-titulo" className="mt-4 text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
            Comece grátis. Fique se fizer sentido.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
            {DIAS_TESTE_GRATIS} dias com tudo liberado e sem cobrança. Depois, o básico continua grátis e o Premium libera o resto.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="relative overflow-hidden rounded-[28px] bg-carbono p-6 text-giz ring-white/10 sm:p-9 dark:ring-1" style={{ boxShadow: "var(--shadow-device)" }}>
            <div className="glow -right-24 -top-32 h-[420px] w-[420px]" style={{ background: "radial-gradient(closest-side, rgba(253,130,15,0.32), transparent)" }} aria-hidden />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <span className="font-data text-xs font-semibold uppercase tracking-[0.14em] text-accent">Premium</span>
                {economia > 0 ? (
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">{economia}% mais barato que o mensal</span>
                ) : null}
              </div>

              <div role="radiogroup" aria-label="Período do plano" className="mt-6 grid grid-cols-4 gap-1 rounded-2xl bg-white/5 p-1">
                {PLANOS_INDEPENDENTE.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={sel === p.id}
                    onClick={() => setSel(p.id)}
                    className={`rounded-xl px-1 py-2.5 text-[0.8rem] font-bold transition-colors sm:text-sm ${
                      sel === p.id ? "bg-giz text-carbono" : "text-giz/60 hover:text-giz"
                    }`}
                  >
                    {p.nome}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-end gap-2" aria-live="polite">
                <span className="pb-2 text-lg font-semibold text-giz/60">R$</span>
                <span className="font-data text-6xl font-semibold tracking-[-0.04em] sm:text-7xl">{brl(porMes)}</span>
                <span className="pb-2 text-lg font-semibold text-giz/60">/mês</span>
              </div>
              <p className="mt-2 text-sm text-giz/60">
                {plano.meses === 1 ? "Cobrança mensal." : `R$ ${brl(plano.preco)} a cada ${plano.meses} meses.`} Assinatura pela App Store ou Google Play, cancele quando quiser.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {PREMIUM.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-giz/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.75} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal delay={100} className="surface flex-1 rounded-[28px] p-6 sm:p-8">
              <span className="font-data text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Grátis para sempre</span>
              <p className="mt-3 text-[1.35rem] font-extrabold leading-tight tracking-tight" style={{ fontFamily: "var(--font-archivo)", fontStretch: "125%" }}>
                O essencial não sai do ar.
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {GRATIS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.95rem] text-ink-muted">
                    <Check className="h-4 w-4 shrink-0 text-success" strokeWidth={2.75} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180} className="rounded-[28px] border border-dashed border-accent/50 bg-accent-soft p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-carbono">
                  <Ticket className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-bold">Tem personal ou nutricionista?</p>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">
                    Peça o código de convite. Enquanto a vaga do seu profissional estiver ativa, você usa o app sem pagar nada.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
