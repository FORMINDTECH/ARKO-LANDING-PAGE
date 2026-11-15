"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import Container from "../Container";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";
import { PAINEL_CADASTRO_URL, PAINEL_LOGIN_URL, ROTAS } from "@/lib/links";

const NAV = [
  { label: "Para quem treina", href: ROTAS.app },
  { label: "Para profissionais", href: ROTAS.profissionais },
];

/** O botão do cabeçalho muda conforme a página: cada uma tem a sua conversão. */
function ctaDaPagina(pathname: string) {
  if (pathname.startsWith(ROTAS.profissionais)) {
    return { label: "Criar conta", href: PAINEL_CADASTRO_URL, externo: true };
  }
  if (pathname.startsWith(ROTAS.app)) {
    return { label: "Baixar o app", href: "#baixar", externo: false };
  }
  return { label: "Começar", href: "#escolha", externo: false };
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [rolou, setRolou] = useState(false);
  const cta = ctaDaPagina(pathname);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaClass =
    "btn-primary group hidden items-center gap-1.5 rounded-lg px-5 py-2 text-sm font-semibold sm:inline-flex";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 pt-4">
      <Container>
        <div
          className={`rounded-[20px] border backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ease-out ${
            rolou || open
              ? "border-line/60 bg-bg/85 shadow-sm"
              : "border-transparent bg-bg/40 shadow-none"
          }`}
        >
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <Link href={ROTAS.inicio} className="flex shrink-0 items-center" aria-label="ARKO, página inicial">
              <Logo className="h-6 w-auto sm:h-7" eager />
            </Link>

            <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
              {NAV.map((link) => {
                const ativo = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={ativo ? "page" : undefined}
                    className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                      ativo ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-300 ease-out ${
                        ativo ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                );
              })}
              {pathname.startsWith(ROTAS.profissionais) ? (
                <a
                  href={PAINEL_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  Entrar
                </a>
              ) : null}
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              {cta.externo ? (
                <a href={cta.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                  {cta.label}
                  <ArrowRight className="seta h-4 w-4" strokeWidth={2.25} />
                </a>
              ) : (
                <a href={cta.href} className={ctaClass}>
                  {cta.label}
                  <ArrowRight className="seta h-4 w-4" strokeWidth={2.25} />
                </a>
              )}
              <button
                type="button"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-2 md:hidden"
              >
                {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
              </button>
            </div>
          </div>

          <div
            className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0">
              <nav aria-label="Menu" className="flex flex-col gap-1 border-t border-line/60 px-4 py-4">
                <Link
                  href={ROTAS.inicio}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  Início
                </Link>
                {NAV.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink aria-[current=page]:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={cta.href}
                  target={cta.externo ? "_blank" : undefined}
                  rel={cta.externo ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold sm:hidden"
                >
                  {cta.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
