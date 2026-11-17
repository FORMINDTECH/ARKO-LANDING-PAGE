import { FileText } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import Drift from "../Drift";
import Phone from "../devices/Phone";
import Recorte from "../devices/Recorte";
import Titulo from "../ui/Titulo";

/**
 * Conceito: a tela de evolução como ela é. As duas abas reais ("Frequência", com o mapa dos
 * grupos musculares, e "Progressão de carga") em dois celulares lado a lado, desencontrados.
 * Ao lado, o que cada uma mostra. Embaixo, a sequência no calendário.
 */
const LEITURAS = [
  { rotulo: "Frequência", texto: "Quantos treinos você concluiu por dia, na semana, no mês, em 6 meses ou no ano." },
  { rotulo: "Carga", texto: "A carga máxima de cada exercício, sessão por sessão, para ver o peso subir." },
  { rotulo: "Músculos", texto: "Um mapa do corpo, de frente e de costas, com os grupos que você mais treinou." },
];

export default function Evolucao() {
  return (
    <section id="evolucao" className="relative py-14 sm:py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <div>
            <Titulo
              rotulo="03 · Evolução"
              titulo={
                <>
                  Evolução que dá <span className="grifo">para ver</span>.
                </>
              }
              apoio="Tudo sai dos treinos que você já registra. Nenhuma planilha para preencher."
            />
            <Reveal delay={150} className="mt-10">
              <dl className="divide-y divide-line border-y border-line">
                {LEITURAS.map((l) => (
                  <div key={l.rotulo} className="grid grid-cols-[96px_1fr] gap-4 py-5 sm:grid-cols-[120px_1fr]">
                    <dt className="font-data text-xs font-semibold uppercase tracking-[0.16em] text-accent">{l.rotulo}</dt>
                    <dd className="text-base leading-relaxed text-ink">{l.texto}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 flex items-center gap-3 text-sm text-ink-muted">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-accent">
                  <FileText className="h-4 w-4" strokeWidth={2} />
                </span>
                E quando quiser mostrar para alguém, exporte o relatório em PDF.
              </p>
            </Reveal>
          </div>

          {/* as duas abas da tela de evolução */}
          <Reveal direction="scale" className="relative">
            <div className="relative overflow-hidden rounded-[28px] bg-surface-2 px-6 pb-12 pt-12 sm:px-12">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
              <div className="relative flex items-start justify-center gap-4 sm:gap-8">
                <Drift y={-24} className="w-[46%] max-w-[270px]">
                  <Phone tela="musculos" brilho />
                  <p className="mt-4 text-center font-data text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                    Frequência
                  </p>
                </Drift>
                <Drift y={24} className="mt-[14%] w-[46%] max-w-[270px]">
                  <Phone tela="carga" brilho />
                  <p className="mt-4 text-center font-data text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                    Progressão de carga
                  </p>
                </Drift>
              </div>
            </div>
          </Reveal>
        </div>

        {/* sequência */}
        <div className="mt-6 grid gap-5 lg:grid-cols-12">
          <Reveal direction="scale" className="lg:col-span-5">
            <figure className="h-full rounded-[28px] bg-surface-2 p-5 sm:p-8">
              <figcaption className="eyebrow mb-5">Dias treinados</figcaption>
              <Recorte nome="calendario" sizes="(min-width: 1024px) 480px, 92vw" />
            </figure>
          </Reveal>
          <Reveal direction="scale" delay={120} className="lg:col-span-7">
            <div className="flex h-full flex-col justify-center gap-8 rounded-[28px] border-2 border-line p-6 sm:p-10">
              <div>
                <p className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl" style={{ fontStretch: "125%" }}>
                  Sequência que você não quer quebrar.
                </p>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
                  O calendário marca cada dia treinado e conta a sequência. Imprevisto? Dá para congelar até dois dias por
                  semana sem perder o que você construiu.
                </p>
              </div>
              <Recorte nome="sequencia" className="max-w-[420px]" sizes="420px" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
