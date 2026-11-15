import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";
import type { Depoimento } from "@/content/depoimentos";

/** "Quem usa, recomenda". Não renderiza nada enquanto não houver depoimentos reais. */
export default function Depoimentos({ itens, id = "depoimentos" }: { itens: Depoimento[]; id?: string }) {
  if (itens.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Depoimentos</p>
          <h2 id={`${id}-titulo`} className="mt-4 text-3xl font-extrabold tracking-tight sm:text-[2.6rem] sm:leading-[1.05]">
            Quem usa, recomenda
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {itens.map((d, i) => (
            <Reveal key={d.nome} delay={i * 80} as="figure" className="surface flex flex-col rounded-[22px] p-6 sm:p-7">
              <blockquote className="flex-1 text-[1.05rem] leading-relaxed text-ink">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {d.foto ? (
                  <Image src={d.foto} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft font-bold text-accent-ink">
                    {d.nome.charAt(0)}
                  </span>
                )}
                <span>
                  <span className="block font-semibold">{d.nome}</span>
                  <span className="block text-sm text-ink-muted">{d.papel}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
