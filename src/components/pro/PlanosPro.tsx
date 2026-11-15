"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import { MAX_VAGAS, TIERS_CONSULTORIA, TIERS_PERSONAL_NUTRI, brl, calcularPrecoPorTiers } from "@/lib/precos";
import { PAINEL_CADASTRO_URL } from "@/lib/links";

const PERFIS = [
  { id: "personal", rotulo: "Personal ou nutricionista", tiers: TIERS_PERSONAL_NUTRI },
  { id: "consultoria", rotulo: "Consultoria", tiers: TIERS_CONSULTORIA },
] as const;

const ATALHOS = [5, 20, 50, 100];

const INCLUSO = [
  "Painel web completo e app do profissional",
  "Cada vaga dá ao aluno o app completo por 30 dias",
  "O aluno vinculado não paga nada",
  "Chat, desafios, modelos e avaliação física",
];

export default function PlanosPro() {
  const [perfil, setPerfil] = useState<(typeof PERFIS)[number]["id"]>("personal");
  const [vagas, setVagas] = useState(20);
  const tiers = PERFIS.find((p) => p.id === perfil)!.tiers;
  const total = calcularPrecoPorTiers(vagas, tiers);
  const porVaga = total / vagas;
  const progresso = ((vagas - 1) / (MAX_VAGAS - 1)) * 100;

  return (
    <section id="planos" aria-labelledby="planos-titulo" className="relative py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Planos</p>
          <h2 id="planos-titulo" className="mt-4 text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
            Você paga por vaga. O aluno, nada.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
            Quanto mais alunos, menor o preço de cada vaga. Simule abaixo.
          </p>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-[28px] border border-line bg-surface lg:grid-cols-[1.2fr_0.8fr]" style={{ boxShadow: "var(--shadow-device)" }}>
          <div className="p-6 sm:p-9">
            <div role="radiogroup" aria-label="Tipo de profissional" className="inline-grid grid-cols-2 gap-1 rounded-2xl bg-surface-2 p-1">
              {PERFIS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={perfil === p.id}
                  onClick={() => setPerfil(p.id)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-bold transition-colors sm:px-4 ${
                    perfil === p.id ? "bg-ink text-bg" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {p.rotulo}
                </button>
              ))}
            </div>

            <div className="mt-9 flex items-end justify-between gap-4">
              <label htmlFor="vagas" className="font-bold">
                Quantas vagas?
              </label>
              <output htmlFor="vagas" className="font-data text-4xl font-semibold tracking-[-0.04em] tabular-nums">
                {vagas}
              </output>
            </div>
            <input
              id="vagas"
              type="range"
              min={1}
              max={MAX_VAGAS}
              value={vagas}
              onChange={(e) => setVagas(Number(e.target.value))}
              aria-valuetext={`${vagas} vagas`}
              className="slider-vagas mt-4 w-full"
              style={{ ["--p" as string]: `${progresso}%` }}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {ATALHOS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setVagas(n)}
                  className={`rounded-full border px-3.5 py-1.5 font-data text-xs font-semibold transition-colors ${
                    vagas === n ? "border-accent bg-accent-soft text-accent-ink" : "border-line-strong text-ink-muted hover:text-ink"
                  }`}
                >
                  {n} vagas
                </button>
              ))}
            </div>

            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {INCLUSO.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem] text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={2.75} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden bg-carbono p-6 text-giz sm:p-9">
            <div className="glow -bottom-40 -right-20 h-[420px] w-[420px]" style={{ background: "radial-gradient(closest-side, rgba(253,130,15,0.35), transparent)" }} aria-hidden />
            <div className="relative" aria-live="polite">
              <p className="font-data text-xs font-semibold uppercase tracking-[0.14em] text-accent">Total por mês</p>
              <p className="mt-4 flex items-end gap-2">
                <span className="pb-2 text-lg font-semibold text-giz/60">R$</span>
                <span className="font-data text-[3.4rem] font-semibold leading-none tracking-[-0.04em] tabular-nums sm:text-6xl">{brl(total)}</span>
              </p>
              <p className="mt-3 text-giz/70">
                R$ {brl(porVaga)} por vaga · {vagas} {vagas === 1 ? "aluno" : "alunos"}
              </p>
            </div>
            <div className="relative mt-10">
              <a href={PAINEL_CADASTRO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent w-full">
                Criar conta e contratar
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </a>
              <p className="mt-4 text-xs leading-relaxed text-giz/55">
                Valor de referência. O preço final é calculado no painel. No cartão, renova todo mês até você desativar; PIX e boleto valem 30 dias.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
