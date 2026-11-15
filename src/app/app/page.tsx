import type { Metadata } from "next";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Faq, { type Pergunta } from "@/components/Faq";
import Depoimentos from "@/components/Depoimentos";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import AppHero from "@/components/app/AppHero";
import TourApp from "@/components/app/TourApp";
import DiaComArko from "@/components/app/DiaComArko";
import PlanosApp from "@/components/app/PlanosApp";
import CtaFinalApp from "@/components/app/CtaFinalApp";
import { DEPOIMENTOS_APP } from "@/content/depoimentos";
import { DIAS_TESTE_GRATIS, PLANOS_INDEPENDENTE, brl } from "@/lib/precos";
import { ROTAS, SUPORTE_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "App para quem treina por conta própria",
  description:
    "Monte seus treinos, registre a alimentação com leitor de código de barras, acompanhe a evolução da carga e receba relatórios gerados por IA. 7 dias grátis.",
  alternates: { canonical: ROTAS.app },
};

const mensal = PLANOS_INDEPENDENTE[0];
const anual = PLANOS_INDEPENDENTE[3];

const PERGUNTAS: Pergunta[] = [
  {
    pergunta: "Preciso de um personal ou nutricionista para usar?",
    resposta:
      "Não. Você monta os seus treinos, define as suas metas de alimentação e acompanha a sua evolução sozinho. Se um dia quiser acompanhamento, dá para encontrar um profissional na vitrine do app.",
  },
  {
    pergunta: "Quanto custa?",
    resposta: `Os primeiros ${DIAS_TESTE_GRATIS} dias têm tudo liberado e não são cobrados. Depois, o básico continua grátis e o Premium custa R$ ${brl(mensal.preco)} por mês, ou R$ ${brl(anual.preco)} por ano.`,
  },
  {
    pergunta: "O que a IA faz no app?",
    resposta:
      "Ela gera relatórios da sua evolução: a partir dos seus treinos, da alimentação e das medidas do período, escreve uma análise com destaques, pontos de atenção e recomendações, num PDF. A análise não substitui a orientação de um profissional.",
  },
  {
    pergunta: "Recebi um código de convite. Como uso?",
    resposta:
      "Na escolha de plano, toque em \"Sou aluno de um profissional\" e digite o código. Enquanto a vaga do seu profissional estiver ativa, você usa o app sem pagar nada.",
  },
  {
    pergunta: "Como cancelo a assinatura?",
    resposta: "A assinatura é feita pela App Store ou pelo Google Play, e o cancelamento também: direto na loja, quando você quiser.",
  },
  {
    pergunta: "Posso apagar a minha conta?",
    resposta: `Sim. Nas configurações do app você exclui a conta e os seus dados a qualquer momento. Se precisar de ajuda, escreva para ${SUPORTE_EMAIL}.`,
  },
];

export default function AppPage() {
  return (
    <>
      <SiteHeader
        nav={[
          { label: "O app", href: "#experiencia" },
          { label: "Seu dia", href: "#beneficios" },
          { label: "Planos", href: "#planos" },
          { label: "Dúvidas", href: "#faq" },
        ]}
        trocar={{ label: "Sou profissional", href: ROTAS.profissionais }}
        cta={{ label: "Baixar o app", href: "#baixar" }}
      />
      <main className="flex-1">
          <AppHero />
          <TourApp />
          <DiaComArko />
          <Depoimentos itens={DEPOIMENTOS_APP} id="depoimentos-app" />
          <PlanosApp />
          <section id="faq" aria-labelledby="faq-titulo" className="py-20 sm:py-28">
            <Container>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <Reveal>
                  <p className="eyebrow">Dúvidas</p>
                  <h2 id="faq-titulo" className="mt-4 text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
                    Antes de baixar
                  </h2>
                  <p className="mt-5 max-w-sm leading-relaxed text-ink-muted">
                    Não achou a sua pergunta? Escreva para{" "}
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
          <CtaFinalApp />
      </main>
      <SiteFooter />
    </>
  );
}
