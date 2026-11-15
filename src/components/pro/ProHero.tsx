import { ViewTransition } from "react";
import { ArrowRight } from "lucide-react";
import Container from "../Container";
import BrowserFrame from "../devices/BrowserFrame";
import Recorte from "../devices/Recorte";
import Phone from "../devices/Phone";
import InclinaAoRolar from "./InclinaAoRolar";
import { PAINEL_CADASTRO_URL } from "@/lib/links";
import { TIERS_PERSONAL_NUTRI, brl } from "@/lib/precos";

export default function ProHero() {
  const entrada = TIERS_PERSONAL_NUTRI[0];
  return (
    <section aria-labelledby="pro-titulo" className="relative overflow-hidden pb-10 pt-28 sm:pt-36">
      <div className="page-atmosphere" aria-hidden>
        <div className="glow left-1/2 top-[-200px] h-[640px] w-[1200px] -translate-x-1/2" />
      </div>
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow">Para nutricionistas, personal trainers e consultorias</p>
          <h1 id="pro-titulo" className="mt-5 text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-[3.6rem] lg:text-[4.1rem]">
            Todos os seus alunos.
            <br />
            <span className="mark-arc">Um painel</span> só.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[1.08rem] leading-relaxed text-ink-muted sm:text-lg">
            Monte treinos e dietas, acompanhe a avaliação física e converse com cada aluno sem sair do Arko. O que você publica no painel chega na hora no app deles.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={PAINEL_CADASTRO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full sm:w-auto">
              Criar minha conta
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </a>
            <a href="#planos" className="btn btn-ghost w-full sm:w-auto">
              Ver planos
            </a>
          </div>
          <p className="mt-5 text-sm text-ink-muted">
            A partir de R$ {brl(entrada.preco)} por mês com {entrada.vagas} vagas · sem fidelidade · o aluno vinculado não paga nada
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl sm:mt-16">
          <InclinaAoRolar>
            <div>
              <ViewTransition name="painel-hero" share="morph" default="none">
                <BrowserFrame tela="dashboard" priority sizes="(min-width: 1280px) 1150px, 95vw" />
              </ViewTransition>
            </div>
          </InclinaAoRolar>
          <div className="pointer-events-none absolute -left-4 top-[58%] hidden w-[240px] -rotate-[3deg] lg:block xl:-left-16">
            <div className="animate-float">
              <Recorte nome="convite" sizes="260px" rotulo="Código de convite" />
            </div>
          </div>
          <div className="pointer-events-none absolute -right-4 top-[6%] hidden w-[220px] rotate-[3deg] md:block xl:-right-12">
            <div className="animate-float-slow">
              <Recorte nome="vagas" sizes="220px" rotulo="Vagas em uso" />
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-8 -right-1 w-[92px] rotate-[6deg] sm:w-[150px] md:-right-6 lg:w-[180px] xl:-right-16">
            <Phone tela="treinos" sizes="180px" />
            <p className="mt-3 hidden text-center font-data text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted sm:block">
              No app do aluno
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
