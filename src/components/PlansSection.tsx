import { ArrowRight, Check } from "lucide-react";
import Container from "./Container";

const PROFESSIONAL_PLANS = [
  {
    name: "Inicial",
    description: "Para começar a organizar seus alunos.",
    price: "49,90",
    priceNote: "até 5 alunos",
    extra: "Aluno adicional: R$ 10,90/mês",
    features: [
      "Treinos gerados por IA",
      "Acompanhamento de evolução",
      "Experiência premium para o aluno",
    ],
    highlight: false,
    cta: "Começar agora",
  },
  {
    name: "Profissional",
    description: "Para quem já vive de personal ou nutrição.",
    price: "149,90",
    priceNote: "até 20 alunos",
    extra: "Aluno adicional: R$ 10,90/mês",
    features: [
      "Tudo do plano Inicial",
      "Gamificação e engajamento",
      "Suporte prioritário",
    ],
    highlight: true,
    cta: "Começar agora",
  },
  {
    name: "Escala",
    description: "Desconto por volume para bases maiores.",
    price: "249,90",
    priceNote: "a partir de 30 alunos",
    extra: "Aluno adicional: R$ 8,90/mês",
    features: [
      "Tudo do plano Profissional",
      "Preço por aluno reduzido",
      "Onboarding assistido",
    ],
    highlight: false,
    cta: "Fale com o time",
  },
];

export default function PlansSection() {
  return (
    <section id="planos" className="border-t border-line bg-bg py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Planos para o seu negócio
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Pague pelo tamanho da sua base de alunos. Sem contrato de
            fidelidade.
          </p>
        </div>

        <div className="mt-14">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Personal trainers e nutricionistas
          </span>
          <p className="mt-2 max-w-lg text-sm text-ink-muted">
            Monte treinos e dietas pelo app e acompanhe cada aluno em tempo
            real.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {PROFESSIONAL_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-8 ${
                  plan.highlight
                    ? "border-accent bg-surface"
                    : "border-line bg-surface"
                }`}
              >
                {plan.highlight && (
                  <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                    Mais popular
                  </span>
                )}
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-sm font-medium text-ink-muted">
                    R$
                  </span>
                  <span className="text-4xl font-extrabold tracking-tight text-ink">
                    {plan.price}
                  </span>
                  <span className="text-sm font-medium text-ink-muted">
                    /mês
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{plan.priceNote}</p>
                <p className="mt-3 text-xs text-ink-muted">{plan.extra}</p>

                <ul className="mt-6 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-success"
                        strokeWidth={2.5}
                      />
                      <span className="text-sm text-ink-muted">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contato"
                  className={`mt-8 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${
                    plan.highlight
                      ? "bg-accent text-white"
                      : "border border-line text-ink"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Academias e studios
          </span>
          <p className="mt-2 max-w-lg text-sm text-ink-muted">
            A academia acompanha tudo por um painel de gestão. Os alunos
            usam o ARKO sem custo.
          </p>

          <div className="mt-8 flex flex-col gap-8 rounded-2xl border border-line bg-surface p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3 className="text-xl font-bold tracking-tight text-ink">
                Academia &amp; Studio
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Sem montagem de treino ou dieta pelo profissional. A
                academia associa os alunos que podem usar o app e acompanha
                engajamento e evolução de todos em um painel único. Preço
                escalona com o número de alunos.
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                <li className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-success"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm text-ink-muted">
                    Alunos usam o app sem custo adicional
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-success"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm text-ink-muted">
                    Painel de gestão centralizado
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-success"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm text-ink-muted">
                    Ranking e feed social entre alunos
                  </span>
                </li>
              </ul>
            </div>

            <div className="shrink-0 rounded-xl border border-line bg-surface-2 p-6 text-center lg:w-64">
              <p className="text-xs text-ink-muted">Exemplo para 200 alunos</p>
              <div className="mt-2 flex items-baseline justify-center gap-1.5">
                <span className="text-sm font-medium text-ink-muted">
                  R$
                </span>
                <span className="text-3xl font-extrabold tracking-tight text-ink">
                  1.299,90
                </span>
                <span className="text-sm font-medium text-ink-muted">
                  /mês
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                Valor ajusta com o volume
              </p>
              <a
                href="#contato"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface"
              >
                Fale com vendas
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Alunos independentes
          </span>
          <p className="mt-2 max-w-lg text-sm text-ink-muted">
            Quer treinar por conta própria, sem personal ou nutricionista?
          </p>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-ink">
                  R$ 12,90
                </span>
                <span className="text-sm font-medium text-ink-muted">
                  /mês
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-ink">
                  R$ 129,90
                </span>
                <span className="text-sm font-medium text-ink-muted">
                  /ano (economize R$ 24,90)
                </span>
              </div>
            </div>
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface"
            >
              Quero assinar
            </a>
          </div>
        </div>

        <div
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
            href="mailto:contato@arko.app"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Agende uma demonstração
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>
      </Container>
    </section>
  );
}
