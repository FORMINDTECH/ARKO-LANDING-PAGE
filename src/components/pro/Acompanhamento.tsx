import Container from "../Container";
import Reveal from "../Reveal";
import Drift from "../Drift";
import Browser from "../devices/Browser";
import Phone from "../devices/Phone";
import Tela from "../devices/Tela";
import Titulo from "../ui/Titulo";

/**
 * Conceito: a lupa. A tela real de medidas aparece inteira e, por cima, uma faixa ampliada da
 * mesma captura (peso, IMC, cintura, gordura e data da última avaliação) para os números serem
 * lidos de longe. Ao lado, o histórico de avaliações da mesma aluna no app do profissional.
 */

// Região da captura medidas (em fração de 2880 × 1620) mostrada na lupa.
const LUPA = { x1: 0.17, x2: 0.985, y1: 0.455, y2: 0.635 };

function Lupa() {
  const w = LUPA.x2 - LUPA.x1;
  const h = LUPA.y2 - LUPA.y1;
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-app ring-1 ring-line"
      style={{ aspectRatio: `${(w * 2880).toFixed(0)} / ${(h * 1620).toFixed(0)}`, boxShadow: "var(--shadow-float)" }}
    >
      <div
        className="absolute"
        style={{
          width: `${100 / w}%`,
          left: `${(-LUPA.x1 / w) * 100}%`,
          top: `${(-LUPA.y1 / h) * 100}%`,
        }}
      >
        <Tela
          base="/screens/painel/medidas"
          alt="Peso atual, IMC, cintura, gordura corporal e data da última avaliação de uma aluna, ampliados"
          width={2880}
          height={1620}
          sizes="(min-width: 1024px) 1500px, 200vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

export default function Acompanhamento() {
  return (
    <section id="acompanhamento" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Titulo
            rotulo="03 · Acompanhamento"
            titulo={
              <>
                Evolução com número, <span className="grifo">não com impressão</span>.
              </>
            }
          />
          <Reveal delay={100} className="lg:justify-self-end">
            <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
              Registre avaliações físicas com peso, medidas e composição corporal. Cada nova avaliação mostra quanto o
              aluno mudou desde a anterior.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 lg:pb-28">
          <Reveal direction="scale" className="lg:w-[74%]">
            <Browser tela="medidas" />
          </Reveal>

          {/* a lupa sobre a tela */}
          <Reveal delay={200} className="relative z-10 -mt-10 sm:-mt-20 lg:absolute lg:bottom-0 lg:left-[16%] lg:right-0 lg:mt-0">
            <Drift y={-30}>
              <p className="eyebrow mb-3 rounded-md bg-bg px-2.5 py-1.5">Última avaliação, ampliada</p>
              <Lupa />
            </Drift>
          </Reveal>

          {/* o mesmo acompanhamento no app do profissional */}
          <Drift y={-50} className="absolute right-0 top-[4%] z-10 hidden w-[22%] max-w-[240px] lg:block">
            <p className="eyebrow mb-3">No seu celular</p>
            <Phone tela="proAvaliacao" brilho />
          </Drift>
        </div>
      </Container>
    </section>
  );
}
