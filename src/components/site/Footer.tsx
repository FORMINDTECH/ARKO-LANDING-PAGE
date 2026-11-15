import Link from "next/link";
import Container from "../Container";
import Logo from "../Logo";
import {
  CONTATO_EMAIL,
  INSTAGRAM_URL,
  PAINEL_CADASTRO_URL,
  PAINEL_LOGIN_URL,
  PRIVACIDADE_URL,
  ROTAS,
  TERMOS_URL,
} from "@/lib/links";

type Item = { label: string; href: string; externo?: boolean };

const COLUNAS: { titulo: string; links: Item[] }[] = [
  {
    titulo: "Para quem treina",
    links: [
      { label: "O app", href: ROTAS.app },
      { label: "Planos do app", href: ROTAS.planosApp },
      { label: "Baixar", href: ROTAS.baixar },
    ],
  },
  {
    titulo: "Para profissionais",
    links: [
      { label: "O painel", href: ROTAS.profissionais },
      { label: "Planos por vaga", href: ROTAS.planosPro },
      { label: "Criar conta", href: PAINEL_CADASTRO_URL, externo: true },
      { label: "Entrar no painel", href: PAINEL_LOGIN_URL, externo: true },
    ],
  },
  {
    titulo: "ARKO",
    links: [
      { label: "Instagram", href: INSTAGRAM_URL, externo: true },
      { label: "Contato", href: `mailto:${CONTATO_EMAIL}` },
      { label: "Termos de uso", href: TERMOS_URL, externo: true },
      { label: "Privacidade", href: PRIVACIDADE_URL, externo: true },
    ],
  },
];

function FooterLink({ item }: { item: Item }) {
  const cls = "text-sm text-ink-muted transition-colors hover:text-ink";
  if (item.externo) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {item.label}
      </a>
    );
  }
  if (item.href.startsWith("mailto:")) {
    return (
      <a href={item.href} className={cls}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={cls}>
      {item.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg pb-10 pt-4">
      <Container>
        <div className="rounded-[24px] bg-surface-2 p-6 sm:p-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div className="max-w-xs">
              <Link href={ROTAS.inicio} aria-label="ARKO, página inicial" className="inline-block">
                <Logo className="h-6 w-auto" />
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Treino, alimentação e evolução num app só. Para quem treina por conta própria e para quem acompanha
                alunos.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 sm:gap-16">
              {COLUNAS.map((col) => (
                <nav key={col.titulo} aria-label={col.titulo}>
                  <h2 className="font-sans text-sm font-semibold text-ink [font-stretch:100%]">{col.titulo}</h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <FooterLink item={link} />
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-muted">© {new Date().getFullYear()} ARKO. Todos os direitos reservados.</p>
            <p className="font-data text-xs uppercase tracking-[0.16em] text-ink-muted">Treino é foco.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
