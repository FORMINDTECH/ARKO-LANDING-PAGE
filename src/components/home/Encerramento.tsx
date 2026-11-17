import Link from "next/link";
import Container from "../Container";
import Reveal from "../Reveal";
import MascoteAnimado from "../MascoteAnimado";
import { ROTAS } from "@/lib/links";

/** Fechamento curto: o lema da marca em tamanho grande, o mascote animado e os dois caminhos de novo. */
export default function Encerramento() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-24 lg:py-32">
      <Container>
        <Reveal className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-end gap-2 sm:gap-6">
            <p
              className="font-display text-[clamp(3rem,11vw,9.5rem)] font-extrabold leading-[0.9] tracking-tight text-ink"
              style={{ fontStretch: "125%" }}
            >
              Treino
              <br />é foco<span className="text-accent">.</span>
            </p>
            {/* o mascote fecha a página com um joinha e uma piscada */}
            <MascoteAnimado
              video="/brand/mascote/joinha-piscada.webm"
              poster="/brand/mascote/joinha-piscada.webp"
              largura={940}
              altura={918}
              alt="Mascote do ARKO fazendo joinha e piscando"
              className="-mb-2 w-[clamp(110px,22vw,280px)] shrink-0"
            />
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto lg:pb-4">
            <Link
              href={ROTAS.app}
              className="btn-primary group inline-flex items-center justify-between gap-6 rounded-xl px-6 py-4 text-sm font-semibold"
            >
              Para quem treina
              <span className="seta" aria-hidden>
                →
              </span>
            </Link>
            <Link
              href={ROTAS.profissionais}
              className="btn-primary group inline-flex items-center justify-between gap-6 rounded-xl px-6 py-4 text-sm font-semibold"
            >
              Para profissionais
              <span className="seta" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
