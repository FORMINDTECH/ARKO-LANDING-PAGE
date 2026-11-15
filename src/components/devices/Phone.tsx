import Tela from "./Tela";
import { TELAS_APP, type TelaApp } from "./telas";

/** Barra de status padrão de celular: horário, ilha, sinal, Wi‑Fi e bateria. */
function BarraStatus() {
  return (
    <div
      aria-hidden
      className="relative flex h-[12.5cqw] items-center justify-between bg-app px-[7.5cqw] pt-[1.2cqw] text-[var(--color-app-ink)]"
    >
      <span className="w-[20cqw] text-[3.9cqw] font-semibold leading-none tracking-tight tabular-nums">9:41</span>
      <span className="absolute left-1/2 top-[2.6cqw] h-[7.2cqw] w-[26cqw] -translate-x-1/2 rounded-full bg-black" />
      <span className="flex w-[20cqw] items-center justify-end gap-[1.3cqw]">
        {/* sinal */}
        <svg viewBox="0 0 18 12" className="h-[2.9cqw] w-auto" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        {/* wi-fi */}
        <svg viewBox="0 0 16 12" className="h-[2.9cqw] w-auto" fill="currentColor">
          <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .6 10.4 10.4 0 0 0 .8 3.5L2 4.8a8.6 8.6 0 0 1 6-2.4Z" />
          <path d="M8 6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.6 6.6 0 0 0 8 4.2c-1.8 0-3.4.7-4.6 1.8l1.2 1.3C5.5 6.5 6.7 6 8 6Z" />
          <path d="M8 9.6c.5 0 .9.2 1.2.5L8 11.4l-1.2-1.3c.3-.3.7-.5 1.2-.5Z" />
        </svg>
        {/* bateria */}
        <svg viewBox="0 0 27 13" className="h-[3cqw] w-auto" fill="none">
          <rect x="0.6" y="0.6" width="22.8" height="11.8" rx="3.4" stroke="currentColor" opacity="0.45" />
          <rect x="2.2" y="2.2" width="17.6" height="8.6" rx="2" fill="currentColor" />
          <path d="M25 4.4v4.2c.9-.3 1.5-1.2 1.5-2.1s-.6-1.8-1.5-2.1Z" fill="currentColor" opacity="0.45" />
        </svg>
      </span>
    </div>
  );
}

/**
 * Celular com tela real do app. A largura vem do `className` (ex.: w-[280px]);
 * moldura, cantos, ilha e barra de status escalam juntos (container query units).
 * As imagens são pedidas em resolução alta para o texto pequeno do app ficar nítido.
 */
export default function Phone({
  tela,
  className = "",
  eager = false,
  brilho = false,
}: {
  tela: TelaApp;
  className?: string;
  eager?: boolean;
  /** Brilho laranja atrás do aparelho no hover (mesmo efeito da landing original). */
  brilho?: boolean;
  /** Mantido por compatibilidade; o tamanho pedido é sempre alto. */
  sizes?: string;
}) {
  const t = TELAS_APP[tela];
  return (
    <div className={`@container group/phone relative isolate shrink-0 select-none ${className}`}>
      {brilho ? (
        <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-accent/0 blur-2xl transition-colors duration-500 ease-out group-hover/phone:bg-accent/25" />
      ) : null}
      <div
        className="relative rounded-[15cqw] bg-[linear-gradient(150deg,#2e2e32,#0e0e10_42%,#1c1c1f)] p-[2.8cqw]"
        style={{ boxShadow: "var(--shadow-device), inset 0 0 0 1.5px rgba(255,255,255,0.10)" }}
      >
        <span aria-hidden className="absolute -left-[0.8cqw] top-[22%] h-[7%] w-[0.8cqw] rounded-l-sm bg-[#2a2a2e]" />
        <span aria-hidden className="absolute -left-[0.8cqw] top-[31%] h-[11%] w-[0.8cqw] rounded-l-sm bg-[#2a2a2e]" />
        <span aria-hidden className="absolute -right-[0.8cqw] top-[27%] h-[15%] w-[0.8cqw] rounded-r-sm bg-[#2a2a2e]" />
        <div className="relative overflow-hidden rounded-[12.5cqw] bg-app">
          <BarraStatus />
          <div className="relative aspect-[1170/2532] w-full">
            <Tela
              base={t.base}
              alt={t.alt}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              eager={eager}
              className="object-cover object-top"
            />
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[2.8cqw] rounded-[12.5cqw] bg-[linear-gradient(118deg,rgba(255,255,255,0.07),transparent_32%)]"
        />
      </div>
    </div>
  );
}
