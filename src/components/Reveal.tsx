"use client";

import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from "react";

const HIDDEN_CLASS = {
  up: "opacity-0 translate-y-6",
  left: "opacity-0 -translate-x-8",
  right: "opacity-0 translate-x-8",
  scale: "opacity-0 scale-[0.96]",
  none: "opacity-0",
} as const;

/** Entrada suave quando o elemento chega na tela. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as: Tag = "div",
  id,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: keyof typeof HIDDEN_CLASS;
  as?: ElementType;
  id?: string;
  style?: CSSProperties;
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
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`transition-[opacity,transform] duration-[900ms] ease-out-expo ${
        visible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : HIDDEN_CLASS[direction]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
