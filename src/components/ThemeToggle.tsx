"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// O tema vive no atributo data-theme do <html> (aplicado antes da hidratação pelo layout).
const assinar = (aviso: () => void) => {
  const obs = new MutationObserver(aviso);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
};
const temaAtual = () => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

type DocComTransicao = Document & { startViewTransition?: (cb: () => void) => unknown };

/** Alterna claro/escuro. O claro é o padrão; a escolha fica salva no navegador. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(assinar, temaAtual, () => "light");

  // Ao chegar perto do botão, empilha os screenshots dos dois temas: a versão do outro tema
  // carrega antes do clique e a troca acontece sem piscar (ver .tema-par no globals.css).
  const preparar = () => document.documentElement.classList.add("tema-pronto");

  const toggle = () => {
    const raiz = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    const aplicar = () => {
      if (next === "dark") raiz.setAttribute("data-theme", "dark");
      else raiz.removeAttribute("data-theme");
    };
    preparar();
    try {
      localStorage.setItem("arko-theme", next);
    } catch {}

    const doc = document as DocComTransicao;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduzir) {
      // página e screenshots trocam juntos, num único crossfade
      doc.startViewTransition(aplicar);
    } else {
      if (!reduzir) raiz.classList.add("tema-sem-vt");
      aplicar();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      onPointerEnter={preparar}
      onPointerDown={preparar}
      onFocus={preparar}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface hover:text-ink ${className}`}
    >
      {theme === "dark" ? <Sun className="h-[18px] w-[18px]" strokeWidth={2} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={2} />}
    </button>
  );
}
