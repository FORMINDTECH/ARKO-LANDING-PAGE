"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Tema = "dark" | "light";

// O tema vem do atributo data-theme (escolha salva) ou, sem ele, da preferência do sistema.
function lerTema(): Tema {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function assinar(aviso: () => void) {
  const mo = new MutationObserver(aviso);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  mq.addEventListener("change", aviso);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", aviso);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Tema>(assinar, lerTema, () => "dark");

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("arko-theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      className="btn-secondary flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" strokeWidth={2.25} /> : <Moon className="h-4 w-4" strokeWidth={2.25} />}
    </button>
  );
}
