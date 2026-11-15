import Image from "next/image";
import Container from "../Container";
import Reveal from "../Reveal";
import BotoesLoja from "./BotoesLoja";
import { DIAS_TESTE_GRATIS } from "@/lib/precos";

/** Fechamento: o mascote do app (o mesmo da tela inicial) chamando para baixar. */
export default function CtaApp() {
  return (
    <section id="baixar" className="relative scroll-mt-24 py-16 sm:py-24">
      <Container>
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[32px] bg-surface-2 px-7 py-14 sm:px-14 sm:py-20">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <h2 className="max-w-[16ch] text-[2rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                  Pronto pro treino<span className="text-accent">?</span>
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
                  Baixe o app, monte seu primeiro treino e use tudo por {DIAS_TESTE_GRATIS} dias sem pagar nada.
                </p>
                <BotoesLoja className="mt-9" />
              </div>
              <Image
                src="/brand/mascote/treinando.webp"
                alt="Mascote do ARKO segurando um haltere"
                width={336}
                height={330}
                className="flutuar mx-auto w-[200px] sm:w-[260px]"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
