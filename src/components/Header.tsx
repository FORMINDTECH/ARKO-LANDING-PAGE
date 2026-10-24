"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Painel web", href: "#painel" },
  { label: "Como funciona", href: "#solucao" },
  { label: "Produto", href: "#produto" },
  { label: "Planos", href: "#planos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 pt-4">
      <Container>
        <div className="rounded-[20px] border border-line/60 bg-bg/80 shadow-sm backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-6">
            <a href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Logo className="h-7 w-auto" />
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href="https://arko.formind.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hidden rounded-lg px-5 py-2 text-sm font-semibold sm:inline-flex"
              >
                Comece agora mesmo
              </a>
              <button
                type="button"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-2 md:hidden"
              >
                {open ? (
                  <X className="h-5 w-5" strokeWidth={2} />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0">
              <nav className="flex flex-col gap-1 border-t border-line/60 px-4 py-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://arko.formind.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-2 inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold sm:hidden"
                >
                  Comece agora mesmo
                </a>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
