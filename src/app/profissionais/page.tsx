import type { Metadata } from "next";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Faq, { type Pergunta } from "@/components/Faq";
import Depoimentos from "@/components/Depoimentos";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import ProHero from "@/components/pro/ProHero";
import RecursosPainel from "@/components/pro/RecursosPainel";
import PainelParaApp from "@/components/pro/PainelParaApp";
import PlanosPro from "@/components/pro/PlanosPro";
import CtaFinalPro from "@/components/pro/CtaFinalPro";
import { DEPOIMENTOS_PROFISSIONAIS } from "@/content/depoimentos";
import { PAINEL_CADASTRO_URL, ROTAS, SUPORTE_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Para nutricionistas, personal trainers e consultorias",
  description:
    "Painel web para montar treinos e dietas, acompanhar avaliação física e conversar com os alunos. Você paga por vaga e o aluno usa o app sem custo.",
  alternates: { canonical: ROTAS.profissionais },
};

const PERGUNTAS: Pergunta[] = [
  {
    pergunta: "Como funciona o modelo de vagas?",
    resposta:
      "Você contrata vagas no painel. Cada vaga dá a um aluno acesso completo ao app por 30 dias, sem custo para ele. O preço por vaga cai conforme a quantidade, e a consultoria (que monta treino e dieta) tem uma tabela própria.",
  },
  {
    pergunta: "O que acontece se eu não renovar?",
    resposta:
      "Você recebe um aviso 5 dias antes do vencimento. Sem renovação, o aluno ainda tem 7 dias de carência. Depois disso, ele perde os recursos Premium do app até você renovar ou ele assinar um plano próprio.",
  },
  {
    pergunta: "Meu aluno precisa pagar alguma coisa?",
    resposta: "Não. Enquanto ele estiver vinculado a você com uma vaga ativa, o app é gratuito para ele, com todos os recursos.",
  },
  {
    pergunta: "A IA monta o treino e a dieta pelos meus alunos?",
    resposta:
      "Não. Quem prescreve é você, pelo painel. A IA ajuda na leitura dos dados: o relatório de evolução em PDF pode vir com uma análise escrita a partir dos treinos, da alimentação e das medidas do aluno.",
  },
  {
    pergunta: "Também consigo usar pelo celular?",
    resposta:
      "Sim. O app do Arko tem um modo profissional para acompanhar os alunos, montar treinos e responder no chat. Para prescrever com calma, o painel web é o lugar mais confortável.",
  },
  {
    pergunta: "Como cancelo?",
    resposta:
      "No cartão, a contratação renova todo mês até você desativar a renovação. PIX e boleto valem por 30 dias e não renovam sozinhos. Você pode desistir de uma compra em até 7 dias, com devolução do valor, conforme o Código de Defesa do Consumidor.",
  },
];

export default function ProfissionaisPage() {
  return (
    <>
      <SiteHeader
        nav={[
          { label: "Painel", href: "#recursos" },
          { label: "Como funciona", href: "#app-do-aluno" },
          { label: "Planos", href: "#planos" },
          { label: "Dúvidas", href: "#faq" },
        ]}
        trocar={{ label: "Treino por conta própria", href: ROTAS.app }}
        cta={{ label: "Criar conta", href: PAINEL_CADASTRO_URL, externo: true }}
      />
      <main className="flex-1">
          <ProHero />
          <RecursosPainel />
          <PainelParaApp />
          <Depoimentos itens={DEPOIMENTOS_PROFISSIONAIS} id="depoimentos-pro" />
          <PlanosPro />
          <section id="faq" aria-labelledby="faq-titulo" className="py-20 sm:py-28">
            <Container>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <Reveal>
                  <p className="eyebrow">Dúvidas</p>
                  <h2 id="faq-titulo" className="mt-4 text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
                    Perguntas de quem atende
                  </h2>
                  <p className="mt-5 max-w-sm leading-relaxed text-ink-muted">
                    Ficou alguma dúvida? Escreva para{" "}
                    <a href={`mailto:${SUPORTE_EMAIL}`} className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                      {SUPORTE_EMAIL}
                    </a>
                    .
                  </p>
                </Reveal>
                <Reveal delay={100}>
                  <Faq itens={PERGUNTAS} />
                </Reveal>
              </div>
            </Container>
          </section>
          <CtaFinalPro />
      </main>
      <SiteFooter />
    </>
  );
}
