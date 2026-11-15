import ImagemTema from "./ImagemTema";

/** Recortes de telas reais, em resolução original, nos temas claro e escuro. */
export const RECORTES = {
  sequencia: { w: 1050, h: 348, alt: "Cartão de sequência: 18 dias seguidos" },
  metas: { w: 1050, h: 261, alt: "Metas do dia: treino, calorias e água" },
  carga: { w: 1102, h: 605, alt: "Agachamento livre: +10,5 kg de carga máxima no período" },
  calorias: { w: 1050, h: 300, alt: "Resumo de calorias do dia: 1435 de 1900 kcal" },
  refeicao: { w: 1050, h: 198, alt: "Refeição registrada: café da manhã, 590 kcal" },
  treino: { w: 1026, h: 390, alt: "Cartão do Treino A, superiores, com 6 exercícios" },
  calendario: { w: 1074, h: 590, alt: "Calendário de novembro com os dias treinados marcados" },
  musculos: { w: 1102, h: 960, alt: "Mapa dos grupos musculares mais exercitados" },
  vagas: { w: 565, h: 212, alt: "Vagas disponíveis: 14 de 20" },
  convite: { w: 520, h: 110, alt: "Código de convite do profissional com botão de copiar link" },
  atividade: { w: 1115, h: 850, alt: "Atividade dos alunos com dias sem treinar" },
} as const;

export type NomeRecorte = keyof typeof RECORTES;

export default function Recorte({
  nome,
  className = "",
  sizes = "360px",
  rotulo,
}: {
  nome: NomeRecorte;
  className?: string;
  sizes?: string;
  /** Rótulo opcional em mono acima do recorte. */
  rotulo?: string;
}) {
  const r = RECORTES[nome];
  return (
    <figure className={`relative ${className}`}>
      {rotulo ? (
        <figcaption className="mb-2 flex items-center gap-2 font-data text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {rotulo}
        </figcaption>
      ) : null}
      <div
        className="tema-par overflow-hidden rounded-[16px] bg-white ring-1 ring-black/[0.06] dark:bg-[#1a1a1c] dark:ring-white/10"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        <ImagemTema base={`/screens/recortes/${nome}`} alt={r.alt} width={r.w} height={r.h} sizes={sizes} className="h-auto w-full" />
      </div>
    </figure>
  );
}
