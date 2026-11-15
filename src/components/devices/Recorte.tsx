import Tela from "./Tela";
import { RECORTES, type NomeRecorte } from "./telas";

/** Pedaço de uma tela real, solto como um painel flutuante. */
export default function Recorte({
  nome,
  className = "",
  sizes = "360px",
  rotulo,
  eager = false,
}: {
  nome: NomeRecorte;
  className?: string;
  sizes?: string;
  /** Rótulo opcional em mono acima do recorte. */
  rotulo?: string;
  eager?: boolean;
}) {
  const r = RECORTES[nome];
  return (
    <figure className={`relative ${className}`}>
      {rotulo ? <figcaption className="eyebrow mb-2.5 !text-[0.65rem]">{rotulo}</figcaption> : null}
      <div
        className="overflow-hidden rounded-2xl bg-app ring-1 ring-line"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        <Tela
          base={`/screens/recortes/${nome}`}
          alt={r.alt}
          width={r.w}
          height={r.h}
          sizes={sizes}
          eager={eager}
          className="h-auto w-full"
        />
      </div>
    </figure>
  );
}
