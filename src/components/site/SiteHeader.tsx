"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";

type Item = { label: string; href: string };

export default function SiteHeader({
  nav = [],
  cta,
  trocar,
}: {
  nav?: Item[];
  cta?: Item & { externo?: boolean };
  /** Link para a outra experiência (profissional ↔ por conta própria). */
  trocar?: Item;
}) {
  const [open, setOpen] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const temMenu = nav.length > 0 || !!trocar || !!cta;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          rolou || open
            ? "border-line bg-bg/80 shadow-[0_8px_30px_-12px_rgba(11,11,12,0.18)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-4 pl-4 pr-2 sm:h-16 sm:pl-5 sm:pr-3">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Arko, página inicial" onClick={() => setOpen(false)}>
            <Logo className="h-[22px] w-auto sm:h-6" priority />
          </Link>

          {nav.length > 0 ? (
            <nav aria-label="Seções da página" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-[0.92rem] font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          ) : null}

          <div className="flex items-center gap-1 sm:gap-2">
            {trocar ? (
              <Link
                href={trocar.href}
                className="hidden items-center gap-1 rounded-lg px-3 py-2 text-[0.92rem] font-medium text-ink-muted transition-colors hover:text-ink md:inline-flex"
              >
                {trocar.label}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </Link>
            ) : null}
            <ThemeToggle />
            {cta ? (
              <a
                href={cta.href}
                {...(cta.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="btn btn-primary hidden !min-h-[40px] !px-4 !text-sm sm:inline-flex"
              >
                {cta.label}
              </a>
            ) : null}
            {temMenu && (nav.length > 0 || trocar) ? (
              <button
                type="button"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                aria-controls="menu-mobile"
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface lg:hidden"
              >
                {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
              </button>
            ) : null}
          </div>
        </div>

        <div
          id="menu-mobile"
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out-expo lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <nav aria-label="Menu" className="flex flex-col gap-1 border-t border-line px-3 pb-4 pt-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-surface"
                >
                  {item.label}
                </a>
              ))}
              {trocar ? (
                <Link
                  href={trocar.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1 rounded-xl px-3 py-3 text-base font-medium text-ink-muted transition-colors hover:bg-surface"
                >
                  {trocar.label}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                </Link>
              ) : null}
              {cta ? (
                <a
                  href={cta.href}
                  {...(cta.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setOpen(false)}
                  className="btn btn-primary mt-2 sm:hidden"
                >
                  {cta.label}
                </a>
              ) : null}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
