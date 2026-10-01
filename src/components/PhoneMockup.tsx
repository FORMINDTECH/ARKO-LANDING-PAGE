import { ReactNode } from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";

export default function PhoneMockup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="group relative shrink-0">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-accent/0 blur-2xl transition-colors duration-500 ease-out group-hover:bg-accent/30" />
      <div
        className={`relative w-[240px] rounded-[32px] border border-line bg-surface-2 p-2 shadow-2xl shadow-black/60 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 ${className}`}
      >
        <div className="absolute left-1/2 top-3 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/60" />
        <div className="relative overflow-hidden rounded-[24px] bg-bg">
          <div className="flex items-center justify-between px-5 pb-1 pt-2.5 text-ink">
            <span className="text-[11px] font-semibold tabular-nums">
              9:41
            </span>
            <div className="flex items-center gap-1">
              <Signal className="h-3 w-3" strokeWidth={2.5} />
              <Wifi className="h-3 w-3" strokeWidth={2.5} />
              <BatteryFull className="h-3.5 w-3.5" strokeWidth={2} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
