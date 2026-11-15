import type { Metadata } from "next";
import ProHero from "@/components/pro/ProHero";
import GestaoAlunos from "@/components/pro/GestaoAlunos";
import Planejamento from "@/components/pro/Planejamento";
import Acompanhamento from "@/components/pro/Acompanhamento";
import Integracao from "@/components/pro/Integracao";
import Fluxo from "@/components/pro/Fluxo";
import PlanosPro from "@/components/pro/PlanosPro";
import FaqPro from "@/components/pro/FaqPro";
import CtaPro from "@/components/pro/CtaPro";

export const metadata: Metadata = {
  title: "Painel para profissionais",
  description:
    "Painel ARKO para personal trainers, nutricionistas e consultorias: organize alunos, monte treino e dieta, registre avaliações e acompanhe a evolução. O aluno usa o app sem custo.",
};

export default function PaginaProfissionais() {
  return (
    <>
      <ProHero />
      <GestaoAlunos />
      <Planejamento />
      <Acompanhamento />
      <Integracao />
      <Fluxo />
      <PlanosPro />
      <FaqPro />
      <CtaPro />
    </>
  );
}
