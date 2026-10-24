"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";

export default function SlideSwap({
  itemKey,
  direction,
  children,
  className = "",
}: {
  itemKey: string | number;
  direction: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prevKey = useRef(itemKey);

  useLayoutEffect(() => {
    if (prevKey.current === itemKey) return;
    const el = ref.current;
    if (!el) return;
    const offset = direction >= 0 ? 28 : -28;
    el.style.transition = "none";
    el.style.transform = `translateX(${offset}px)`;
    el.style.opacity = "0";
    void el.offsetHeight;
    el.style.transition = "transform 300ms ease-out, opacity 300ms ease-out";
    el.style.transform = "translateX(0)";
    el.style.opacity = "1";
    prevKey.current = itemKey;
  }, [itemKey, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
