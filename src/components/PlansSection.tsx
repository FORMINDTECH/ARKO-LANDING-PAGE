import { ChevronDown } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";

const PLANS = [
  {
    name: "Personal & Nutricionista",
    startingPrice: "49,90",
    startingNote: "até 19 vagas",
    studentNote: "Sem custo para o aluno vinculado",
    tiers: [
      { range: "1 a 19 vagas", price: "a partir de 49,90/mês" },
      { range: "20 a 49 vagas", price: "a partir de 179,90/mês" },
      { range: "50 a 99 vagas", price: "a partir de 449,90/mês" },
      { range: "100+ vagas", price: "a partir de 890,90/mês" },
    ],
    cta: "Começar agora",
    highlighted: false,
  },
  {
    name: "Consultoria",
    startingPrice: "59,90",
    startingNote: "até 19 vagas",
    studentNote: "Sem custo para o aluno vinculado",
    tiers: [
      { range: "1 a 19 vagas", price: "a partir de 59,90/mês" },
      { range: "20 a 49 vagas", price: "a partir de 215,90/mês" },
      { range: "50 a 99 vagas", price: "a partir de 539,90/mês" },
      { range: "100+ vagas", price: "a partir de 1.068,90/mês" },
    ],
    cta: "Começar agora",
    highlighted: true,
  },
  {
    name: "Usuário Independente",
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
    highlighted: false,
  },
];

export default function PlansSection() {
  return (
    <section id="planos" className="bg-bg py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Planos para o seu negócio
          </h2>
          <p className="mt-3 text-base text-ink-muted sm:text-lg">
            Você paga por vaga de aluno vinculado. O preço escala com o
            tamanho da sua base: quanto mais alunos, menor o custo por vaga.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 rounded-[24px] bg-surface-2 p-3 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-2xl p-7 ${
                  plan.highlighted ? "card-inset ring-2 ring-accent" : "card-inset"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Mais popular
                  </span>
                )}

                <span className="text-base font-semibold uppercase tracking-wide text-accent">
                  {plan.name}
                </span>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-base font-medium text-ink-muted">
                    R$
                  </span>
                  <span className="font-data text-4xl font-semibold tracking-tight text-ink">
                    {plan.startingPrice}
                  </span>
                  <span className="text-base font-medium text-ink-muted">
                    /mês
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">
                  {plan.startingNote}
                </p>

                <div className="mt-4 flex min-h-[48px] items-center rounded-xl border border-line bg-surface-2 px-4 py-3">
                  <p className="text-sm font-medium text-ink">
                    {plan.studentNote}
                  </p>
                </div>

                <details className="group my-3">
                  <summary className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-accent">
                    Ver faixas de preço
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
                      strokeWidth={2.5}
                    />
                  </summary>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {plan.tiers.map((tier) => (
                      <div
                        key={tier.range}
                        className="flex items-center justify-between rounded-lg border border-line px-3 py-2"
                      >
                        <span className="text-sm text-ink-muted">
                          {tier.range}
                        </span>
                        <span className="font-data text-sm font-semibold text-ink">
                          R$ {tier.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </details>

                <a
                  href="#contato"
                  className="btn-primary mt-auto inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-semibold"
                >
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={150}
          id="contato"
          className="mt-4 flex flex-col items-center gap-3 rounded-2xl border border-accent/30 bg-surface-2 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div>
            <h3 className="text-lg font-extrabold tracking-tight text-ink sm:text-xl">
              Pronto para profissionalizar o atendimento dos seus alunos?
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Crie sua conta e veja o ARKO funcionando com o seu fluxo de
              trabalho.
            </p>
          </div>
          <a
            href="https://arko.formind.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex shrink-0 items-center rounded-xl px-6 py-3 text-sm font-semibold"
          >
            Comece agora mesmo
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
