import ImagemTema from "./ImagemTema";
import { ReactNode } from "react";

/** Telas reais do painel (capturas do ARKO-WEB em 1440 × 810 a 2x, tema claro e escuro). */
export const TELAS_PAINEL = {
  dashboard: { rota: "dashboard", alt: "Dashboard do painel Arko com total de alunos, alunos ativos, treinos na semana e vagas" },
  alunos: { rota: "alunos", alt: "Lista de alunos vinculados no painel Arko" },
  treinos: { rota: "treinos", alt: "Gestão de treinos de uma aluna no painel Arko" },
  alimentacao: { rota: "alimentacao", alt: "Plano alimentar com metas de macros e templates de dieta no painel Arko" },
  medidas: { rota: "medidas", alt: "Medidas corporais e avaliação física no painel Arko" },
  chat: { rota: "chat", alt: "Chat do profissional com alunos e grupos de desafio no painel Arko" },
  desafios: { rota: "desafios", alt: "Desafios em grupo criados pelo profissional no painel Arko" },
  modelos: { rota: "modelos", alt: "Modelos de treino reutilizáveis no painel Arko" },
} as const;

export type TelaPainel = keyof typeof TELAS_PAINEL;

export function PainelImagem({
  tela,
  priority = false,
  sizes = "(min-width: 1280px) 1200px, 100vw",
  className = "",
}: {
  tela: TelaPainel;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className="tema-par">
      <ImagemTema
        base={`/screens/painel/${tela}`}
        alt={TELAS_PAINEL[tela].alt}
        width={2880}
        height={1620}
        sizes={sizes}
        priority={priority}
        className={`h-auto w-full ${className}`}
      />
    </div>
  );
}

/** Janela de navegador com a barra de endereço do painel. */
export default function BrowserFrame({
  tela,
  priority,
  sizes,
  className = "",
  children,
}: {
  tela?: TelaPainel;
  priority?: boolean;
  sizes?: string;
  className?: string;
  children?: ReactNode;
}) {
  const rota = tela ? TELAS_PAINEL[tela].rota : "dashboard";
  return (
    <div
      className={`overflow-hidden rounded-[14px] border border-line bg-surface sm:rounded-[18px] ${className}`}
      style={{ boxShadow: "var(--shadow-device)" }}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex max-w-[60%] min-w-0 items-center gap-1.5 truncate rounded-md bg-bg px-3 py-1 text-[11px] text-ink-soft sm:text-xs">
          <svg viewBox="0 0 12 14" className="h-2.5 w-2.5 shrink-0" fill="currentColor" aria-hidden>
            <path d="M6 0a3.5 3.5 0 0 0-3.5 3.5V6H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-.5V3.5A3.5 3.5 0 0 0 6 0Zm2 6H4V3.5a2 2 0 1 1 4 0V6Z" />
          </svg>
          <span className="truncate">arko.formind.tech/profissional/{rota}</span>
        </div>
        <span className="w-[42px]" aria-hidden />
      </div>
      <div className="relative bg-bg">{children ?? (tela ? <PainelImagem tela={tela} priority={priority} sizes={sizes} /> : null)}</div>
    </div>
  );
}
