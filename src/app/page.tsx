import Link from "next/link";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import SiteFooter from "@/components/site/SiteFooter";
import EscolhaPerfil from "@/components/escolha/EscolhaPerfil";
import RedirecionaAncorasAntigas from "@/components/escolha/RedirecionaAncorasAntigas";
import { PAINEL_LOGIN_URL, ROTAS } from "@/lib/links";

export default function Home() {
  return (
    <>
      <RedirecionaAncorasAntigas />
      <div className="absolute right-3 top-3 z-10 sm:right-5 sm:top-5">
        <ThemeToggle />
      </div>
      <main className="relative flex-1 overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-12">
        <div className="page-atmosphere" aria-hidden>
          <div className="glow left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2" />
        </div>

        <Container>
          <section aria-labelledby="titulo" className="mx-auto max-w-3xl text-center">
            {/* assinatura: a marca abre a composição, com o lema logo abaixo */}
            <div className="flex flex-col items-center">
              <Logo className="h-9 w-auto sm:h-11" priority />
              <p className="eyebrow mt-4">Treino · Alimentação · Evolução</p>
            </div>
            <h1
              id="titulo"
              className="mt-9 sm:mt-10 text-[2.5rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[3.9rem]"
            >
              Constância que
              <br className="hidden sm:block" /> vira <span className="mark-arc">resultado</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-muted sm:text-lg">
              O Arko organiza treino, dieta e evolução física num só lugar. Para quem acompanha clientes e para quem treina por conta própria.
            </p>
            <h2 className="mt-8 font-sans text-[0.98rem] font-semibold text-ink" style={{ fontStretch: "100%" }}>
              Como você vai usar o Arko?
            </h2>
          </section>

          <section aria-label="Escolha o seu perfil" className="mx-auto max-w-6xl">
            <EscolhaPerfil />
          </section>

          <p className="mt-8 flex flex-col items-center gap-2 text-center text-sm text-ink-muted sm:block">
            <span>
              Já usa o painel?{" "}
            <a href={PAINEL_LOGIN_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent">
                Entrar
              </a>
            </span>
            <span className="mx-3 hidden text-line-strong sm:inline">/</span>
            <span>
              Quer só baixar o app?{" "}
            <Link href={`${ROTAS.app}#baixar`} className="font-semibold text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent">
                Ir para o download
              </Link>
            </span>
          </p>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
