import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import Browser from "../devices/Browser";
import Phone from "../devices/Phone";
import Titulo from "../ui/Titulo";

/**
 * Conceito: cada público no seu lado da tela e, no meio, o que circula entre eles.
 * Duas setas com o fluxo real de dados (painel → app e app → painel).
 */
const QUEM_TREINA = [
  "Segue os treinos e registra as séries",
  "Anota refeições, calorias e água",
  "Acompanha a própria evolução",
];

const QUEM_ACOMPANHA = [
  "Cadastra e organiza os alunos",
  "Monta treino, dieta e avaliação física",
  "Vê quem está treinando e quem parou",
];

function Lista({ itens }: { itens: string[] }) {
  return (
    <ul className="mt-5 divide-y divide-line border-y border-line">
      {itens.map((t) => (
        <li key={t} className="flex items-center gap-3 py-3 text-sm text-ink sm:text-base">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Fluxo({ sentido, texto }: { sentido: "direita" | "esquerda"; texto: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="relative flex w-full items-center">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/50 bg-bg text-accent">
            {sentido === "esquerda" ? (
              <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
            ) : (
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            )}
          </span>
        </span>
      </div>
      <p className="max-w-[18ch] text-xs leading-snug text-ink-muted">{texto}</p>
    </div>
  );
}

export default function DuasExperiencias() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Titulo
          rotulo="Como se encaixam"
          titulo="Quem treina usa o app. Quem acompanha usa o painel."
          apoio="As duas pontas leem e escrevem no mesmo lugar. Por isso nada se perde no meio do caminho."
        />

        <div className="mt-16 grid items-end gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,1.4fr)_minmax(0,6.6fr)] lg:gap-6">
          {/* Quem treina */}
          <Reveal direction="left" className="flex flex-col">
            <p className="eyebrow">No celular</p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Quem treina</h3>
            <Lista itens={QUEM_TREINA} />
            <div className="mt-10 flex justify-center lg:justify-start">
              <Phone tela="treinos" className="w-[62%] max-w-[260px] lg:w-[80%]" sizes="(min-width: 1024px) 260px, 60vw" brilho />
            </div>
          </Reveal>

          {/* O que circula */}
          <Reveal delay={200} className="flex flex-row items-center justify-center gap-6 lg:mb-[18%] lg:flex-col lg:gap-14">
            <Fluxo sentido="esquerda" texto="Treino e dieta publicados chegam no app" />
            <Fluxo sentido="direita" texto="Treino concluído aparece para o profissional" />
          </Reveal>

          {/* Quem acompanha */}
          <Reveal direction="right" delay={100} className="flex flex-col">
            <p className="eyebrow">No computador</p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Quem acompanha</h3>
            <Lista itens={QUEM_ACOMPANHA} />
            <Browser tela="alunos" className="mt-10" sizes="(min-width: 1024px) 680px, 92vw" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
