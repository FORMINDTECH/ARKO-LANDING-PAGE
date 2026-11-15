import { Check } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import BrowserFrame from "../devices/BrowserFrame";
import Phone from "../devices/Phone";

const PASSOS = [
  { titulo: "Convide", texto: "Envie o seu código de convite. O aluno baixa o app e já entra vinculado a você." },
  { titulo: "Prescreva", texto: "Monte treino e dieta no painel, do zero ou a partir de um modelo." },
  { titulo: "O aluno executa", texto: "No app, ele segue o treino com timer, registra as refeições e mantém a sequência." },
  { titulo: "Você acompanha", texto: "Treinos concluídos, medidas e conversas voltam para o painel." },
];

export default function PainelParaApp() {
  return (
    <section id="app-do-aluno" aria-labelledby="fluxo-titulo" className="relative overflow-hidden bg-bg-2/70 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">Do painel para o app</p>
              <h2 id="fluxo-titulo" className="mt-4 text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
                Você publica. O aluno recebe na hora.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
                Seus alunos usam o mesmo app de quem treina por conta própria, com a sua prescrição dentro.
              </p>
            </Reveal>
            <ol className="mt-10 flex flex-col">
              {PASSOS.map((p, i) => (
                <Reveal as="li" key={p.titulo} delay={i * 90} className="relative flex gap-5 pb-7 last:pb-0">
                  {i < PASSOS.length - 1 ? <span aria-hidden className="absolute left-[17px] top-10 h-[calc(100%-2.5rem)] w-px bg-line-strong" /> : null}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface font-data text-sm font-semibold text-ink">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <p className="font-bold">{p.titulo}</p>
                    <p className="mt-1 max-w-sm leading-relaxed text-ink-muted">{p.texto}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal direction="scale" className="relative pb-24 sm:pb-16 lg:pb-0">
            <div className="lg:mr-24">
              <BrowserFrame tela="treinos" sizes="(min-width: 1024px) 720px, 95vw" />
            </div>
            {/* arco de envio */}
            <svg viewBox="0 0 300 200" className="pointer-events-none absolute right-[18%] top-[26%] hidden w-[34%] overflow-visible sm:block" aria-hidden>
              <path d="M10 20 C 120 0, 240 60, 280 180" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeDasharray="5 7" strokeLinecap="round" />
              <circle r="5" fill="var(--c-accent)">
                <animateMotion dur="2.6s" repeatCount="3" path="M10 20 C 120 0, 240 60, 280 180" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" fill="freeze" />
              </circle>
            </svg>
            <div className="absolute -bottom-2 right-2 w-[150px] rotate-[4deg] sm:right-0 sm:w-[190px] lg:-bottom-10 lg:right-0 lg:w-[210px]">
              <Phone tela="treinos" sizes="210px" />
            </div>
            <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold sm:bottom-6 lg:-bottom-6 lg:left-10" style={{ boxShadow: "var(--shadow-float)" }}>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              Treino novo no app da Mariana
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
