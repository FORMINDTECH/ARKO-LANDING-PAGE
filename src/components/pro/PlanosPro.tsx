"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import Recorte from "../devices/Recorte";
import Titulo from "../ui/Titulo";
import { PAINEL_CADASTRO_URL } from "@/lib/links";
import { MAX_VAGAS, TIERS_CONSULTORIA, TIERS_PERSONAL_NUTRI, brl, calcularPrecoPorTiers } from "@/lib/precos";

/**
 * Preço por vaga. Em vez de três cartões de plano lado a lado, uma calculadora: o profissional
 * diz quantos alunos tem e vê o valor (mesma fórmula da API). As âncoras da tabela ficam visíveis.
 */
const TIPOS = [
  { id: "personal", nome: "Personal ou nutricionista", tiers: TIERS_PERSONAL_NUTRI },
  { id: "consultoria", nome: "Consultoria", tiers: TIERS_CONSULTORIA },
] as const;

export default function PlanosPro() {
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]["id"]>("personal");
  const [vagas, setVagas] = useState(20);
  const atual = TIPOS.find((t) => t.id === tipo)!;
  const total = calcularPrecoPorTiers(vagas, atual.tiers);

  return (
    <section id="planos" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Titulo
            rotulo="Planos"
            titulo={
              <>
                Você paga por vaga. <span className="grifo">O aluno, nada.</span>
              </>
            }
          />
          <Reveal delay={100} className="lg:justify-self-end">
            <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
              Cada vaga cobre um aluno por 30 dias, e ele usa o app completo sem pagar. Quanto mais vagas, menor o preço
              de cada uma.
            </p>
          </Reveal>
        </div>

        <Reveal direction="scale" className="mt-14">
          <div className="grid gap-2 rounded-[28px] bg-surface-2 p-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            {/* calculadora */}
            <div className="card-inset rounded-[22px] p-6 sm:p-10">
              <div role="radiogroup" aria-label="Tipo de profissional" className="inline-flex flex-wrap gap-1 rounded-xl bg-surface-2 p-1">
                {TIPOS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={tipo === t.id}
                    onClick={() => setTipo(t.id)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      tipo === t.id ? "bg-surface text-ink shadow-sm" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {t.nome}
                  </button>
                ))}
              </div>

              <label htmlFor="vagas" className="mt-10 block text-sm text-ink-muted">
                Quantos alunos você acompanha?
              </label>
              <div className="mt-3 flex items-baseline gap-3">
                <output htmlFor="vagas" className="font-data text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
                  {vagas}
                </output>
                <span className="text-base text-ink-muted">{vagas === 1 ? "vaga" : "vagas"}</span>
              </div>
              <input
                id="vagas"
                type="range"
                min={1}
                max={MAX_VAGAS}
                value={vagas}
                onChange={(e) => setVagas(Number(e.target.value))}
                className="mt-6 w-full cursor-pointer accent-[var(--color-accent)]"
              />
              <div className="mt-1 flex justify-between font-data text-[11px] text-ink-muted">
                <span>1</span>
                <span>{MAX_VAGAS}</span>
              </div>

              <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-ink-muted">Total por mês</p>
                  <p className="mt-1 font-data text-4xl font-semibold tracking-tight text-ink">
                    <span className="mr-1 text-xl text-ink-muted">R$</span>
                    {brl(total)}
                  </p>
                  <p className="mt-1 font-data text-xs text-ink-muted">≈ R$ {brl(total / vagas)} por aluno</p>
                </div>
                <a
                  href={PAINEL_CADASTRO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
                >
                  Criar minha conta
                  <ArrowRight className="seta h-4 w-4" strokeWidth={2.25} />
                </a>
              </div>
            </div>

            {/* tabela de referência */}
            <div className="flex flex-col rounded-[22px] p-6 sm:p-10">
              <p className="eyebrow">Tabela de referência</p>
              <table className="mt-6 w-full text-left">
                <caption className="sr-only">Preço mensal por quantidade de vagas, {atual.nome}</caption>
                <thead>
                  <tr className="font-data text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    <th scope="col" className="pb-3 font-medium">Vagas</th>
                    <th scope="col" className="pb-3 text-right font-medium">Por mês</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line border-y border-line">
                  {atual.tiers.map((f) => (
                    <tr key={f.vagas}>
                      <td className="py-3.5 font-data text-base text-ink">{f.vagas}</td>
                      <td className="py-3.5 text-right font-data text-base font-semibold text-ink">R$ {brl(f.preco)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                Entre uma faixa e outra, o preço é proporcional. Se a vaga vencer, o aluno ainda tem 7 dias antes de o
                acesso ser limitado.
              </p>
              <Recorte nome="vagas" rotulo="No seu dashboard" className="mt-auto w-[200px] pt-8" sizes="200px" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
