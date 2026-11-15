import type { Metadata } from "next";
import AppHero from "@/components/app/AppHero";
import Treinos from "@/components/app/Treinos";
import Alimentacao from "@/components/app/Alimentacao";
import Evolucao from "@/components/app/Evolucao";
import TodasAsTelas from "@/components/app/TodasAsTelas";
import SozinhoOuAcompanhado from "@/components/app/SozinhoOuAcompanhado";
import CtaApp from "@/components/app/CtaApp";

export const metadata: Metadata = {
  title: "App para quem treina",
  description:
    "Organize treinos, refeições e evolução no app ARKO. Use por conta própria, com 7 dias grátis, ou com o seu personal ou nutricionista.",
};

export default function PaginaApp() {
  return (
    <>
      <AppHero />
      <Treinos />
      <Alimentacao />
      <Evolucao />
      <TodasAsTelas />
      <SozinhoOuAcompanhado />
      <CtaApp />
    </>
  );
}
