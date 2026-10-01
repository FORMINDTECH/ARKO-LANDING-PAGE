import { ReactNode } from "react";
import {
  Dumbbell,
  Flame,
  Heart,
  LayoutGrid,
  MessageCircle,
  Ruler,
  Salad,
  Send,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

export function FeedScreen() {
  const posts = [
    { name: "Bianca Ito", text: "Bateu recorde no supino hoje! 🔥", likes: 24 },
    { name: "Rafael Souza", text: "Semana 6 do cutting, disciplina em dia.", likes: 12 },
  ];

  return (
    <div className="flex h-[392px] w-[224px] flex-col gap-3 p-4">
      <p className="text-xs font-semibold text-ink-muted">Feed dos alunos</p>
      <div className="flex flex-col gap-3">
        {posts.map((p) => (
          <div
            key={p.name}
            className="flex flex-col gap-2 rounded-xl border border-line bg-surface p-3"
          >
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-accent-panel" />
              <p className="text-[11px] font-semibold text-ink">{p.name}</p>
            </div>
            <p className="text-[10px] leading-snug text-ink-muted">{p.text}</p>
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1 text-ink-muted">
                <Heart className="h-3 w-3" strokeWidth={2.25} />
                <span className="text-[9px]">{p.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-ink-muted">
                <MessageCircle className="h-3 w-3" strokeWidth={2.25} />
                <span className="text-[9px]">Comentar</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-xl border border-line bg-surface p-3">
        <p className="text-[10px] text-ink-muted">Sequência atual</p>
        <p className="text-xl font-extrabold tracking-tight text-ink">18 dias 🔥</p>
      </div>
    </div>
  );
}

export function AiReportScreen({ compact = false }: { compact?: boolean }) {
  const insights = [
    "Adesão ao treino subiu 18% nas últimas 2 semanas",
    "Consumo de proteína abaixo da meta em 3 dos 7 dias",
    "Evolução de carga consistente em membros superiores",
  ];
  const visibleInsights = compact ? insights.slice(0, 2) : insights;

  return (
    <div
      className={`flex ${
        compact ? "h-[260px]" : "h-[392px]"
      } w-[224px] flex-col gap-4 p-4`}
    >
      <div className="flex items-center gap-2 rounded-xl bg-gradient-accent-panel p-3">
        <Sparkles className="h-4 w-4 text-white" strokeWidth={2} />
        <p className="text-[11px] font-semibold text-white">
          Relatório gerado por IA
        </p>
      </div>
      <div>
        <p className="text-[10px] font-semibold text-ink-muted">
          Resumo da semana · Marina A.
        </p>
        <div className="mt-2 flex flex-col gap-2">
          {visibleInsights.map((i) => (
            <div
              key={i}
              className="rounded-lg border border-line bg-surface px-3 py-2"
            >
              <span className="text-[10px] leading-snug text-ink">{i}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="mt-auto rounded-xl bg-accent py-2.5 text-center text-[11px] font-semibold text-white">
        Enviar para o profissional
      </button>
    </div>
  );
}

export function GamificationScreen() {
  const ranking = [
    { name: "Bianca Ito", pts: 2480 },
    { name: "Rafael Souza", pts: 2210 },
    { name: "Você (aluno)", pts: 1980 },
  ];

  return (
    <div className="flex h-[392px] w-[224px] flex-col gap-4 p-4">
      <div className="flex items-center justify-between rounded-xl border border-line bg-surface p-3">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-accent" strokeWidth={2.25} />
          <span className="text-[11px] font-semibold text-ink">
            Sequência de 18 dias
          </span>
        </div>
      </div>
      <div className="rounded-xl border border-line bg-surface p-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-accent" strokeWidth={2.25} />
          <p className="text-[10px] font-semibold text-ink-muted">Ranking do mês</p>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {ranking.map((r, i) => (
            <div key={r.name} className="flex items-center justify-between">
              <span className="text-[10px] text-ink">
                {i + 1}. {r.name}
              </span>
              <span className="text-[10px] font-semibold text-ink-muted">
                {r.pts} pts
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto grid grid-cols-3 gap-2">
        {["🔥", "💪", "🏆"].map((e, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-xl border border-line bg-surface text-base"
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressScreen() {
  const bars = [40, 55, 48, 70, 65, 82, 90];

  return (
    <div className="flex h-[392px] w-[224px] flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-info" strokeWidth={2.25} />
        <p className="text-[11px] font-semibold text-ink">Evolução · 30 dias</p>
      </div>
      <div className="flex h-28 items-end gap-1.5 rounded-xl border border-line bg-surface p-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-accent/80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-line bg-surface p-3">
          <p className="text-[9px] text-ink-muted">Peso</p>
          <p className="text-sm font-bold text-ink">-3.2 kg</p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-3">
          <p className="text-[9px] text-ink-muted">% Gordura</p>
          <p className="text-sm font-bold text-ink">-2.1%</p>
        </div>
      </div>
      <div className="mt-auto rounded-xl border border-line bg-surface p-3">
        <p className="text-[9px] text-ink-muted">Check-in de hoje</p>
        <p className="text-[10px] font-medium text-success">
          Foto e medidas enviadas
        </p>
      </div>
    </div>
  );
}

export type PanelView = "alunos" | "treinos" | "dietas" | "avaliacoes";

const WEB_NAV: { key: PanelView; icon: typeof Users; label: string }[] = [
  { key: "alunos", icon: Users, label: "Alunos" },
  { key: "treinos", icon: Dumbbell, label: "Treinos" },
  { key: "dietas", icon: Salad, label: "Dietas" },
  { key: "avaliacoes", icon: Ruler, label: "Avaliações" },
];

function PanelShell({
  active,
  title,
  subtitle,
  badge,
  compact = false,
  children,
}: {
  active: PanelView;
  title: string;
  subtitle: string;
  badge: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`flex ${compact ? "h-[178px]" : "h-[360px]"} w-full text-ink`}>
      {!compact && (
        <div className="hidden w-[168px] shrink-0 flex-col gap-1 border-r border-line p-4 sm:flex">
          <div className="mb-3 flex items-center gap-2 text-ink-muted">
            <LayoutGrid className="h-4 w-4" strokeWidth={2} />
            <span className="text-[11px] font-semibold">Painel do profissional</span>
          </div>
          {WEB_NAV.map((item) => (
            <div
              key={item.key}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] ${
                item.key === active
                  ? "bg-accent/15 font-semibold text-accent"
                  : "text-ink-muted"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" strokeWidth={2} />
              {item.label}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div
          className={
            compact
              ? "flex flex-col gap-1.5"
              : "flex items-center justify-between"
          }
        >
          <div>
            <p className="truncate text-[13px] font-bold text-ink">{title}</p>
            <p className="truncate text-[10px] text-ink-muted">{subtitle}</p>
          </div>
          <div
            className={`flex w-fit items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-[10px] font-medium text-ink-muted ${
              compact ? "" : "shrink-0"
            }`}
          >
            <Ruler className="h-3 w-3 text-info" strokeWidth={2.25} />
            {badge}
          </div>
        </div>

        {children}

        {!compact && (
          <div className="mt-auto flex items-center justify-between rounded-xl bg-gradient-accent-panel px-4 py-3">
            <span className="text-[11px] font-semibold text-white">
              Publicar no app da aluna
            </span>
            <Send className="h-4 w-4 text-white" strokeWidth={2.25} />
          </div>
        )}
      </div>
    </div>
  );
}

function RowList({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2"
        >
          <span className="text-[11px] text-ink">{r.label}</span>
          <span className="text-[11px] font-medium text-ink-muted">
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const TREINO_ROWS = [
  { label: "Supino reto", value: "4x10" },
  { label: "Remada curvada", value: "4x12" },
  { label: "Elevação lateral", value: "3x15" },
  { label: "Rosca direta", value: "3x12" },
];

const DIETA_ROWS = [
  { label: "Café da manhã", value: "420 kcal" },
  { label: "Almoço", value: "680 kcal" },
  { label: "Lanche da tarde", value: "250 kcal" },
  { label: "Jantar", value: "590 kcal" },
];

const AVALIACAO_ROWS = [
  { label: "Peso", value: "68,4 kg" },
  { label: "% Gordura", value: "22,1%" },
  { label: "Cintura", value: "74 cm" },
  { label: "Braço", value: "29 cm" },
];

const ALUNOS_ROWS = [
  { name: "Marina Alves", progress: 82, status: "Em dia" },
  { name: "Rafael Souza", progress: 64, status: "Atenção" },
  { name: "Bianca Ito", progress: 95, status: "Em dia" },
];

export function WebPanelScreen({
  view,
  compact = false,
}: {
  view: PanelView;
  compact?: boolean;
}) {
  if (view === "dietas") {
    return (
      <PanelShell
        active="dietas"
        title="Montando dieta · Marina Alves"
        subtitle="Meta: 1.800 kcal/dia"
        badge="Avaliação em dia"
        compact={compact}
      >
        <RowList rows={compact ? DIETA_ROWS.slice(0, 2) : DIETA_ROWS} />
      </PanelShell>
    );
  }

  if (view === "avaliacoes") {
    return (
      <PanelShell
        active="avaliacoes"
        title="Avaliação física · Marina Alves"
        subtitle="Última avaliação há 7 dias"
        badge="No prazo"
        compact={compact}
      >
        <RowList rows={compact ? AVALIACAO_ROWS.slice(0, 2) : AVALIACAO_ROWS} />
      </PanelShell>
    );
  }

  if (view === "alunos") {
    return (
      <PanelShell
        active="alunos"
        title="Seus alunos"
        subtitle="32 alunos ativos"
        badge="Retenção 94%"
        compact={compact}
      >
        <div className="flex flex-col gap-2">
          {(compact ? ALUNOS_ROWS.slice(0, 2) : ALUNOS_ROWS).map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2"
            >
              <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-accent-panel" />
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-ink">{s.name}</p>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
              </div>
              <span
                className={`text-[9px] font-medium ${
                  s.status === "Em dia" ? "text-success" : "text-danger"
                }`}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </PanelShell>
    );
  }

  return (
    <PanelShell
      active="treinos"
      title="Montando treino · Marina Alves"
      subtitle="Peito & Costas · Semana 6"
      badge="Avaliação em dia"
      compact={compact}
    >
      <RowList rows={compact ? TREINO_ROWS.slice(0, 2) : TREINO_ROWS} />
    </PanelShell>
  );
}
