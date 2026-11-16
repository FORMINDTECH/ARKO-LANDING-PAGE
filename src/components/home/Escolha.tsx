import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import Browser from "../devices/Browser";
import Phone from "../devices/Phone";
import Titulo from "../ui/Titulo";
import { ROTAS } from "@/lib/links";

/**
 * Seleção de público. Duas portas do mesmo tamanho. O produto de cada lado aparece numa
 * janela recortada na base da porta (nunca passa por cima do texto). No hover, a porta cresce
 * em direção à vizinha e a sobrepõe um pouco; a porta inteira é o link.
 */
const PORTAS = [
  {
    href: ROTAS.app,
    para: "Para quem treina",
    titulo: "Quero organizar a minha rotina.",
    tituloCurto: "Organizar minha rotina",
    texto: "Uma forma mais simples de organizar treinos, alimentação e evolução num só lugar.",
    cta: "Conhecer o app",
    visual: "app" as const,
    // no hover, desliza em direção ao cartão do lado
    sentido: 1,
  },
  {
    href: ROTAS.profissionais,
    para: "Para profissionais",
    titulo: "Sou profissional de educação física ou nutrição.",
    tituloCurto: "Sou profissional",
    texto: "Organize seus alunos, monte os planos de cada um e acompanhe a evolução numa plataforma integrada.",
    cta: "Conhecer o painel",
    visual: "painel" as const,
    sentido: -1,
  },
];

export default function Escolha() {
  return (
    <section className="relative py-14 sm:py-24 lg:py-32">
      {/* âncora do "Começar agora": o bloco título + cartões fica centralizado na tela */}
      <Container>
        <div id="escolha" data-centralizar="">
          <Titulo centro className="lg:max-w-4xl" rotulo="Sua experiência" titulo="Como você quer usar o ARKO?" />

          {/*
            Celular: um abaixo do outro, compactos (título curto e seta na mesma linha, janela do produto
            baixa), para os dois caberem juntos na tela. A partir de 768 px: lado a lado, completos.
          */}
          <div className="portas mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 lg:gap-5">
            {PORTAS.map((p, i) => (
              <Reveal key={p.href} delay={i * 120} direction="scale" className="relative h-full">
                <Link
                  href={p.href}
                  className="porta group relative flex h-full flex-col overflow-hidden rounded-[22px] border-2 border-transparent bg-surface-2 p-4 focus-visible:outline-none sm:rounded-[28px] sm:p-9"
                  style={{ "--sentido": p.sentido } as React.CSSProperties}
                >
                  {/* luz que acende no hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-full bg-accent/0 blur-3xl transition-colors duration-[900ms] group-hover:bg-accent/15"
                  />

                  {/* cabeçalho compacto (celular) */}
                  <div className="flex items-center justify-between gap-3 sm:hidden">
                    <div>
                      <p className="eyebrow !text-[0.6rem] !tracking-[0.14em]">{p.para}</p>
                      <h3 className="mt-1.5 text-[1.05rem] font-extrabold leading-tight tracking-tight text-ink">{p.tituloCurto}</h3>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[#0b0b0c]">
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                      <span className="sr-only">{p.cta}</span>
                    </span>
                  </div>

                  {/* cabeçalho completo (a partir de 640 px) */}
                  <div className="hidden sm:block">
                    <p className="eyebrow">{p.para}</p>
                    <h3 className="mt-4 max-w-[19ch] text-[1.8rem] font-extrabold leading-[1.1] tracking-tight text-ink">{p.titulo}</h3>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-muted">{p.texto}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors duration-500 group-hover:text-accent">
                      {p.cta}
                      <ArrowRight className="seta h-4 w-4" strokeWidth={2.25} />
                    </span>
                  </div>

                  {/* janela do produto: recortada, o aparelho só se move aqui dentro */}
                  <div
                    aria-hidden
                    className="relative mt-3 h-[150px] overflow-hidden rounded-xl bg-bg/60 ring-1 ring-line sm:mt-8 sm:h-[240px] sm:rounded-2xl lg:h-[clamp(130px,calc(100svh_-_580px),250px)] [@media(min-width:1024px)_and_(max-height:700px)]:hidden"
                  >
                    {p.visual === "app" ? (
                      <div className="absolute left-1/2 top-4 w-[130px] -translate-x-1/2 transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:-translate-y-2 sm:top-8 sm:w-[210px] lg:w-[240px]">
                        <Phone tela="treinos" ampliar={false} />
                      </div>
                    ) : (
                      <div className="absolute inset-x-4 top-4 transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:-translate-y-2 sm:inset-x-6 sm:top-8">
                        <Browser tela="alunos" ampliar={false} />
                      </div>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
