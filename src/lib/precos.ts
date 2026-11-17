// Preço das vagas do profissional (decisão do Douglas em 2026-11-15), por mês e por aluno:
//   - personal e nutricionista: R$ 9,90 até 100 vagas; a partir do 101º aluno, R$ 8,90;
//   - consultoria: R$ 11,90 até 100 vagas; a partir do 101º aluno, R$ 10,90;
//   - mínimo de 3 vagas para começar.
// É só para exibir. Atenção: a API (API-ARKO, src/services/vinculoService.ts) e o painel
// (ARKO-WEB, src/utils/precoVagas.js) ainda calculam pela tabela antiga até serem atualizados.

export type TipoProfissional = "personal" | "consultoria";

export const PRECOS_VAGA: Record<TipoProfissional, { nome: string; cheio: number; extra: number }> = {
  personal: { nome: "Personal ou nutricionista", cheio: 9.9, extra: 8.9 },
  consultoria: { nome: "Consultoria", cheio: 11.9, extra: 10.9 },
};

/** Até aqui vale o preço cheio; daqui para cima, o preço extra. */
export const LIMITE_PRECO_CHEIO = 100;
export const MIN_VAGAS = 3;
/** Teto do seletor da calculadora (não é limite de compra). */
export const MAX_VAGAS = 200;

/** Total mensal para `vagas` alunos (respeita o mínimo de 3). */
export function calcularPrecoVagas(vagas: number, tipo: TipoProfissional = "personal"): number {
  const { cheio, extra } = PRECOS_VAGA[tipo];
  const n = Math.max(MIN_VAGAS, Math.round(vagas));
  const cheias = Math.min(n, LIMITE_PRECO_CHEIO);
  const extras = Math.max(0, n - LIMITE_PRECO_CHEIO);
  return cheias * cheio + extras * extra;
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
