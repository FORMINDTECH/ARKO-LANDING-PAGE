import { ReactNode } from "react";

export default function MonitorMockup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative ${className}`}>
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-accent/0 blur-3xl transition-colors duration-500 ease-out group-hover:bg-accent/25" />

      <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
        <div className="rounded-xl border border-line bg-surface-2 p-2 shadow-2xl shadow-black/60">
          <div className="flex items-center gap-1.5 px-2 pb-1.5 pt-0.5">
            <span className="h-2 w-2 rounded-full bg-danger/70" />
            <span className="h-2 w-2 rounded-full bg-accent/70" />
            <span className="h-2 w-2 rounded-full bg-success/70" />
          </div>
          <div className="overflow-hidden rounded-lg bg-bg">{children}</div>
        </div>

        <div className="mx-auto h-4 w-16 bg-surface-2" />
        <div className="mx-auto h-2 w-28 rounded-full bg-line" />
      </div>
    </div>
  );
}
