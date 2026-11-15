"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// A landing antiga era uma página só, voltada a profissionais. Links já divulgados com
// essas âncoras continuam funcionando: vão para a seção equivalente da página profissional.
const MAPA: Record<string, string> = {
  "#painel": "/profissionais#planejamento",
  "#solucao": "/profissionais",
  "#planos": "/profissionais#planos",
  "#contato": "/profissionais#comecar",
  "#faq": "/profissionais#faq",
};

export default function AncorasAntigas() {
  const router = useRouter();
  useEffect(() => {
    const destino = MAPA[window.location.hash];
    if (destino) router.replace(destino);
  }, [router]);
  return null;
}
