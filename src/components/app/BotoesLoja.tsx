import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/links";

function Apple({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function Play({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 26" className={className} aria-hidden>
      <path d="M1.2.4 13.4 12.6 1.2 24.8c-.5-.3-.8-.9-.8-1.6V2c0-.7.3-1.3.8-1.6Z" fill="#00d7fe" />
      <path d="m17.5 8.5-4.1 4.1-12.2-12.2c.4-.3 1-.3 1.6 0l14.7 8.1Z" fill="#00f076" />
      <path d="m17.5 16.7-14.7 8.1c-.6.3-1.2.3-1.6 0l12.2-12.2 4.1 4.1Z" fill="#ff3a44" />
      <path d="m22.6 13.9-5.1 2.8-4.1-4.1 4.1-4.1 5.1 2.8c1.2.7 1.2 1.9 0 2.6Z" fill="#ffd500" />
    </svg>
  );
}

// No celular os dois botões dividem a linha (flex-1); a partir de 640 px têm largura própria.
const BASE =
  "group inline-flex h-[52px] min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3 transition-[border-color,transform] duration-300 ease-out sm:h-[54px] sm:min-w-[170px] sm:flex-none sm:gap-3 sm:px-4";

/** Botões das lojas. Sem link da App Store (ainda não publicado), o botão aparece como "em breve". */
export default function BotoesLoja({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 sm:flex-wrap sm:gap-3 ${className}`}>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-primary ${BASE} hover:-translate-y-0.5`}
      >
        <Play className="h-6 w-6 shrink-0" />
        <span className="flex flex-col leading-none">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">Disponível no</span>
          <span className="mt-1 whitespace-nowrap text-[0.95rem] font-bold tracking-tight sm:text-[1.05rem]">Google Play</span>
        </span>
      </a>
      {APP_STORE_URL ? (
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-primary ${BASE} hover:-translate-y-0.5`}
        >
          <Apple className="h-6 w-6 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">Baixar na</span>
            <span className="mt-1 whitespace-nowrap text-[0.95rem] font-bold tracking-tight sm:text-[1.05rem]">App Store</span>
          </span>
        </a>
      ) : (
        <span aria-disabled="true" className={`${BASE} cursor-default border-2 border-dashed border-line text-ink-muted`}>
          <Apple className="h-6 w-6 shrink-0 opacity-70" />
          <span className="flex flex-col leading-none">
            <span className="text-[10px] font-semibold uppercase tracking-wide">Em breve na</span>
            <span className="mt-1 whitespace-nowrap text-[0.95rem] font-bold tracking-tight sm:text-[1.05rem]">App Store</span>
          </span>
        </span>
      )}
    </div>
  );
}
