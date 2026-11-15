import Container from "../Container";
import Reveal from "../Reveal";
import Drift from "../Drift";
import Browser from "../devices/Browser";
import Phone from "../devices/Phone";
import Titulo from "../ui/Titulo";

/**
 * Conceito: a conversa entre as duas telas. O chat real do painel (com o treino concluído que a
 * aluna mandou do app) e o celular dela encostado, ligados por duas legendas de mão dupla.
 */
const VIAS = [
  { de: "Painel", para: "App", texto: "Treino, metas de dieta e desafios que você publica aparecem no app do aluno." },
  { de: "App", para: "Painel", texto: "Quando o aluno conclui um treino, o resumo com as séries feitas chega no seu chat." },
];

export default function Integracao() {
  return (
    <section id="integracao" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <Titulo
          centro
          rotulo="04 · Integrado ao app"
          titulo="Você no computador. O aluno no celular. A mesma conversa."
        />

        <div className="relative mx-auto mt-16 max-w-6xl">
          <Reveal direction="scale" className="pr-[18%] sm:pr-[22%]">
            <Browser tela="chat" />
          </Reveal>
          <Drift y={-50} className="absolute bottom-[-8%] right-0 w-[26%] max-w-[270px]">
            <Reveal delay={200} direction="right">
              <Phone tela="treinos" sizes="(min-width: 1024px) 270px, 26vw" brilho />
            </Reveal>
          </Drift>
        </div>

        <div className="mx-auto mt-24 grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-10">
          {VIAS.map((v, i) => (
            <Reveal key={v.de} delay={i * 120} className="border-t-2 border-accent pt-5">
              <p className="font-data text-xs font-semibold uppercase tracking-[0.16em] text-ink">
                {v.de} <span className="text-accent">→</span> {v.para}
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">{v.texto}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
