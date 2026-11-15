import { ReactNode } from "react";
import Tela from "./Tela";
import { TELAS_PAINEL, type TelaPainel } from "./telas";

/** Imagem de uma tela do painel (16:9), sem moldura. */
export function PainelImagem({
  tela,
  eager = false,
  sizes = "(min-width: 1280px) 1100px, 100vw",
  className = "",
}: {
  tela: TelaPainel;
  eager?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Tela
      base={`/screens/painel/${tela}`}
      alt={TELAS_PAINEL[tela].alt}
      width={2880}
      height={1620}
      sizes={sizes}
      eager={eager}
      className={`h-auto w-full ${className}`}
    />
  );
}

/** Janela de navegador com a barra de endereço do painel do profissional. */
export default function Browser({
  tela,
  eager,
  sizes,
  className = "",
  children,
}: {
  tela?: TelaPainel;
  eager?: boolean;
  sizes?: string;
  className?: string;
  /** Conteúdo próprio (ex.: telas que trocam); substitui `tela`. */
  children?: ReactNode;
}) {
  const rota = tela ? TELAS_PAINEL[tela].rota : "dashboard";
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface-2 sm:rounded-2xl ${className}`}
      style={{ boxShadow: "var(--shadow-device)" }}
    >
      <div className="flex items-center gap-2 border-b border-line px-3 py-2 sm:px-4 sm:py-2.5">
        <span className="h-2 w-2 rounded-full bg-danger/70 sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-accent/70 sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-success/70 sm:h-2.5 sm:w-2.5" />
        <div className="ml-2 min-w-0 flex-1 truncate rounded-md bg-surface px-3 py-1 text-[10px] text-ink-muted sm:ml-3 sm:text-[11px]">
          arkohealth.com.br/profissional/{rota}
        </div>
      </div>
      <div className="relative bg-app">{children ?? (tela ? <PainelImagem tela={tela} eager={eager} sizes={sizes} /> : null)}</div>
    </div>
  );
}
