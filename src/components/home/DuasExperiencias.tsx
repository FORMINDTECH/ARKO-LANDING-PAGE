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

function Fluxo({ sentido, rotulo, texto }: { sentido: "direita" | "esquerda"; rotulo: string; texto: string }) {
  return (
    <div className="flex w-full max-w-[220px] flex-col items-center gap-3 text-center">
      <div className="relative flex h-11 w-full items-center">
        <span className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-accent/10 via-accent to-accent/10" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-[#0b0b0c] shadow-[0_0_0_6px_rgba(253,130,15,0.15)]">
            {sentido === "esquerda" ? (
              <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
            ) : (
              <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
            )}
          </span>
        </span>
      </div>
      <p className="font-data text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{rotulo}</p>
      <p className="text-sm font-medium leading-snug text-ink sm:text-[15px]">{texto}</p>
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

        {/*
          Desktop: duas linhas alinhadas. Em cima, os textos dos dois lados (mesmo topo);
          embaixo, celular, setas e painel centralizados na mesma altura.
          Celular: cada lado empilhado (texto e aparelho), com as setas entre eles.
        */}
        <div className="mt-16 grid gap-x-6 gap-y-10 lg:grid-cols-[minmax(0,3.6fr)_minmax(0,2fr)_minmax(0,6.4fr)] lg:gap-y-12">
          {/* Quem treina: texto */}
          <Reveal direction="left" className="lg:col-start-1 lg:row-start-1">
            <p className="eyebrow">No celular</p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Quem treina</h3>
            <Lista itens={QUEM_TREINA} />
          </Reveal>

          {/* Quem treina: celular */}
          <Reveal direction="left" delay={80} className="flex justify-center lg:col-start-1 lg:row-start-2 lg:items-center">
            <Phone tela="treinos" className="w-[56%] max-w-[210px]" brilho />
          </Reveal>

          {/* O que circula entre os dois, no meio da linha dos aparelhos */}
          <Reveal
            delay={200}
            className="flex flex-row items-center justify-center gap-6 lg:col-start-2 lg:row-start-2 lg:flex-col lg:gap-14"
          >
            <Fluxo sentido="esquerda" rotulo="Painel → App" texto="Treino e dieta publicados chegam no app" />
            <Fluxo sentido="direita" rotulo="App → Painel" texto="Treino concluído aparece para o profissional" />
          </Reveal>

          {/* Quem acompanha: texto */}
          <Reveal direction="right" delay={100} className="lg:col-start-3 lg:row-start-1">
            <p className="eyebrow">No computador</p>
            <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Quem acompanha</h3>
            <Lista itens={QUEM_ACOMPANHA} />
          </Reveal>

          {/* Quem acompanha: painel */}
          <Reveal direction="right" delay={180} className="flex items-center lg:col-start-3 lg:row-start-2">
            <Browser tela="alunos" className="w-full" sizes="(min-width: 1024px) 680px, 92vw" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
