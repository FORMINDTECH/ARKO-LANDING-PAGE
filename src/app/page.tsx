import HeroInicio from "@/components/home/HeroInicio";
import Vitrine from "@/components/home/Vitrine";
import DuasExperiencias from "@/components/home/DuasExperiencias";
import Escolha from "@/components/home/Escolha";
import Encerramento from "@/components/home/Encerramento";
import AncorasAntigas from "@/components/home/AncorasAntigas";

export default function Inicio() {
  return (
    <>
      <AncorasAntigas />
      <HeroInicio />
      <Vitrine />
      <DuasExperiencias />
      <Escolha />
      <Encerramento />
    </>
  );
}
