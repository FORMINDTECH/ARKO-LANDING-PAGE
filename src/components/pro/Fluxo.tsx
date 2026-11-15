import Container from "../Container";
import Reveal from "../Reveal";
import Recorte from "../devices/Recorte";
import Titulo from "../ui/Titulo";
import type { NomeRecorte } from "../devices/telas";

/**
 * Conceito: o processo como uma linha do tempo de peças reais. Cada etapa é provada por um
 * pedaço da interface de quem age naquele momento (profissional ou aluno), não por um ícone.
 */
const ETAPAS: { quem: string; titulo: string; texto: string; recorte: NomeRecorte }[] = [
  {
    quem: "Você",
    titulo: "Convide",
    texto: "Mande seu código. O aluno digita no app e o vínculo está feito.",
    recorte: "convite",
  },
  {
    quem: "Você",
    titulo: "Planeje",
    texto: "Monte treino e dieta no painel. No app do aluno, o treino chega assim.",
    recorte: "treino",
  },
  {
    quem: "O aluno",
    titulo: "Treine",
    texto: "Ele segue o treino no app e a sequência de dias vai crescendo.",
    recorte: "sequencia",
  },
  {
    quem: "Você",
    titulo: "Acompanhe",
    texto: "Veja no dashboard quem está ativo e quem precisa de um empurrão.",
    recorte: "atividade",
  },
];

export default function Fluxo() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Titulo rotulo="05 · Do convite ao resultado" titulo="Seu fluxo de trabalho, de ponta a ponta." />

        <Reveal className="relative mt-16">
          <div aria-hidden className="linha-desenha absolute left-0 right-0 top-[15px] hidden h-px bg-accent/60 lg:block" />
          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {ETAPAS.map((e, i) => (
              <Reveal as="li" key={e.titulo} delay={i * 130} className="relative flex flex-col">
                <span className="relative z-10 flex h-[31px] w-[31px] items-center justify-center rounded-full border-2 border-accent bg-bg font-data text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <p className="mt-6 font-data text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{e.quem}</p>
                <h3 className="mt-1 text-xl font-extrabold tracking-tight text-ink">{e.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{e.texto}</p>
                <div className="mt-6 flex flex-1 items-start">
                  <Recorte nome={e.recorte} className="w-full" sizes="(min-width: 1024px) 280px, 90vw" />
                </div>
              </Reveal>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
