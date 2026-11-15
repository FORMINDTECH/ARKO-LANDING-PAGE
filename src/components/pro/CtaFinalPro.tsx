import { ArrowRight } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import Recorte from "../devices/Recorte";
import { PAINEL_CADASTRO_URL, PAINEL_LOGIN_URL } from "@/lib/links";

export default function CtaFinalPro() {
  return (
    <section aria-labelledby="cta-pro-titulo" className="relative px-3 pb-16 pt-6 sm:px-5 sm:pb-24">
      <Reveal direction="scale" className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-carbono ring-white/10 dark:ring-1 px-6 py-16 text-giz sm:px-12 sm:py-20 lg:py-24">
        <div className="glow left-[30%] top-full h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(closest-side, rgba(253,130,15,0.38), transparent)" }} aria-hidden />
        <Container className="!px-0">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-data text-xs font-semibold uppercase tracking-[0.14em] text-accent">Comece hoje</p>
              <h2 id="cta-pro-titulo" className="mt-5 max-w-2xl text-[2.3rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-6xl">
                Seu próximo aluno pode entrar hoje.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-giz/70">
                Crie a conta, mande o código de convite e monte o primeiro treino. O aluno recebe tudo no app.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={PAINEL_CADASTRO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                  Criar minha conta
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </a>
                <a href={PAINEL_LOGIN_URL} target="_blank" rel="noopener noreferrer" className="btn border border-white/20 text-giz hover:border-white/60">
                  Já tenho conta
                </a>
              </div>
            </div>
            <div className="relative mx-auto hidden w-[300px] rotate-[3deg] sm:block lg:w-[340px]">
              <Recorte nome="atividade" sizes="340px" rotulo="Atividade dos alunos" />
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
