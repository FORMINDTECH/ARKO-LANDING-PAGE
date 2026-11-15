import { Dumbbell, Flame, ScanBarcode, Timer } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";

// Benefícios contados como um dia comum, do treino da manhã à sequência mantida à noite.
const MOMENTOS = [
  {
    hora: "06:40",
    icone: Dumbbell,
    titulo: "O treino do dia já está pronto",
    texto: "Abra o app e o treino de hoje está lá, com séries, repetições e carga definidas.",
  },
  {
    hora: "07:25",
    icone: Timer,
    titulo: "Descanso no tempo certo",
    texto: "Marque cada série e deixe o app contar o descanso até a próxima.",
  },
  {
    hora: "12:50",
    icone: ScanBarcode,
    titulo: "Almoço registrado em segundos",
    texto: "Leia o código de barras ou busque no catálogo. As calorias do dia se atualizam na hora.",
  },
  {
    hora: "21:10",
    icone: Flame,
    titulo: "Sequência garantida",
    texto: "O dia entra no calendário, a sequência sobe e o mascote comemora junto.",
  },
];

export default function DiaComArko() {
  return (
    <section id="beneficios" aria-labelledby="dia-titulo" className="relative py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">Um dia com o Arko</p>
            <h2 id="dia-titulo" className="mt-4 text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
              Organização que cabe na rotina.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-lg text-lg leading-relaxed text-ink-muted lg:ml-auto">
              Treino, alimentação e evolução no mesmo lugar. Você para de pular de app em app e passa a ver o quadro inteiro.
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-14 grid gap-0 sm:mt-16 lg:grid-cols-4 lg:gap-6">
          {/* linha do dia */}
          <span aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-line-strong lg:left-0 lg:right-0 lg:top-[19px] lg:h-px lg:w-auto" />
          {MOMENTOS.map((m, i) => {
            const Icone = m.icone;
            return (
              <Reveal as="li" key={m.hora} delay={i * 110} className="relative pb-10 pl-14 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-14">
                <span
                  className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border ${
                    i === MOMENTOS.length - 1 ? "border-accent bg-accent text-carbono" : "border-line-strong bg-bg text-ink"
                  }`}
                >
                  <Icone className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <p className="font-data text-sm font-semibold text-accent-ink">{m.hora}</p>
                <h3 className="mt-2 text-[1.2rem] font-extrabold leading-tight tracking-tight">{m.titulo}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-ink-muted">{m.texto}</p>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
