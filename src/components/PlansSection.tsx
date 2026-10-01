import { ArrowRight, ChevronDown } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";

const PLANS = [
  {
    name: "Personal & Nutricionista",
    description:
      "Monte treino ou dieta pelo painel web e acompanhe cada aluno vinculado em tempo real.",
    startingPrice: "49,90",
    startingNote: "até 5 vagas",
    studentNote: "Aluno paga a partir de R$ 4,90/mês",
    tiers: [
      { range: "1 a 5 vagas", price: "49,90/mês" },
      { range: "6 a 19 vagas", price: "a partir de 49,90/mês" },
      { range: "20 a 49 vagas", price: "a partir de 179,90/mês" },
      { range: "50 a 99 vagas", price: "a partir de 449,90/mês" },
      { range: "100+ vagas", price: "a partir de 890,90/mês" },
    ],
    cta: "Começar agora",
    ctaVariant: "solid" as const,
  },
  {
    name: "Consultoria",
    description:
      "Para quem oferece acompanhamento completo, com acesso completo à plataforma.",
    startingPrice: "59,90",
    startingNote: "até 5 vagas",
    studentNote: "Aluno paga a partir de R$ 8,90/mês",
    tiers: [
      { range: "1 a 5 vagas", price: "59,90/mês" },
      { range: "6 a 19 vagas", price: "a partir de 59,90/mês" },
      { range: "20 a 49 vagas", price: "a partir de 215,90/mês" },
      { range: "50 a 99 vagas", price: "a partir de 539,90/mês" },
      { range: "100+ vagas", price: "a partir de 1.068,90/mês" },
    ],
    cta: "Começar agora",
    ctaVariant: "outline" as const,
  },
  {
    name: "Usuário Independente",
    description:
      "Treine e acompanhe sua própria evolução pelo app, sem vínculo com academia ou profissional.",
    startingPrice: "14,90",
    startingNote: "cobrança mensal",
    studentNote: "Acesso completo ao aplicativo",
    tiers: [
      { range: "Mensal", price: "14,90/mês" },
      { range: "Trimestral", price: "39,90 a cada 3 meses" },
      { range: "Semestral", price: "69,90 a cada 6 meses" },
      { range: "Anual", price: "129,90 a cada 12 meses" },
    ],
    cta: "Quero assinar",
    ctaVariant: "outline" as const,
  },
];

export default function PlansSection() {
  return (
    <section
      id="planos"
      data-snap
      className="flex min-h-screen items-center border-t border-line bg-bg py-20 sm:py-28"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Planos para o seu negócio
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Você paga por vaga de aluno vinculado. O preço escala com o
            tamanho da sua base: quanto mais alunos, menor o custo por vaga.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-8">
                <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                  {plan.name}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {plan.description}
                </p>

                <div className="mt-6">
                  <p className="text-xs font-medium text-ink-muted">
                    A partir de
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-medium text-ink-muted">
                      R$
                    </span>
                    <span className="text-4xl font-extrabold tracking-tight text-ink">
                      {plan.startingPrice}
                    </span>
                    <span className="text-sm font-medium text-ink-muted">
                      /mês
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">
                    {plan.startingNote}
                  </p>
                </div>

                <div className="mt-5 flex min-h-[52px] items-center rounded-xl border border-line bg-surface-2 px-4 py-3">
                  <p className="text-xs font-medium text-ink">
                    {plan.studentNote}
                  </p>
                </div>

                <details className="group mb-5 mt-5">
                  <summary className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-accent">
                    Ver faixas de preço
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
                      strokeWidth={2.5}
                    />
                  </summary>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {plan.tiers.map((tier) => (
                      <div
                        key={tier.range}
                        className="flex items-center justify-between rounded-lg border border-line px-3 py-2"
                      >
                        <span className="text-xs text-ink-muted">
                          {tier.range}
                        </span>
                        <span className="text-xs font-semibold text-ink">
                          R$ {tier.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </details>

                <a
                  href="#contato"
                  className={`mt-auto inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${
                    plan.ctaVariant === "solid"
                      ? "bg-accent text-white"
                      : "border border-line text-ink transition-colors hover:bg-surface-2"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={100}
          id="contato"
          className="mt-20 flex flex-col items-center gap-6 rounded-2xl bg-gradient-accent-panel px-8 py-14 text-center sm:px-16"
        >
          <h3 className="max-w-2xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Pronto para profissionalizar o atendimento dos seus alunos?
          </h3>
          <p className="max-w-xl text-white/80">
            Agende uma demonstração e veja o ARKO funcionando com o seu
            fluxo de trabalho.
          </p>
          <a
            href="mailto:contato@arkohealth.com.br"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Agende uma demonstração
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
