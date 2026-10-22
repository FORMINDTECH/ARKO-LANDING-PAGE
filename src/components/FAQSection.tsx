"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";

const FAQS = [
  {
    question: "Como funciona o modelo de vagas?",
    answer:
      "Você contrata vagas de aluno. Enquanto a vaga estiver ativa, o aluno vinculado usa o ARKO sem custo adicional. O preço escala por faixa: quanto mais vagas, menor o custo por vaga.",
  },
  {
    question: "O que acontece se eu não renovar as vagas?",
    answer:
      "O aluno recebe um aviso 5 dias antes do vencimento. Se a vaga não for renovada, ele tem 7 dias de carência antes de ser bloqueado e precisar assinar um plano próprio para continuar usando o app.",
  },
  {
    question: "A IA monta o treino e a dieta pelo aluno?",
    answer:
      "Não. Quem monta o treino e a dieta é você, pelo painel web. A IA entra depois, transformando a evolução e a adesão do aluno em relatórios prontos para você e para ele.",
  },
  {
    question: "Dá pra cancelar quando quiser?",
    answer:
      "Sim, sem contrato de fidelidade. Você também pode excluir sua conta a qualquer momento, conforme a LGPD.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bg py-16 sm:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Perguntas que você pode ter
            </h2>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-2 rounded-[24px] bg-surface-2 p-2">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.question}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`cursor-pointer rounded-2xl bg-surface p-5 transition-shadow ${
                    isOpen ? "shadow-sm" : "hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-semibold text-ink">
                      {faq.question}
                    </h3>
                    {isOpen ? (
                      <Minus className="h-5 w-5 shrink-0 text-accent" strokeWidth={2.25} />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-accent" strokeWidth={2.25} />
                    )}
                  </div>
                  {isOpen && (
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
