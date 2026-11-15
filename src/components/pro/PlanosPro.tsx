"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import Titulo from "../ui/Titulo";
import { PAINEL_CADASTRO_URL } from "@/lib/links";
import {
  LIMITE_PRECO_CHEIO,
  MAX_VAGAS,
  MIN_VAGAS,
  PRECOS_VAGA,
  type TipoProfissional,
  brl,
  calcularPrecoVagas,
} from "@/lib/precos";

/**
 * Preço por vaga. Em vez de cartões de plano lado a lado, uma calculadora: o profissional diz
 * quantos alunos tem e vê o total. Ao lado, a regra do tipo escolhido (personal/nutri: R$ 9,90 e
 * R$ 8,90 a partir do 101º; consultoria: R$ 11,90 e R$ 10,90; mínimo de 3) e alguns exemplos.
 */
const EXEMPLOS = [MIN_VAGAS, 20, 100, 150];

export default function PlanosPro() {
  const [tipo, setTipo] = useState<TipoProfissional>("personal");
  const [vagas, setVagas] = useState(20);
  const { cheio, extra } = PRECOS_VAGA[tipo];
  const total = calcularPrecoVagas(vagas, tipo);

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
              Cada vaga cobre um aluno por 30 dias, e ele usa o app completo sem pagar. A partir do {LIMITE_PRECO_CHEIO + 1}º aluno,
              cada vaga fica mais barata.
            </p>
          </Reveal>
        </div>

        <Reveal direction="scale" className="mt-14">
          <div className="grid gap-2 rounded-[28px] bg-surface-2 p-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            {/* calculadora */}
            <div className="card-inset flex flex-col justify-between gap-8 rounded-[22px] p-6 sm:p-9">
              <div>
              <div role="radiogroup" aria-label="Tipo de profissional" className="inline-flex flex-wrap gap-1 rounded-xl bg-surface-2 p-1">
                {(Object.keys(PRECOS_VAGA) as TipoProfissional[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={tipo === id}
                    onClick={() => setTipo(id)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      tipo === id ? "bg-surface text-ink shadow-sm" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {PRECOS_VAGA[id].nome}
                  </button>
                ))}
              </div>

              <label htmlFor="vagas" className="mt-7 block text-sm text-ink-muted">
                Quantos alunos você acompanha?
              </label>
              <div className="mt-3 flex items-baseline gap-3">
                <output htmlFor="vagas" className="font-data text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
                  {vagas}
                </output>
                <span className="text-base text-ink-muted">vagas</span>
              </div>
              <input
                id="vagas"
                type="range"
                min={MIN_VAGAS}
                max={MAX_VAGAS}
                value={vagas}
                onChange={(e) => setVagas(Number(e.target.value))}
                className="mt-6 w-full cursor-pointer accent-[var(--color-accent)]"
              />
              <div className="mt-1 flex justify-between font-data text-[11px] text-ink-muted">
                <span>{MIN_VAGAS}</span>
                <span>{MAX_VAGAS}+</span>
              </div>

              </div>

              <div className="flex flex-col gap-6 border-t border-line pt-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-ink-muted">Total por mês</p>
                  <p className="mt-1 font-data text-4xl font-semibold tracking-tight text-ink">
                    <span className="mr-1 text-xl text-ink-muted">R$</span>
                    {brl(total)}
                  </p>
                  <p className="mt-1 font-data text-xs text-ink-muted">
                    {vagas > LIMITE_PRECO_CHEIO
                      ? `${LIMITE_PRECO_CHEIO} × R$ ${brl(cheio)} + ${vagas - LIMITE_PRECO_CHEIO} × R$ ${brl(extra)}`
                      : `${vagas} × R$ ${brl(cheio)}`}
                  </p>
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

            {/* regra e exemplos */}
            <div className="flex flex-col rounded-[22px] p-6 sm:p-9">
              <p className="eyebrow">Como é cobrado · {PRECOS_VAGA[tipo].nome}</p>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm text-ink">Até {LIMITE_PRECO_CHEIO} alunos</dt>
                  <dd className="font-data text-base font-semibold text-ink">
                    R$ {brl(cheio)} <span className="text-xs font-medium text-ink-muted">/aluno</span>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm text-ink">A partir do {LIMITE_PRECO_CHEIO + 1}º aluno</dt>
                  <dd className="font-data text-base font-semibold text-accent">
                    R$ {brl(extra)} <span className="text-xs font-medium text-ink-muted">/aluno</span>
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-ink-muted">Mínimo de {MIN_VAGAS} vagas para começar. Valores por mês.</p>

              <p className="eyebrow mt-7">Exemplos</p>
              <dl className="mt-3 grid grid-cols-2 gap-2">
                {EXEMPLOS.map((n) => (
                  <div key={n} className="min-w-0 rounded-xl bg-surface px-3.5 py-2.5">
                    <dt className="font-data text-[11px] text-ink-muted">{n} vagas</dt>
                    <dd className="mt-0.5 whitespace-nowrap font-data text-sm font-semibold text-ink">R$ {brl(calcularPrecoVagas(n, tipo))}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 text-xs leading-relaxed text-ink-muted">
                Se a vaga vencer, o aluno ainda tem 7 dias antes de o acesso ser limitado.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
