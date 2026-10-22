import Container from "./Container";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Como funciona", href: "#solucao" },
  { label: "Painel web", href: "#painel" },
  { label: "Produto", href: "#produto" },
  { label: "Planos", href: "#planos" },
];

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 pt-4">
      <Container>
        <div className="flex h-16 items-center justify-between rounded-[20px] border border-line/60 bg-bg/80 px-6 shadow-sm backdrop-blur-md">
          <a href="/" className="flex items-center">
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
              className="btn-primary rounded-lg px-5 py-2 text-sm font-semibold"
            >
              Comece agora mesmo
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
