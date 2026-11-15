import { ReactNode } from "react";
import Reveal from "../Reveal";

/** Abertura de seção: rótulo em mono, título e apoio. Sem cartões, sem ícones. */
export default function Titulo({
  rotulo,
  titulo,
  apoio,
  centro = false,
  className = "",
  direction = "left",
}: {
  rotulo?: string;
  titulo: ReactNode;
  apoio?: ReactNode;
  centro?: boolean;
  className?: string;
  direction?: "left" | "up";
}) {
  return (
    <Reveal
      direction={centro ? "up" : direction}
      className={`${centro ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      {rotulo ? <p className={`eyebrow ${centro ? "justify-center" : ""}`}>{rotulo}</p> : null}
      <h2 className="mt-4 text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-ink text-balance sm:text-4xl lg:text-[2.75rem]">
        {titulo}
      </h2>
      {apoio ? (
        <p className={`mt-4 text-base leading-relaxed text-ink-muted sm:text-lg ${centro ? "mx-auto max-w-xl" : "max-w-xl"}`}>
          {apoio}
        </p>
      ) : null}
    </Reveal>
  );
}
