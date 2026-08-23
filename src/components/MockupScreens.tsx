import { Flame, Sparkles, TrendingUp, Trophy } from "lucide-react";

export function DashboardScreen() {
  const students = [
    { name: "Marina Alves", progress: 82, status: "Em dia" },
    { name: "Rafael Souza", progress: 64, status: "Atenção" },
    { name: "Bianca Ito", progress: 95, status: "Em dia" },
  ];

  return (
    <div className="flex h-[420px] w-[224px] flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-ink-muted">Seus alunos</span>
        <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-accent">
          32 ativos
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {students.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface p-2.5"
          >
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-accent-panel" />
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
      <div className="mt-auto rounded-xl border border-line bg-surface p-3">
        <p className="text-[10px] text-ink-muted">Retenção mensal</p>
        <p className="text-xl font-extrabold tracking-tight text-ink">94%</p>
      </div>
    </div>
  );
}

export function AiWorkoutScreen() {
  const rows = [
    "Supino reto · 4x10",
    "Remada curvada · 4x12",
    "Elevação lateral · 3x15",
    "Rosca direta · 3x12",
  ];

  return (
    <div className="flex h-[420px] w-[224px] flex-col gap-4 p-4">
      <div className="flex items-center gap-2 rounded-xl bg-gradient-accent-panel p-3">
        <Sparkles className="h-4 w-4 text-white" strokeWidth={2} />
        <p className="text-[11px] font-semibold text-white">
          Treino gerado por IA
        </p>
      </div>
      <div>
        <p className="text-[10px] font-semibold text-ink-muted">
          Peito &amp; Costas · Marina A.
        </p>
        <div className="mt-2 flex flex-col gap-2">
          {rows.map((r) => (
            <div
              key={r}
              className="flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2"
            >
              <span className="text-[10px] text-ink">{r}</span>
              <div className="h-3.5 w-3.5 rounded-full border border-line" />
            </div>
          ))}
        </div>
      </div>
      <button className="mt-auto rounded-xl bg-accent py-2.5 text-center text-[11px] font-semibold text-white">
        Enviar para o aluno
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
    <div className="flex h-[420px] w-[224px] flex-col gap-4 p-4">
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
    <div className="flex h-[420px] w-[224px] flex-col gap-4 p-4">
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
