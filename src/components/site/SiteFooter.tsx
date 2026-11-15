import Link from "next/link";
import Container from "../Container";
import Logo from "../Logo";
import { INSTAGRAM_URL, PAINEL_LOGIN_URL, PRIVACIDADE_URL, ROTAS, SUPORTE_EMAIL, TERMOS_URL } from "@/lib/links";

const COLUNAS = [
  {
    titulo: "Treino por conta própria",
    links: [
      { label: "Conhecer o app", href: ROTAS.app },
      { label: "Planos do app", href: `${ROTAS.app}#planos` },
      { label: "Perguntas frequentes", href: `${ROTAS.app}#faq` },
    ],
  },
  {
    titulo: "Para profissionais",
    links: [
      { label: "Conhecer o painel", href: ROTAS.profissionais },
      { label: "Planos por vaga", href: `${ROTAS.profissionais}#planos` },
      { label: "Entrar no painel", href: PAINEL_LOGIN_URL, externo: true },
    ],
  },
  {
    titulo: "Arko",
    links: [
      { label: "Instagram", href: INSTAGRAM_URL, externo: true },
      { label: "Suporte", href: `mailto:${SUPORTE_EMAIL}` },
      { label: "Termos de uso", href: TERMOS_URL, externo: true },
      { label: "Privacidade", href: PRIVACIDADE_URL, externo: true },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-bg-2/60 pb-10 pt-14 sm:pt-16">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.3fr_repeat(3,1fr)] md:gap-8">
          <div className="col-span-2 max-w-xs md:col-span-1">
            <Logo className="h-6 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Treino, alimentação e evolução física num só lugar. Para quem acompanha clientes e para quem treina por conta própria.
            </p>
          </div>
          {COLUNAS.map((col) => (
            <div key={col.titulo}>
              <h2 className="font-data text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft" style={{ fontStretch: "100%" }}>
                {col.titulo}
              </h2>
              <ul className="mt-4 flex flex-col gap-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"externo" in link && link.externo ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 text-[0.95rem] text-ink-muted transition-colors hover:text-ink">
                        {link.label}
                      </a>
                    ) : link.href.startsWith("mailto:") ? (
                      <a href={link.href} className="inline-block py-1.5 text-[0.95rem] text-ink-muted transition-colors hover:text-ink">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="inline-block py-1.5 text-[0.95rem] text-ink-muted transition-colors hover:text-ink">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Arko Technologies. Todos os direitos reservados.</p>
          <a href={`mailto:${SUPORTE_EMAIL}`} className="font-data text-xs transition-colors hover:text-ink">
            {SUPORTE_EMAIL}
          </a>
        </div>
      </Container>
    </footer>
  );
}
