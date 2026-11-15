import { ArrowRight } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import { PainelImagem } from "../devices/Browser";
import { PAINEL_CADASTRO_URL, PAINEL_LOGIN_URL } from "@/lib/links";

/** Fechamento: o painel de alunos ao fundo, esmaecido, e o convite para criar a conta. */
export default function CtaPro() {
  return (
    <section id="comecar" className="relative scroll-mt-24 py-16 sm:py-24">
      <Container>
        <Reveal direction="scale">
          <div className="relative isolate overflow-hidden rounded-[32px] bg-surface-2 px-7 py-16 sm:px-14 sm:py-24">
            <div aria-hidden className="absolute -right-[20%] top-[18%] -z-10 w-[85%] rotate-[-4deg] opacity-35 sm:-right-[8%] sm:w-[62%]">
              <PainelImagem tela="dashboard" sizes="800px" className="rounded-xl" />
            </div>
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-surface-2 via-surface-2/90 to-transparent" />

            <h2 className="max-w-[17ch] text-[2rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Seu próximo aluno já pode chegar organizado<span className="text-accent">.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
              Crie sua conta, pegue o seu código de convite e mande para o primeiro aluno hoje.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
                href={PAINEL_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold"
              >
                Já tenho conta
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
