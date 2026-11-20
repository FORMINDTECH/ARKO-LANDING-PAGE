import { ArrowDown, ArrowRight } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import Drift from "../Drift";
import Logo from "../Logo";
import Browser from "../devices/Browser";
import Phone from "../devices/Phone";
import MascoteAnimado from "../MascoteAnimado";

/**
 * Hero da página inicial. O texto explica o que o ARKO faz (treino, alimentação e evolução);
 * a composição mostra o produto real: o painel grande ao fundo e o app na frente.
 */
export default function HeroInicio() {
  return (
    <section className="relative overflow-hidden pb-12 pt-24 sm:pb-28 sm:pt-40 lg:min-h-[100svh] lg:pb-24">
      {/* luz âmbar atrás da composição, como o brilho de LED da splash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[640px] w-[820px] rounded-full bg-accent/15 blur-[120px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-8 sm:gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-4">
          <Reveal direction="left" className="relative z-10 max-w-xl">
            {/* no celular o logo já está no cabeçalho, logo acima: aparece só a partir de 640 px */}
            <div className="hidden sm:block">
              <Logo className="h-14 w-auto" eager />
            </div>
            <h1 className="sm:mt-7 text-[2.35rem] font-extrabold leading-[1.02] tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.5rem]">
              Treino, dieta e evolução <span className="text-accent">no mesmo app</span>.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:mt-6 sm:text-lg">
              O ARKO organiza os seus treinos, registra o que você come e mostra a sua evolução semana a semana: carga,
              frequência e os músculos que você mais treinou.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <a
                href="#escolha"
                className="btn-accent group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
              >
                Começar agora
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2.25} />
              </a>
              <a
                href="#produto"
                className="btn-secondary group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
              >
                Ver por dentro
                <ArrowRight className="seta h-4 w-4" strokeWidth={2.25} />
              </a>
            </div>
          </Reveal>

          {/* Composição: painel grande ao fundo, celular na frente e o mascote no canto */}
          <Reveal delay={150} direction="right" className="relative">
            <div className="relative mx-auto max-w-[680px] pb-[14%] pl-[24%] sm:pb-[10%] sm:pl-[10%] lg:mr-[-22%] lg:max-w-none">
              <Drift y={-24}>
                {/* no celular, recorte com a atividade dos alunos (telas.ts) */}
                <Browser tela="dashboard" eager />
              </Drift>

              <Drift y={36} className="absolute bottom-0 left-0 w-[34%] max-w-[230px] sm:w-[22%]">
                <Phone tela="inicio" eager brilho />
              </Drift>

              {/* o mascote de óculos, encostado no canto do painel, já recebe quem chega */}
              <Drift y={-40} className="absolute bottom-0 right-0 sm:-bottom-[6%] z-10 w-[26%] max-w-[200px] sm:right-[2%] sm:w-[20%] lg:right-[24%] lg:w-[15%]">
                <MascoteAnimado
                  video="/brand/mascote/oculos-brilho.webm"
                  poster="/brand/mascote/oculos-brilho.webp"
                  largura={638}
                  altura={864}
                  alt="Mascote do ARKO de óculos escuros"
                />
              </Drift>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
