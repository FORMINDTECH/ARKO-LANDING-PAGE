import Image from "next/image";
import Container from "./Container";

const NAV_LINKS = [
  { label: "Como funciona", href: "#solucao" },
  { label: "Painel web", href: "#painel" },
  { label: "Produto", href: "#produto" },
  { label: "Planos", href: "#planos" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="flex items-center">
          <Image
            src="/brand/arko-logo.png"
            alt="ARKO"
            width={612}
            height={230}
            priority
            className="h-7 w-auto"
          />
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

        <a
          href="https://arko.formind.tech/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Comece agora mesmo
        </a>
      </Container>
    </header>
  );
}
