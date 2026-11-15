import Link from "next/link";
import Container from "../Container";
import Reveal from "../Reveal";
import { ROTAS } from "@/lib/links";

/** Fechamento curto: o lema da marca em tamanho grande e os dois caminhos de novo. */
export default function Encerramento() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p
            className="font-display text-[clamp(3rem,11vw,9.5rem)] font-extrabold leading-[0.9] tracking-tight text-ink"
            style={{ fontStretch: "125%" }}
          >
            Treino
            <br />é foco<span className="text-accent">.</span>
          </p>
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
