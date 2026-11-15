import Container from "../Container";
import Phone from "../devices/Phone";
import Titulo from "../ui/Titulo";
import { TELAS_APP, type TelaApp } from "../devices/telas";

/**
 * Conceito: a "película" do app inteiro. As telas reais passam sozinhas, num carrossel
 * contínuo (a faixa é duplicada e anda metade da largura antes de recomeçar, sem salto).
 * Pausa com o mouse em cima.
 *
 * A tela de calendário ficou de fora: o cartão "Desafios em grupo" vazio transborda no app
 * (altura fixa em ARKO-MOBILE/src/components/GruposDesafioCarousel.tsx). Volta quando corrigir.
 */
const ORDEM: TelaApp[] = ["inicio", "treinos", "treinoLista", "carga", "alimentacao", "musculos", "feed"];

function Faixa({ copia = false }: { copia?: boolean }) {
  return (
    <ul aria-hidden={copia || undefined} className="flex shrink-0 gap-6 pr-6 sm:gap-8 sm:pr-8">
      {ORDEM.map((t) => (
        <li key={t} className="w-[200px] shrink-0 sm:w-[240px]">
          <Phone tela={t} />
          <p className="mt-5 text-center font-data text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {TELAS_APP[t].rotulo}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function TodasAsTelas() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <Titulo
          centro
          rotulo="04 · O app inteiro"
          titulo="Cinco abas. Tudo o que o seu treino precisa."
          apoio="Treinos, calendário, início, feed e alimentação. Estas são as telas de verdade."
        />
      </Container>

      <div className="mascara-lados mt-16 overflow-hidden">
        <div className="esteira flex w-max">
          <Faixa />
          <Faixa copia />
        </div>
      </div>
    </section>
  );
}
