import ImagemTema from "./ImagemTema";
import { ReactNode } from "react";

/** Telas reais do app (capturas do ARKO-MOBILE em 1170 × 2532 px, nos temas claro e escuro). */
export const TELAS_APP = {
  inicio: { base: "/screens/app/inicio", alt: "Tela inicial do app Arko com a sequência de 18 dias e as metas do dia" },
  treinos: { base: "/screens/app/treinos", alt: "Lista de treinos no app Arko" },
  alimentacao: { base: "/screens/app/alimentacao", alt: "Registro de refeições e calorias do dia no app Arko" },
  carga: { base: "/screens/app/carga", alt: "Gráfico de progressão de carga do agachamento no app Arko" },
  musculos: { base: "/screens/app/musculos", alt: "Frequência de treinos e mapa de grupos musculares no app Arko" },
  calendario: { base: "/screens/app/calendario", alt: "Calendário com os dias treinados no app Arko" },
  feed: { base: "/screens/app/feed", alt: "Feed com treinos publicados por outras pessoas no app Arko" },
} as const;

export type TelaApp = keyof typeof TELAS_APP;

/**
 * Celular com moldura, ilha e barra de status. A largura vem do `className` (ex.: w-[300px]);
 * todo o resto escala junto (container queries).
 */
export default function Phone({
  tela,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 400px, 80vw",
  children,
}: {
  tela?: TelaApp;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Telas empilhadas (troca animada); substitui `tela`. */
  children?: ReactNode;
}) {
  return (
    <div className={`@container relative isolate select-none ${className}`}>
      <div
        className="relative rounded-[16cqw] bg-[linear-gradient(145deg,#2c2c30,#0e0e10_40%,#1d1d20)] p-[3.2cqw]"
        style={{ boxShadow: "var(--shadow-device), inset 0 0 0 1.5px rgba(255,255,255,0.12)" }}
      >
        {/* botões laterais */}
        <span className="absolute -left-[0.9cqw] top-[22%] h-[7%] w-[0.9cqw] rounded-l-sm bg-[#2a2a2e]" />
        <span className="absolute -left-[0.9cqw] top-[31%] h-[11%] w-[0.9cqw] rounded-l-sm bg-[#2a2a2e]" />
        <span className="absolute -right-[0.9cqw] top-[27%] h-[15%] w-[0.9cqw] rounded-r-sm bg-[#2a2a2e]" />

        <div className="relative overflow-hidden rounded-[13cqw] bg-[#f4f6f9] dark:bg-black">
          {/* barra de status */}
          <div className="relative flex h-[11cqw] items-center justify-between px-[8cqw] pt-[1.5cqw] text-[3.6cqw] font-semibold text-[#0f172a] dark:text-white">
            <span className="tabular-nums">9:41</span>
            <span className="absolute left-1/2 top-[2.4cqw] h-[7.4cqw] w-[27cqw] -translate-x-1/2 rounded-full bg-[#050505]" />
            <span className="flex items-center gap-[1.4cqw]" aria-hidden>
              <svg viewBox="0 0 18 12" className="h-[2.8cqw]" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                <rect x="10" y="3" width="3" height="9" rx="1" />
                <rect x="15" y="0" width="3" height="12" rx="1" />
              </svg>
              <svg viewBox="0 0 27 13" className="h-[2.9cqw]" fill="none">
                <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor" opacity="0.5" />
                <rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor" />
                <rect x="24" y="4" width="2" height="5" rx="1" fill="currentColor" opacity="0.5" />
              </svg>
            </span>
          </div>
          <div data-tela className="relative aspect-[390/844] w-full">
            {children ??
              (tela ? (
                <ImagemTema base={TELAS_APP[tela].base} alt={TELAS_APP[tela].alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
              ) : null)}
          </div>
        </div>
        {/* reflexo sutil */}
        <div className="pointer-events-none absolute inset-[3.2cqw] rounded-[13cqw] bg-[linear-gradient(120deg,rgba(255,255,255,0.07),transparent_35%)]" />
      </div>
    </div>
  );
}
