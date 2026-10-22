import { Star } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote: "Acabou a planilha.",
    description:
      "Antes eu perdia horas organizando treino em planilha e respondendo aluno no WhatsApp. Com o ARKO, monto tudo uma vez e meus alunos recebem na hora.",
    author: "Rafael Souza",
    role: "Personal Trainer",
  },
  {
    quote: "Evolução que eu consigo provar.",
    description:
      "A avaliação física pelo painel mudou meu atendimento. Consigo mostrar a evolução real do aluno com dado, não só com percepção.",
    author: "Camila Duarte",
    role: "Nutricionista",
  },
  {
    quote: "Escala sem perder padrão.",
    description:
      "Como consultoria, precisávamos de algo que escalasse sem perder o padrão de atendimento entre os profissionais. O painel resolveu isso.",
    author: "Bruno Castanheira",
    role: "Consultoria esportiva",
  },
  {
    quote: "Menos cancelamento.",
    description:
      "Meus alunos comentam que o app é profissional e organizado. Isso ajudou a reduzir o cancelamento da minha base.",
    author: "Larissa Matos",
    role: "Personal Trainer",
  },
  {
    quote: "Tudo em um só lugar.",
    description:
      "Treino, dieta e evolução deixaram de estar espalhados em três apps diferentes. Hoje é só o ARKO.",
    author: "Diego Fontoura",
    role: "Personal Trainer",
  },
  {
    quote: "Atendimento mais próximo.",
    description:
      "O feed e a gamificação fizeram meus alunos interagirem mais comigo entre as sessões, não só no dia do treino.",
    author: "Patrícia Lemos",
    role: "Nutricionista",
  },
];

export default function TestimonialsSection() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-bg py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Quem usa recomenda
          </h2>
        </Reveal>

        <Reveal delay={100} className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent sm:w-24" />

          <div className="flex w-max animate-marquee gap-4">
            {loop.map((t, i) => (
              <div
                key={`${t.author}-${i}`}
                className="flex w-[260px] shrink-0 flex-col rounded-[20px] bg-surface-2 p-2 sm:w-[320px]"
              >
                <div className="card-inset p-5">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-accent text-accent"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-snug text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {t.description}
                  </p>
                </div>
                <p className="px-3 py-3 text-sm text-ink-muted">
                  — {t.author}, {t.role}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
