import Container from "./Container";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/arkohealth" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

const COLUMNS = [
  {
    title: "Produto",
    links: [
      { label: "Como funciona", href: "#solucao" },
      { label: "Planos", href: "#planos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#" },
      { label: "Contato", href: "#contato" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg py-14">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-lg font-extrabold tracking-tight text-ink">
                ARKO
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Tecnologia de treino e nutrição com IA para profissionais que
              gerenciam alunos e clientes.
            </p>
            <div className="mt-5 flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-ink-muted hover:text-ink"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-16">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-ink-muted hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} ARKO. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
