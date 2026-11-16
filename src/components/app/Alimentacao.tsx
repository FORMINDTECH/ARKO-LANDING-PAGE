import Container from "../Container";
import Reveal from "../Reveal";
import Phone from "../devices/Phone";
import Recorte from "../devices/Recorte";
import Titulo from "../ui/Titulo";

/**
 * Conceito: o dia contado em refeições. Uma bandeja larga com o celular flutuando devagar
 * e, ao lado, uma linha do tempo vertical feita com pedaços reais da tela de alimentação.
 */
const DIA = [
  { hora: "Manhã", texto: "Registre o café da manhã. Dá para ler o código de barras da embalagem.", recorte: "refeicao" as const },
  { hora: "Ao longo do dia", texto: "As calorias somam sozinhas e a barra mostra quanto falta para a meta.", recorte: "calorias" as const },
  { hora: "Fim do dia", texto: "Treino, calorias e água fecham o dia nos anéis de meta.", recorte: "metas" as const },
];

export default function Alimentacao() {
  return (
    <section id="alimentacao" className="relative py-14 sm:py-24 lg:py-32">
      <Container>
        <Titulo
          rotulo="02 · Alimentação"
          titulo="Comer certo fica mais fácil quando você vê o dia inteiro."
          apoio="Refeições, calorias e água no mesmo lugar, do lado dos treinos."
        />

        <Reveal direction="scale" className="mt-10 sm:mt-14">
          <div className="relative overflow-hidden rounded-[28px] bg-surface-2">
            <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              {/* celular inteiro, flutuando sobre a luz */}
              <div className="relative flex items-center justify-center px-8 py-14 sm:py-16">
                <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-y-1/2 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
                {/* flutuando devagar, com a sombra acompanhando */}
                <div className="relative">
                  <div className="boiar">
                    <Phone tela="alimentacao" className="w-[240px] sm:w-[280px]" brilho />
                  </div>
                  <div aria-hidden className="sombra-boiar mx-auto mt-6 h-4 w-[70%] rounded-[50%] bg-black/40 blur-md" />
                </div>
              </div>

              {/* linha do tempo */}
              <ol className="relative flex flex-col justify-center gap-10 border-t border-line p-7 sm:p-12 lg:border-l lg:border-t-0">
                <span aria-hidden className="absolute bottom-16 left-[calc(1.75rem+5px)] top-16 w-px bg-line sm:left-[calc(3rem+5px)]" />
                {DIA.map((d, i) => (
                  <Reveal as="li" key={d.hora} delay={i * 140} direction="right" className="relative pl-9">
                    <span className="absolute left-0 top-1 h-[11px] w-[11px] rounded-full border-2 border-accent bg-surface-2" />
                    <p className="font-data text-xs font-semibold uppercase tracking-[0.16em] text-accent">{d.hora}</p>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-ink">{d.texto}</p>
                    <Recorte nome={d.recorte} className="mt-5 max-w-[420px]" sizes="(min-width: 1024px) 420px, 80vw" />
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
