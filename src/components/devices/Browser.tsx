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
type Recorte = { x: number; y: number; w: number; h: number };

/**
 * No celular (abaixo de 640 px), mostra só a região `recorte` da captura, maior; a partir daí, a
 * tela inteira. O conteúdo de dentro (imagem e eventuais marcações em % da captura) é deslocado
 * junto, então as marcações continuam no lugar certo. Regras em globals.css (.painel-recorte).
 */
function AreaRecortada({ recorte, children }: { recorte?: Recorte; children: ReactNode }) {
  if (!recorte) return <>{children}</>;
  const estilo = {
    "--rx": recorte.x,
    "--ry": recorte.y,
    "--rw": recorte.w,
    "--rh": recorte.h,
    "--ar-m": (recorte.w * 2880) / (recorte.h * 1620),
  } as React.CSSProperties;
  return (
    <div className="painel-recorte" style={estilo}>
      <div className="painel-recorte-interno">{children}</div>
    </div>
  );
}

function Janela({
  rota,
  className = "",
  recorte,
  children,
}: {
  rota: string;
  className?: string;
  recorte?: Recorte;
  children: ReactNode;
}) {
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
      <div className="relative bg-app">
        <AreaRecortada recorte={recorte}>{children}</AreaRecortada>
      </div>
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
  recorte,
}: {
  tela?: TelaPainel;
  /** Recorte para o celular; por padrão, o definido para a tela em telas.ts. `null` desliga. */
  recorte?: Recorte | null;
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
  const recorteMobile = recorte === null ? undefined : (recorte ?? (tela ? TELAS_PAINEL[tela].mobile : undefined));
  const janela = (
    <div className="group/janela relative isolate">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-accent/0 blur-3xl transition-colors duration-500 ease-out group-hover/janela:bg-accent/20" />
      <Janela rota={rota} recorte={recorteMobile}>
        {conteudo}
      </Janela>
    </div>
  );
  if (!ampliar) return <div className={className}>{janela}</div>;
  return (
    <Ampliavel
      className={className}
      label="Ampliar tela do painel"
      // ampliado: o maior possível sem passar da altura da tela (16:9 + barra de endereço)
      ampliado={
        // No celular, a tela inteira em 94vw ficaria ilegível: ela abre em 900 px de largura e
        // rola para o lado. A partir de 640 px, cabe inteira na tela.
        <div>
          <p className="sticky left-0 mb-3 w-[min(100vw-2rem,360px)] text-center text-xs text-white/70 sm:hidden">
            Arraste para o lado para ver a tela inteira
          </p>
          <Janela rota={rota} className="w-[900px] sm:w-[min(94vw,1500px,calc((88vh_-_48px)*1.7778))]">
            {conteudo}
          </Janela>
        </div>
      }
    >
      {janela}
    </Ampliavel>
  );
}
