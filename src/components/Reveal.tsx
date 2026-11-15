"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

const HIDDEN_CLASS = {
  up: "opacity-0 translate-y-8",
  left: "opacity-0 -translate-x-12",
  right: "opacity-0 translate-x-12",
  scale: "opacity-0 translate-y-6 scale-[0.97]",
} as const;

/**
 * Entrada suave quando o bloco aparece na tela (o movimento da landing original).
 * Expõe `data-visivel` para filhos que animam junto (ex.: .linha-desenha).
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: keyof typeof HIDDEN_CLASS;
  id?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "figure" | "section";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      data-visivel={visible}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : HIDDEN_CLASS[direction]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
