import { ArrowRight } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import Drift from "../Drift";
import Browser from "../devices/Browser";
import Phone from "../devices/Phone";
import { PAINEL_CADASTRO_URL } from "@/lib/links";

/**
 * Conceito: o painel em escala de mesa de trabalho. Texto em cima, o dashboard real ocupando a
 * largura toda logo abaixo, inclinado para trás, e que "deita" de frente conforme a página rola.
 * O celular encostado na borda é o app do próprio profissional: o painel também vai no bolso.
 */
export default function ProHero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[45%] h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-accent/12 blur-[140px]"
      />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
          <Reveal direction="left">
            <p className="eyebrow">Painel ARKO · para profissionais</p>
            <h1 className="mt-6 max-w-[18ch] text-[2.35rem] font-extrabold leading-[1.02] tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.6rem]">
              Seus alunos, treinos e dietas <span className="text-accent">num painel só</span>.
            </h1>
          </Reveal>
          <Reveal delay={120} className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink-muted">
              Monte treino e dieta, registre avaliações e veja quem está treinando. O que você publica chega no app do
              aluno. Sem planilha e sem WhatsApp perdido.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={PAINEL_CADASTRO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
              >
                Criar minha conta
                <ArrowRight className="seta h-4 w-4" strokeWidth={2.25} />
              </a>
              <a
                href="#planos"
                className="btn-secondary inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold"
              >
                Ver planos
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} direction="scale" className="relative mt-16 sm:mt-20">
          <Drift tilt={14} className="origin-bottom">
            <Browser tela="dashboard" eager sizes="(min-width: 1280px) 1216px, 96vw" />
          </Drift>
          <Drift y={-50} className="absolute -bottom-8 -right-2 w-[24%] max-w-[230px] sm:-bottom-12 sm:right-[3%]">
            <Phone tela="proInicio" eager brilho />
          </Drift>
        </Reveal>
      </Container>
    </section>
  );
}
