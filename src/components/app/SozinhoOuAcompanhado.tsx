import Container from "../Container";
import Reveal from "../Reveal";
import Phone from "../devices/Phone";
import Recorte from "../devices/Recorte";
import Titulo from "../ui/Titulo";
import { DIAS_TESTE_GRATIS, PLANOS_INDEPENDENTE, brl } from "@/lib/precos";

/**
 * Conceito: dois caminhos que dão no mesmo app. À esquerda, por conta própria, com o preço
 * em tabela mono. À direita, com profissional: o código de convite e a vitrine do feed.
 * O profissional aparece como opção, nunca como requisito.
 */
// Recursos premium conferidos em ARKO-MOBILE/Fluxos-de-usuarios (aluno free × aluno premium).
const LIBERA = [
  "Gráficos de evolução e carga",
  "Calendário e sequência",
  "Treinos gerados com IA",
  "Treinos sem limite",
  "Leitor de código de barras",
  "Ranking de sequência",
];

export default function SozinhoOuAcompanhado() {
  return (
    <section id="planos" className="relative scroll-mt-24 py-14 sm:py-24 lg:py-32">
      <Container>
        <Titulo
          rotulo="05 · Do seu jeito"
          titulo="Você não precisa de um profissional para usar. Mas pode ter um."
        />

        <div className="mt-10 sm:mt-14 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {/* Por conta própria */}
          <Reveal direction="left" className="flex flex-col rounded-[28px] bg-surface-2 p-7 sm:p-10">
            <p className="eyebrow">Por conta própria</p>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
              Assine e use tudo.
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
              Os primeiros {DIAS_TESTE_GRATIS} dias são grátis. Depois, escolha o período que faz sentido para você. A
              cobrança é feita pela loja do seu celular.
            </p>

            <table className="mt-8 w-full text-left">
              <caption className="sr-only">Planos do app para quem treina por conta própria</caption>
              <tbody className="divide-y divide-line border-y border-line">
                {PLANOS_INDEPENDENTE.map((p) => (
                  <tr key={p.id}>
                    <th scope="row" className="py-4 text-base font-medium text-ink">
                      {p.nome}
                    </th>
                    <td className="py-4 text-right">
                      {/* no celular, o equivalente mensal vai para a linha de baixo */}
                      <span className="whitespace-nowrap font-data text-lg font-semibold text-ink">R$ {brl(p.preco)}</span>
                      {p.meses > 1 ? (
                        <span className="block whitespace-nowrap font-data text-xs text-ink-muted sm:ml-2 sm:inline">
                          ≈ R$ {brl(p.preco / p.meses)}/mês
                        </span>
                      ) : (
                        <span className="block font-data text-xs text-ink-muted sm:ml-2 sm:inline">/mês</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-10">
              <p className="font-data text-xs font-semibold uppercase tracking-[0.16em] text-accent">A assinatura libera</p>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 text-sm text-ink sm:grid-cols-2">
                {LIBERA.map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                Sem assinar, o app continua funcionando: você cria até 5 treinos, executa e registra as refeições.
              </p>
            </div>
          </Reveal>

          {/* Com profissional: texto e convite à esquerda, o feed real à direita, lado a lado */}
          <Reveal direction="right" delay={100} className="relative flex flex-col overflow-hidden rounded-[28px] bg-surface-2 p-7 sm:p-10">
            <div aria-hidden className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-accent/12 blur-3xl" />
            <div className="relative grid flex-1 items-center gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] sm:gap-8">
              <div className="flex h-full flex-col">
                <p className="eyebrow">Com um profissional</p>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
                  Ele paga a vaga. Você usa sem custo.
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">
                  Se o seu personal ou nutricionista usa o ARKO, ele te passa um código de convite. Enquanto ele mantiver
                  a sua vaga, o app sai de graça e ele acompanha seus treinos pelo painel.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                  Ainda não tem um? Na aba <span className="font-semibold text-ink">Profissionais</span> do feed, você
                  encontra quem atende pela plataforma e chama direto no WhatsApp.
                </p>
                <Recorte nome="convite" rotulo="Código de convite" className="mt-auto w-[min(100%,280px)] pt-10" sizes="280px" />
              </div>

              <div className="flex justify-center">
                <div className="boiar w-[220px] sm:w-full sm:max-w-[250px]">
                  <Phone tela="feed" brilho />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
