// Espelha a API (API-ARKO, src/services/vinculoService.ts) e o painel (ARKO-WEB, src/utils/precoVagas.js).
// É só para exibir: o valor cobrado de verdade é sempre calculado pela API.

export type Faixa = { vagas: number; preco: number };

export const TIERS_PERSONAL_NUTRI: Faixa[] = [
  { vagas: 5, preco: 49.9 },
  { vagas: 20, preco: 179.9 },
  { vagas: 50, preco: 449.9 },
  { vagas: 100, preco: 890.9 },
];

export const TIERS_CONSULTORIA: Faixa[] = [
  { vagas: 5, preco: 59.9 },
  { vagas: 20, preco: 215.9 },
  { vagas: 50, preco: 539.9 },
  { vagas: 100, preco: 1068.9 },
];

export const MAX_VAGAS = 200;

/** Cada âncora é um preço fechado; entre âncoras o preço cresce linearmente. */
export function calcularPrecoPorTiers(vagas: number, tiers: Faixa[]): number {
  const primeiro = tiers[0];
  if (vagas <= primeiro.vagas) {
    if (vagas === primeiro.vagas) return primeiro.preco;
    return vagas * (primeiro.preco / primeiro.vagas);
  }
  for (let i = 1; i < tiers.length; i++) {
    const anterior = tiers[i - 1];
    const atual = tiers[i];
    if (vagas <= atual.vagas) {
      if (vagas === atual.vagas) return atual.preco;
      const extra = (atual.preco - anterior.preco) / (atual.vagas - anterior.vagas);
      return anterior.preco + (vagas - anterior.vagas) * extra;
    }
  }
  const ultimo = tiers[tiers.length - 1];
  const penultimo = tiers[tiers.length - 2];
  const extra = (ultimo.preco - penultimo.preco) / (ultimo.vagas - penultimo.vagas);
  return ultimo.preco + (vagas - ultimo.vagas) * extra;
}

/** Planos do praticante independente (API: PLANOS_ALUNO_INDEPENDENTE). Cobrança pela loja. */
export const PLANOS_INDEPENDENTE = [
  { id: "mensal", nome: "Mensal", preco: 14.9, meses: 1 },
  { id: "trimestral", nome: "Trimestral", preco: 39.9, meses: 3 },
  { id: "semestral", nome: "Semestral", preco: 69.9, meses: 6 },
  { id: "anual", nome: "Anual", preco: 129.9, meses: 12 },
] as const;

export const DIAS_TESTE_GRATIS = 7;

export const brl = (valor: number) =>
  valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
