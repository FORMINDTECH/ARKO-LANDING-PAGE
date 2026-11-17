import Container from "../Container";
import Reveal from "../Reveal";
import Drift from "../Drift";
import Phone from "../devices/Phone";
import Titulo from "../ui/Titulo";

/**
 * Conceito: da lista ao treino rodando. Atrás, a lista de treinos; na frente, o mesmo Treino A
 * em andamento no modo lista (cronômetro, botão de pausar, séries concluídas e os próximos
 * exercícios). Ao lado, uma ficha técnica em linhas
 * (o jeito que o dossiê usa a mono para dados de treino), em vez de cartões com ícone.
 */
const FICHA = [
  { rotulo: "Montar", texto: "Do zero (musculação, cardio ou alongamento) ou gerado com IA em poucos toques." },
  { rotulo: "Executar", texto: "Série por série, com cronômetro de descanso. No cardio, o percurso pelo GPS." },
  { rotulo: "Fechar", texto: "Ao terminar, guarde fotos do treino e publique no feed, se quiser." },
];

export default function Treinos() {
  return (
    <section id="treinos" className="relative py-14 sm:py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Titulo
              rotulo="01 · Treinos"
              titulo={
                <>
                  Abra o app e <span className="grifo">vá direto</span> para o treino.
                </>
              }
              apoio="Cada treino mostra o foco, quantos exercícios tem e quanto tempo leva. Nada de procurar a planilha no meio da academia."
            />
            <Reveal delay={150} className="mt-10">
              <dl className="divide-y divide-line border-y border-line">
                {FICHA.map((f) => (
                  <div key={f.rotulo} className="grid grid-cols-[96px_1fr] gap-4 py-5 sm:grid-cols-[120px_1fr]">
                    <dt className="font-data text-xs font-semibold uppercase tracking-[0.16em] text-accent">{f.rotulo}</dt>
                    <dd className="text-base leading-relaxed text-ink">{f.texto}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* da lista ao treino rodando: a lista atrás, o descanso entre séries na frente */}
          <Reveal direction="right" className="relative mx-auto w-full max-w-[500px]">
            <div className="relative mx-auto aspect-[1/1.12] w-full">
              <Drift y={30} rotate={-1} className="absolute left-0 top-[6%] w-[44%]">
                <p className="mb-3 text-center font-data text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  Escolha o treino
                </p>
                <Phone tela="treinos" className="w-full -rotate-[5deg] opacity-90" />
              </Drift>
              <Drift y={-30} className="absolute right-0 top-0 z-10 w-[54%]">
                <p className="mb-3 text-center font-data text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  Treino rodando
                </p>
                <Phone tela="treinoLista" />
              </Drift>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
