import Container from "./Container";

const NAV_LINKS = [
  { label: "Produto", href: "#produto" },
  { label: "Como funciona", href: "#solucao" },
  { label: "Planos", href: "#planos" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-lg font-extrabold tracking-tight text-ink">
            ARKO
          </span>
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
          href="#planos"
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Agende uma demonstração
        </a>
      </Container>
    </header>
  );
}
