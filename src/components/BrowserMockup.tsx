import { ReactNode } from "react";

export default function BrowserMockup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative w-full overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-2xl shadow-black/60">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          <div className="ml-3 flex-1 truncate rounded-md bg-surface px-3 py-1 text-[11px] text-ink-muted">
            app.arkohealth.com.br/painel
          </div>
        </div>
        <div className="bg-bg">{children}</div>
      </div>
    </div>
  );
}
