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
    texto: "Uma forma mais simples de organizar treinos, alimentação e evolução num só lugar.",
    cta: "Conhecer o app",
    visual: "app" as const,
    // cresce para a direita (em direção ao cartão do lado)
    origem: "lg:origin-left",
  },
  {
    href: ROTAS.profissionais,
    para: "Para profissionais",
    titulo: "Sou profissional de educação física ou nutrição.",
    texto: "Organize seus alunos, monte os planos de cada um e acompanhe a evolução numa plataforma integrada.",
    cta: "Conhecer o painel",
    visual: "painel" as const,
    origem: "lg:origin-right",
  },
];

export default function Escolha() {
  return (
    <section id="escolha" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Titulo centro rotulo="Sua experiência" titulo="Como você quer usar o ARKO?" />

        <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {PORTAS.map((p, i) => (
            <Reveal key={p.href} delay={i * 120} direction="scale" className="relative h-full has-[a:hover]:z-10 has-[a:focus-visible]:z-10">
              <Link
                href={p.href}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border-2 border-line/0 bg-surface-2 p-7 shadow-none transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04] hover:border-accent/60 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] focus-visible:scale-[1.04] focus-visible:border-accent focus-visible:outline-none sm:p-10 ${p.origem}`}
              >
                {/* luz que acende no hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/15"
                />

                <p className="eyebrow">{p.para}</p>
                <h3 className="mt-4 max-w-[17ch] text-[1.65rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[2rem]">
                  {p.titulo}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-muted">{p.texto}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                  {p.cta}
                  <ArrowRight className="seta h-4 w-4" strokeWidth={2.25} />
                </span>

                {/* janela do produto: recortada, o aparelho só se move aqui dentro */}
                <div
                  aria-hidden
                  className="relative mt-10 h-[300px] overflow-hidden rounded-2xl bg-bg/60 ring-1 ring-line sm:h-[340px]"
                >
                  {p.visual === "app" ? (
                    <div className="absolute left-1/2 top-8 w-[210px] -translate-x-1/2 transition-transform duration-700 ease-out group-hover:-translate-y-3 sm:w-[240px]">
                      <Phone tela="treinos" />
                    </div>
                  ) : (
                    <div className="absolute inset-x-6 top-8 transition-transform duration-700 ease-out group-hover:-translate-y-3 sm:inset-x-8">
                      <Browser tela="alunos" sizes="(min-width: 1024px) 560px, 90vw" />
                    </div>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
