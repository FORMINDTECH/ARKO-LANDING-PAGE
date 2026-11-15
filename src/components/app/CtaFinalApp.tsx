import Image from "next/image";
import Container from "../Container";
import Reveal from "../Reveal";
import BotoesLoja from "./BotoesLoja";
import { DIAS_TESTE_GRATIS } from "@/lib/precos";

export default function CtaFinalApp() {
  return (
    <section id="baixar" aria-labelledby="baixar-titulo" className="relative px-3 pb-16 pt-6 sm:px-5 sm:pb-24">
      <Reveal
        direction="scale"
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-carbono ring-white/10 dark:ring-1 px-6 py-16 text-giz sm:px-12 sm:py-20 lg:py-24"
      >
        <div className="glow left-1/2 top-full h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(closest-side, rgba(253,130,15,0.4), transparent)" }} aria-hidden />
        <Container className="relative !px-0">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-data text-xs font-semibold uppercase tracking-[0.14em] text-accent">Seu próximo treino começa aqui</p>
              <h2 id="baixar-titulo" className="mt-5 text-[2.4rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-6xl">
                Bora treinar hoje?
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-giz/70">
                Baixe o Arko e use tudo liberado por {DIAS_TESTE_GRATIS} dias. Sem cobrança no teste.
              </p>
              <BotoesLoja tom="escuro" className="mt-8" />
            </div>
            <div className="relative mx-auto w-[200px] sm:w-[260px]">
              <Image
                src="/brand/mascote/dando-oi.webp"
                alt="Mascote do Arko acenando"
                width={336}
                height={330}
                sizes="260px"
                className="h-auto w-full drop-shadow-[0_30px_40px_rgba(253,130,15,0.35)]"
              />
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
