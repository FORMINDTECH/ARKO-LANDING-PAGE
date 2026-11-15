import { ReactNode } from "react";
import Ampliavel from "../Ampliavel";
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

/** A janela em si (barra de endereço + conteúdo). */
function Janela({ rota, className = "", children }: { rota: string; className?: string; children: ReactNode }) {
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
      <div className="relative bg-app">{children}</div>
    </div>
  );
}

/**
 * Janela de navegador com a barra de endereço do painel do profissional.
 * Acende no hover (mesmo brilho dos celulares) e abre ampliada ao clicar.
 */
export default function Browser({
  tela,
  eager,
  className = "",
  children,
  ampliar = true,
}: {
  tela?: TelaPainel;
  eager?: boolean;
  /** Mantido por compatibilidade; as capturas são servidas no arquivo original. */
  sizes?: string;
  className?: string;
  /** Conteúdo próprio (ex.: telas que trocam); substitui `tela`. */
  children?: ReactNode;
  /** Clique abre a tela em tamanho grande. Desligue quando a janela estiver dentro de um link. */
  ampliar?: boolean;
}) {
  const rota = tela ? TELAS_PAINEL[tela].rota : "dashboard";
  const conteudo = children ?? (tela ? <PainelImagem tela={tela} eager={eager} /> : null);
  const janela = (
    <div className="group/janela relative isolate">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-accent/0 blur-3xl transition-colors duration-500 ease-out group-hover/janela:bg-accent/20" />
      <Janela rota={rota}>{conteudo}</Janela>
    </div>
  );
  if (!ampliar) return <div className={className}>{janela}</div>;
  return (
    <Ampliavel
      className={className}
      label="Ampliar tela do painel"
      // ampliado: o maior possível sem passar da altura da tela (16:9 + barra de endereço)
      ampliado={
        <Janela rota={rota} className="w-[min(94vw,1500px,calc((88vh_-_48px)*1.7778))]">
          {conteudo}
        </Janela>
      }
    >
      {janela}
    </Ampliavel>
  );
}
