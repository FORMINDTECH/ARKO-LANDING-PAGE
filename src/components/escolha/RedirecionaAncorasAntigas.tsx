"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// A landing antiga era uma página só, voltada a profissionais. Links salvos com âncoras
// (ex.: /#planos) passam a abrir a seção equivalente da página de profissionais.
const MAPA: Record<string, string> = {
  "#painel": "#painel",
  "#solucao": "#recursos",
  "#produto": "#app-do-aluno",
  "#planos": "#planos",
  "#contato": "#planos",
  "#faq": "#faq",
};

export default function RedirecionaAncorasAntigas() {
  const router = useRouter();
  useEffect(() => {
    const destino = MAPA[window.location.hash];
    if (destino) router.replace(`/profissionais${destino}`);
  }, [router]);
  return null;
}
