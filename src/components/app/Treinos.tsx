import Container from "../Container";
import Reveal from "../Reveal";
import Drift from "../Drift";
import Phone from "../devices/Phone";
import Recorte from "../devices/Recorte";
import Titulo from "../ui/Titulo";

/**
 * Conceito: o cartão "salta" de dentro do celular. A lista de treinos real no aparelho e o
 * cartão do Treino A ampliado por cima, saindo da tela. Ao lado, uma ficha técnica em linhas
 * (o jeito que o dossiê usa a mono para dados de treino), em vez de cartões com ícone.
 */
const FICHA = [
  { rotulo: "Montar", texto: "Do zero (musculação, cardio ou alongamento) ou gerado com IA em poucos toques." },
  { rotulo: "Executar", texto: "Série por série, com cronômetro de descanso. No cardio, o percurso pelo GPS." },
  { rotulo: "Fechar", texto: "Ao terminar, guarde fotos do treino e publique no feed, se quiser." },
];

export default function Treinos() {
  return (
    <section id="treinos" className="relative py-24 sm:py-32">
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

          <Reveal direction="right" className="relative mx-auto w-full max-w-[480px]">
            <div className="relative ml-auto w-[64%] sm:mr-[6%]">
              <Phone tela="treinos" sizes="(min-width: 1024px) 300px, 60vw" brilho />
            </div>
            {/* o cartão real, ampliado, saindo da tela */}
            <Drift y={-36} className="absolute left-0 top-[16%] z-10 w-[72%]">
              <div className="rotate-[-3deg]">
                <Recorte nome="treino" sizes="(min-width: 1024px) 340px, 70vw" />
              </div>
            </Drift>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
