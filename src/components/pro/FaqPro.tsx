"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";

// Mesma seção da landing original, com as respostas conferidas no código (API-ARKO e ARKO-MOBILE).
const FAQS = [
  {
    pergunta: "Como funciona o modelo de vagas?",
    resposta:
      "Você contrata vagas de aluno, a partir de 3. Cada vaga cobre um aluno por 30 dias e, enquanto ela estiver ativa, ele usa o app completo sem custo. Para personal e nutricionista, são R$ 9,90 por aluno até 100 vagas e R$ 8,90 a partir do 101º. Para consultoria, R$ 11,90 e R$ 10,90.",
  },
  {
    pergunta: "O que acontece se eu não renovar as vagas?",
    resposta:
      "O aluno tem 7 dias de carência. Depois disso, o app continua funcionando para ele, mas os recursos do plano completo ficam bloqueados até a vaga ser renovada ou ele assinar por conta própria.",
  },
  {
    pergunta: "Meu aluno precisa pagar alguma coisa?",
    resposta:
      "Não. Ele baixa o app, digita o seu código de convite e passa a usar pela sua vaga.",
  },
  {
    pergunta: "Posso cadastrar um aluno que ainda não tem o app?",
    resposta:
      "Pode. O cadastro manual fica marcado como \"sem app\" na sua lista de alunos, e você monta o plano dele do mesmo jeito.",
  },
  {
    pergunta: "Dá para cancelar quando quiser?",
    resposta: "Sim, sem contrato de fidelidade. Você também pode excluir a sua conta a qualquer momento, conforme a LGPD.",
  },
];

export default function FaqPro() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Perguntas</p>
            <h2 className="mt-4 text-[1.75rem] font-extrabold tracking-tight text-ink sm:text-4xl">Perguntas que você pode ter</h2>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-2 rounded-[24px] bg-surface-2 p-2">
            {FAQS.map((faq, i) => {
              const isOpen = aberta === i;
              return (
                <div key={faq.pergunta} className={`rounded-2xl bg-surface transition-shadow ${isOpen ? "shadow-sm" : "hover:shadow-sm"}`}>
                  <h3 className="font-sans [font-stretch:100%]">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setAberta(isOpen ? null : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-base font-semibold text-ink"
                    >
                      {faq.pergunta}
                      {isOpen ? (
                        <Minus className="h-5 w-5 shrink-0 text-accent" strokeWidth={2.25} />
                      ) : (
                        <Plus className="h-5 w-5 shrink-0 text-accent" strokeWidth={2.25} />
                      )}
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <p className="overflow-hidden px-5 text-sm leading-relaxed text-ink-muted">
                      <span className="block pb-5">{faq.resposta}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
