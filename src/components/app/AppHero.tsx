import Container from "../Container";
import Reveal from "../Reveal";
import Drift from "../Drift";
import Phone from "../devices/Phone";
import Recorte from "../devices/Recorte";
import BotoesLoja from "./BotoesLoja";
import { DIAS_TESTE_GRATIS } from "@/lib/precos";

/**
 * Conceito: o celular como palco. Um aparelho principal com a tela inicial, dois atrás em
 * profundidade (treinos e alimentação) e dois pedaços reais de outras telas soltos na frente
 * (o gráfico de carga e uma refeição), que mostram o que não cabe na tela inicial.
 * Cada camada anda num ritmo diferente na rolagem.
 */
export default function AppHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] h-[700px] w-[700px] -translate-x-[10%] rounded-full bg-accent/15 blur-[130px]"
      />
      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
          <Reveal direction="left" className="relative z-10 max-w-xl">
            <p className="eyebrow">App ARKO · para quem treina</p>
            <h1 className="mt-6 text-[2.35rem] font-extrabold leading-[1.02] tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.5rem]">
              Seu treino, sua dieta e sua evolução. <span className="text-accent">No bolso.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
              Organize os treinos, registre as refeições e veja a carga subir semana a semana. Sozinho ou com o seu
              profissional, se você quiser.
            </p>
            <BotoesLoja className="mt-9" />
            <p className="mt-4 text-sm text-ink-muted">
              <span className="font-data text-ink">{DIAS_TESTE_GRATIS} dias</span> grátis para testar tudo.
            </p>
          </Reveal>

          <Reveal delay={150} direction="scale" className="relative mx-auto w-full max-w-[560px]">
            <div className="relative mx-auto aspect-[1/1.1] w-full">
              {/* atrás, à esquerda */}
              <Drift y={30} rotate={-1.5} className="absolute left-[2%] top-[12%] w-[38%]">
                <Phone tela="treinos" className="w-full -rotate-[8deg] opacity-90" sizes="(min-width: 1024px) 210px, 36vw" />
              </Drift>
              {/* atrás, à direita */}
              <Drift y={44} rotate={1.5} className="absolute right-[2%] top-[16%] w-[38%]">
                <Phone tela="alimentacao" className="w-full rotate-[8deg] opacity-90" sizes="(min-width: 1024px) 210px, 36vw" />
              </Drift>
              {/* principal */}
              <Drift y={-20} className="absolute left-[26%] top-0 z-10 w-[48%]">
                <Phone tela="inicio" eager className="w-full" sizes="(min-width: 1024px) 270px, 46vw" brilho />
              </Drift>
              {/* recortes na frente */}
              <Drift y={-60} className="absolute -left-[4%] bottom-[6%] z-20 w-[50%] sm:-left-[10%]">
                <div className="flutuar">
                  <Recorte nome="carga" sizes="(min-width: 1024px) 270px, 46vw" eager />
                </div>
              </Drift>
              <Drift y={-40} className="absolute -right-[4%] bottom-[34%] z-20 w-[46%] sm:-right-[10%]">
                <div className="flutuar-lento">
                  <Recorte nome="refeicao" sizes="(min-width: 1024px) 250px, 42vw" eager />
                </div>
              </Drift>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
