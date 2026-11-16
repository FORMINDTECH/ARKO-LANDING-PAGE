import Container from "../Container";
import Reveal from "../Reveal";
import BotoesLoja from "./BotoesLoja";
import MascoteAnimado from "../MascoteAnimado";
import { DIAS_TESTE_GRATIS } from "@/lib/precos";

/** Fechamento: o mascote do app, animado (óculos com brilho), chamando para baixar. */
export default function CtaApp() {
  return (
    <section id="baixar" className="relative scroll-mt-24 py-16 sm:py-24">
      <Container>
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[32px] bg-surface-2 px-6 py-12 sm:px-14 sm:py-20">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
            {/* no celular, o mascote fica pequeno no canto de cima, ao lado do título */}
            <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="relative">
                <h2 className="max-w-[9ch] pr-24 text-[2rem] font-extrabold sm:max-w-[16ch] sm:pr-0 lg:pr-0 leading-[1.05] tracking-tight text-ink sm:text-5xl">
                  Pronto pro treino<span className="text-accent">?</span>
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
                  Baixe o app, monte seu primeiro treino e use tudo por {DIAS_TESTE_GRATIS} dias sem pagar nada.
                </p>
                <BotoesLoja className="mt-9" />
              </div>
              <div className="absolute -right-2 -top-6 w-[96px] sm:static sm:mx-auto sm:w-[240px]">
                <MascoteAnimado
                  video="/brand/mascote/oculos-brilho.webm"
                  poster="/brand/mascote/oculos-brilho.webp"
                  largura={638}
                  altura={864}
                  alt="Mascote do ARKO de óculos escuros"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
