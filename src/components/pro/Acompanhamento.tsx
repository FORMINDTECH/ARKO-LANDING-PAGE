import Container from "../Container";
import Reveal from "../Reveal";
import Drift from "../Drift";
import Browser from "../devices/Browser";
import Phone from "../devices/Phone";
import Titulo from "../ui/Titulo";

/**
 * Conceito: a mesma avaliação nas duas telas. A tela real de medidas no painel e, ao lado, o
 * histórico de avaliações da mesma aluna no app do profissional.
 */
export default function Acompanhamento() {
  return (
    <section id="acompanhamento" className="relative py-14 sm:py-24 lg:py-32">
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

        <div className="relative mt-10 sm:mt-14">
          <Reveal direction="scale" className="lg:w-[74%]">
            <Browser tela="medidas" />
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
