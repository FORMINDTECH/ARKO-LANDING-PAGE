import { ReactNode } from "react";

export default function PhoneMockup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-[240px] shrink-0 rounded-[32px] border border-line bg-surface-2 p-2 shadow-2xl shadow-black/60 ${className}`}
    >
      <div className="absolute left-1/2 top-3 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/60" />
      <div className="relative overflow-hidden rounded-[24px] bg-bg">
        {children}
      </div>
    </div>
  );
}
