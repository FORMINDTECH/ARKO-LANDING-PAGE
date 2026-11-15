// Depoimentos reais, com autorização de quem falou. A seção "Quem usa, recomenda" só aparece
// quando a lista do público tiver itens. Não invente depoimentos.
//
// Exemplo de item:
//   { texto: "…", nome: "Nome Sobrenome", papel: "Personal trainer", foto: "/depoimentos/nome.webp" }

export type Depoimento = {
  texto: string;
  nome: string;
  papel: string;
  /** Caminho em /public (opcional). */
  foto?: string;
};

export const DEPOIMENTOS_PROFISSIONAIS: Depoimento[] = [];

export const DEPOIMENTOS_APP: Depoimento[] = [];
