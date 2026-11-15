"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, Hand } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import Phone, { TELAS_APP, type TelaApp } from "../devices/Phone";
import ImagemTema from "../devices/ImagemTema";

/*
 * Demonstração interativa do app. O celular funciona como um protótipo:
 *  - a barra de abas do próprio app é clicável;
 *  - "Acompanhar evolução" abre a tela de evolução (transição de navegação do iOS) e a seta volta;
 *  - dá para arrastar a tela para os lados;
 *  - pontos pulsantes destacam partes da tela, que "saem" do celular em 3D (o recorte é da própria captura);
 *  - o aparelho inclina seguindo o ponteiro.
 * Enquanto ninguém mexe, a demonstração roda sozinha.
 */

// Geometria das capturas (px em 1170 × 2532)
const LARG = 1170;
const ALT = 2532;

type Destaque = {
  id: string;
  rotulo: string;
  /** Recorte da captura: x, y, largura, altura (px). */
  caixa: [number, number, number, number];
  /** Para onde o recorte vai no desktop, em larguras da tela: x, y (topo) e largura. */
  alvo: [number, number, number];
};

type Capitulo = {
  id: string;
  rotulo: string;
  titulo: string;
  texto: string;
  pontos: string[];
  tela: TelaApp;
  destaques: Destaque[];
};

// Tudo aqui existe no app hoje (ver Fluxos-de-usuarios no ARKO-MOBILE).
const CAPITULOS: Capitulo[] = [
  {
    id: "inicio",
    rotulo: "Início",
    titulo: "Seu dia num olhar.",
    texto: "A tela inicial junta a sua sequência de dias treinados e as metas de hoje: treino, calorias e água. O mascote acompanha o seu ritmo.",
    pontos: ["Sequência da semana", "Metas de treino, calorias e água", "Desafios com os amigos"],
    tela: "inicio",
    destaques: [
      { id: "sequencia", rotulo: "Sequência", caixa: [60, 778, 1050, 348], alvo: [-0.86, 0.26, 1.02] },
      { id: "metas", rotulo: "Metas do dia", caixa: [60, 1255, 1050, 261], alvo: [0.78, 0.5, 1.0] },
    ],
  },
  {
    id: "treinos",
    rotulo: "Treinos",
    titulo: "Seu plano de treino, do seu jeito.",
    texto: "Monte a sua divisão de treinos com exercícios, séries e carga. Na academia, o app marca as séries e conta o descanso por você.",
    pontos: ["Musculação, cardio com GPS e alongamento", "Timer de treino e de descanso", "Até 3 fotos por treino"],
    tela: "treinos",
    destaques: [{ id: "treino", rotulo: "Treino A", caixa: [72, 468, 1026, 390], alvo: [-0.9, 0.3, 1.02] }],
  },
  {
    id: "evolucao",
    rotulo: "Evolução",
    titulo: "Veja a carga subir.",
    texto: "Gráficos de frequência e de progressão de carga por exercício, o mapa dos músculos que você mais treinou e relatórios de evolução gerados por IA.",
    pontos: ["Progressão de carga por exercício", "Mapa de grupos musculares", "Relatórios gerados por IA, em PDF"],
    tela: "carga",
    destaques: [
      { id: "carga", rotulo: "Progressão de carga", caixa: [48, 610, 1102, 605], alvo: [-0.95, 0.16, 1.05] },
      { id: "musculos", rotulo: "Grupos musculares", caixa: [48, 1280, 1102, 960], alvo: [0.8, 0.42, 0.8] },
    ],
  },
  {
    id: "alimentacao",
    rotulo: "Alimentação",
    titulo: "Comer bem, sem planilha.",
    texto: "Registre as refeições pelo catálogo de alimentos ou apontando a câmera para o código de barras. Calorias, macros e água vão somando ao longo do dia.",
    pontos: ["Leitor de código de barras", "Metas de calorias, macros e água", "Refeições salvas para repetir"],
    tela: "alimentacao",
    destaques: [
      { id: "calorias", rotulo: "Calorias do dia", caixa: [60, 872, 1050, 300], alvo: [-0.9, 0.28, 1.02] },
      { id: "refeicao", rotulo: "Refeição", caixa: [60, 1342, 1050, 198], alvo: [0.8, 0.56, 0.96] },
    ],
  },
  {
    id: "constancia",
    rotulo: "Constância",
    titulo: "Uma sequência que dá vontade de manter.",
    texto: "Cada dia treinado entra no calendário e soma na sua sequência. Precisa descansar? Congele até dois dias por semana sem perder o ritmo.",
    pontos: ["Calendário de treinos", "Sequência com dias congelados", "Desafios em grupo"],
    tela: "calendario",
    destaques: [{ id: "calendario", rotulo: "Dias treinados", caixa: [48, 600, 1074, 590], alvo: [-0.95, 0.3, 1.05] }],
  },
  {
    id: "comunidade",
    rotulo: "Comunidade",
    titulo: "Treino bom merece plateia.",
    texto: "Publique o treino do dia com foto, duração e volume levantado. Siga amigos, curta e comente. E, se um dia quiser ajuda, encontre um profissional na vitrine do app.",
    pontos: ["Feed com amigos ou geral", "Curtidas e comentários", "Vitrine de profissionais"],
    tela: "feed",
    destaques: [],
  },
];

const N = CAPITULOS.length;
const IDX = Object.fromEntries(CAPITULOS.map((c, i) => [c.id, i])) as Record<string, number>;
/** Abas do app, da esquerda para a direita. */
const ABAS = [
  { capitulo: IDX.treinos, rotulo: "Treinos" },
  { capitulo: IDX.constancia, rotulo: "Calendário" },
  { capitulo: IDX.inicio, rotulo: "Início" },
  { capitulo: IDX.comunidade, rotulo: "Feed" },
  { capitulo: IDX.alimentacao, rotulo: "Alimentação" },
];
const ABA_TOPO = 2300 / ALT;

const TEMPO_CAPITULO = 7000;
const IOS = "cubic-bezier(0.32, 0.72, 0, 1)";
const MOLA = "cubic-bezier(0.34, 1.4, 0.64, 1)";

type Tipo = "aba" | "push" | "pop" | "deslize";
type Geo = { x: number; y: number; w: number; h: number; largo: boolean };

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

function ListaPontos({ pontos }: { pontos: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-2">
      {pontos.map((p) => (
        <li key={p} className="flex items-center gap-3 text-[0.95rem] text-ink">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

export default function TourApp() {
  const [atual, setAtual] = useState(0);
  const [aberto, setAberto] = useState<string | null>(null);
  const [interagiu, setInteragiu] = useState(false);
  const [emVista, setEmVista] = useState(false);
  const [reduzir, setReduzir] = useState(false);
  const [geo, setGeo] = useState<Geo | null>(null);

  const secao = useRef<HTMLElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const inclina = useRef<HTMLDivElement>(null);
  const camada = useRef<HTMLDivElement>(null);
  const telas = useRef<(HTMLDivElement | null)[]>([]);
  const atualRef = useRef(0);
  const fechar = useRef<number | undefined>(undefined);

  useEffect(() => {
    setReduzir(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = secao.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setEmVista(e.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Mede onde fica a tela dentro do aparelho (sem contar a inclinação)
  useLayoutEffect(() => {
    const base = inclina.current;
    if (!base) return;
    const medir = () => {
      const tela = base.querySelector<HTMLElement>("[data-tela]");
      if (!tela) return;
      let x = 0;
      let y = 0;
      let el: HTMLElement | null = tela;
      while (el && el !== base) {
        x += el.offsetLeft;
        y += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
      }
      setGeo({ x, y, w: tela.offsetWidth, h: tela.offsetHeight, largo: window.innerWidth >= 1024 });
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(base);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);

  const duracao = (ms: number) => (reduzir ? 1 : ms);

  /** Troca de tela dentro do celular, com a transição de cada tipo de navegação. */
  const navegar = useCallback(
    (para: number, tipo: Tipo, dir = 1, dx = 0) => {
      const de = atualRef.current;
      if (para === de) return;
      setAberto(null);
      const a = telas.current[de];
      const b = telas.current[para];
      if (!a || !b) return;
      telas.current.forEach((t, i) => {
        if (!t) return;
        t.getAnimations().forEach((an) => an.cancel());
        if (i !== de && i !== para) t.style.visibility = "hidden";
      });
      a.style.transform = "";
      b.style.transform = "";
      b.style.visibility = "visible";
      a.style.visibility = "visible";
      const w = a.offsetWidth || 1;

      let entra: Keyframe[];
      let sai: Keyframe[];
      let ms = 420;
      let curva = IOS;
      if (tipo === "push") {
        b.style.zIndex = "2";
        a.style.zIndex = "1";
        entra = [{ transform: "translateX(100%)", boxShadow: "-20px 0 40px rgba(0,0,0,0.25)" }, { transform: "translateX(0)", boxShadow: "-20px 0 40px rgba(0,0,0,0)" }];
        sai = [{ transform: "translateX(0)", filter: "brightness(1)" }, { transform: "translateX(-28%)", filter: "brightness(0.65)" }];
        ms = 520;
      } else if (tipo === "pop") {
        a.style.zIndex = "2";
        b.style.zIndex = "1";
        entra = [{ transform: "translateX(-28%)", filter: "brightness(0.65)" }, { transform: "translateX(0)", filter: "brightness(1)" }];
        sai = [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }];
        ms = 480;
      } else if (tipo === "deslize") {
        b.style.zIndex = "2";
        a.style.zIndex = "1";
        entra = [{ transform: `translateX(${dir * w + dx}px)` }, { transform: "translateX(0)" }];
        sai = [{ transform: `translateX(${dx}px)`, filter: "brightness(1)" }, { transform: `translateX(${-dir * w * 0.3}px)`, filter: "brightness(0.7)" }];
        ms = 460;
      } else {
        b.style.zIndex = "2";
        a.style.zIndex = "1";
        entra = [{ opacity: 0, transform: "scale(0.965)" }, { opacity: 1, transform: "scale(1)" }];
        sai = [{ opacity: 1 }, { opacity: 0.4 }];
        ms = 380;
        curva = "cubic-bezier(0.22, 1, 0.36, 1)";
      }
      b.animate(entra, { duration: duracao(ms), easing: curva });
      const s = a.animate(sai, { duration: duracao(ms), easing: curva, fill: "forwards" });
      s.onfinish = () => {
        if (atualRef.current !== de) {
          a.style.visibility = "hidden";
          s.cancel();
        }
      };
      atualRef.current = para;
      setAtual(para);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reduzir]
  );

  /** Escolha a partir da lista de capítulos: usa a navegação que o app usaria. */
  const irPara = useCallback(
    (para: number) => {
      const de = atualRef.current;
      if (de === IDX.treinos && para === IDX.evolucao) navegar(para, "push");
      else if (de === IDX.evolucao && para === IDX.treinos) navegar(para, "pop");
      else navegar(para, "aba");
    },
    [navegar]
  );

  // Demonstração automática: mostra um destaque e passa para o próximo capítulo
  const tocando = emVista && !interagiu && !reduzir;
  useEffect(() => {
    if (!tocando) return;
    const cap = CAPITULOS[atual];
    const timers = [
      cap.destaques[0] ? window.setTimeout(() => setAberto(cap.destaques[0].id), 1400) : 0,
      window.setTimeout(() => setAberto(null), 4800),
      window.setTimeout(() => irPara((atual + 1) % N), TEMPO_CAPITULO),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [tocando, atual, irPara]);

  const marcarInteracao = () => {
    if (!interagiu) {
      setInteragiu(true);
      setAberto(null);
    }
  };

  // Inclinação 3D seguindo o ponteiro (só com mouse)
  useEffect(() => {
    const p = palco.current;
    const alvo = inclina.current;
    if (!p || !alvo || reduzir || !window.matchMedia("(pointer: fine)").matches) return;
    let rx = 0;
    let ry = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    const passo = () => {
      rx += (tx - rx) * 0.08;
      ry += (ty - ry) * 0.08;
      alvo.style.transform = `perspective(1400px) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
      raf = Math.abs(tx - rx) + Math.abs(ty - ry) > 0.01 ? requestAnimationFrame(passo) : 0;
    };
    const mover = (e: PointerEvent) => {
      const r = p.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      ty = x * 12;
      tx = -y * 8;
      if (!raf) raf = requestAnimationFrame(passo);
    };
    const sair = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(passo);
    };
    p.addEventListener("pointermove", mover);
    p.addEventListener("pointerleave", sair);
    return () => {
      p.removeEventListener("pointermove", mover);
      p.removeEventListener("pointerleave", sair);
      cancelAnimationFrame(raf);
    };
  }, [reduzir]);

  // Arrastar a tela para os lados
  const arraste = useRef<{ id: number; x0: number; y0: number; dx: number; ativo: boolean; vizinho: number; t0: number } | null>(null);
  const bloqueiaClique = useRef(false);

  const aoApertar = (e: React.PointerEvent) => {
    marcarInteracao();
    bloqueiaClique.current = false;
    arraste.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, dx: 0, ativo: false, vizinho: -1, t0: performance.now() };
  };
  const aoMover = (e: React.PointerEvent) => {
    const d = arraste.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x0;
    const dy = e.clientY - d.y0;
    if (!d.ativo) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
      d.ativo = true;
      bloqueiaClique.current = true;
      setAberto(null);
      camada.current?.setPointerCapture(e.pointerId);
    }
    d.dx = dx;
    const de = atualRef.current;
    const a = telas.current[de];
    if (!a) return;
    const w = a.offsetWidth;
    const viz = dx < 0 ? (de + 1) % N : (de - 1 + N) % N;
    if (d.vizinho !== viz && d.vizinho >= 0) {
      const velho = telas.current[d.vizinho];
      if (velho) velho.style.visibility = "hidden";
    }
    d.vizinho = viz;
    const b = telas.current[viz];
    a.getAnimations().forEach((an) => an.cancel());
    a.style.transform = `translateX(${dx}px)`;
    a.style.zIndex = "1";
    if (b) {
      b.getAnimations().forEach((an) => an.cancel());
      b.style.visibility = "visible";
      b.style.zIndex = "2";
      b.style.transform = `translateX(${(dx < 0 ? w : -w) + dx}px)`;
    }
  };
  const aoSoltar = (e: React.PointerEvent) => {
    const d = arraste.current;
    arraste.current = null;
    if (!d || !d.ativo || d.id !== e.pointerId) return;
    const de = atualRef.current;
    const a = telas.current[de];
    const b = telas.current[d.vizinho];
    if (!a) return;
    const w = a.offsetWidth;
    const vel = Math.abs(d.dx) / Math.max(1, performance.now() - d.t0);
    if (Math.abs(d.dx) > w * 0.22 || vel > 0.6) {
      navegar(d.vizinho, "deslize", d.dx < 0 ? 1 : -1, d.dx);
    } else {
      // volta para o lugar
      a.animate([{ transform: `translateX(${d.dx}px)` }, { transform: "translateX(0)" }], { duration: duracao(320), easing: IOS });
      a.style.transform = "";
      if (b) {
        const ida = d.dx < 0 ? w : -w;
        const an = b.animate([{ transform: `translateX(${ida + d.dx}px)` }, { transform: `translateX(${ida}px)` }], { duration: duracao(320), easing: IOS });
        an.onfinish = () => {
          b.style.visibility = "hidden";
          b.style.transform = "";
        };
      }
    }
  };
  // um arraste não vira clique numa aba
  const aoCapturarClique = (e: React.MouseEvent) => {
    if (bloqueiaClique.current) {
      e.stopPropagation();
      e.preventDefault();
      bloqueiaClique.current = false;
    }
  };

  const abrir = (id: string) => {
    window.clearTimeout(fechar.current);
    setAberto(id);
  };
  const agendarFechar = () => {
    window.clearTimeout(fechar.current);
    fechar.current = window.setTimeout(() => setAberto(null), 220);
  };

  const cap = CAPITULOS[atual];
  const destaqueAberto = cap.destaques.find((d) => d.id === aberto);

  return (
    <section ref={secao} id="experiencia" aria-labelledby="experiencia-titulo" className="relative py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Por dentro do app</p>
          <h2 id="experiencia-titulo" className="mt-4 text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
            Telas reais.
            <br /> Pode mexer.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
            Use o celular como se fosse o seu: toque nas abas do app, arraste a tela para os lados e passe pelos pontos laranja.
          </p>
        </Reveal>

        <div className="mt-10 grid items-center gap-10 lg:mt-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
          {/* Capítulos (desktop) */}
          <ol className="hidden flex-col gap-1 lg:flex" aria-label="Partes do app">
            {CAPITULOS.map((c, i) => {
              const ativo = atual === i;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      marcarInteracao();
                      irPara(i);
                    }}
                    aria-current={ativo ? "step" : undefined}
                    className={`group relative w-full overflow-hidden rounded-2xl px-5 py-4 text-left transition-[background-color,box-shadow] duration-500 ${
                      ativo ? "bg-surface" : "hover:bg-surface/60"
                    }`}
                    style={ativo ? { boxShadow: "var(--shadow-card)" } : undefined}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className={`font-data text-[11px] font-semibold transition-colors duration-500 ${ativo ? "text-accent-ink" : "text-ink-soft"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-bold transition-colors duration-500 ${ativo ? "text-ink" : "text-ink-muted group-hover:text-ink"}`}>{c.rotulo}</span>
                    </span>
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-[650ms] ease-out-expo ${
                        ativo ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="min-h-0 overflow-hidden pl-[1.85rem]">
                        <span className="mt-2 block text-[1.5rem] font-extrabold leading-[1.1] tracking-tight" style={{ fontFamily: "var(--font-archivo)", fontStretch: "125%" }}>
                          {c.titulo}
                        </span>
                        <span className="mt-2 block leading-relaxed text-ink-muted">{c.texto}</span>
                        <ListaPontos pontos={c.pontos} />
                      </span>
                    </span>
                    {ativo && tocando ? (
                      <span
                        key={`barra-${atual}`}
                        aria-hidden
                        className="absolute bottom-0 left-5 right-5 h-[2px] origin-left rounded-full bg-accent"
                        style={{ animation: `progresso-cap ${TEMPO_CAPITULO}ms linear both` }}
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Capítulos (mobile) */}
          <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:-mx-8 sm:px-8 lg:hidden" role="tablist" aria-label="Partes do app">
            {CAPITULOS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={atual === i}
                onClick={() => {
                  marcarInteracao();
                  irPara(i);
                }}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                  atual === i ? "border-ink bg-ink text-bg" : "border-line-strong text-ink-muted"
                }`}
              >
                {c.rotulo}
              </button>
            ))}
          </div>

          {/* Palco do celular */}
          <div ref={palco} className="relative flex flex-col items-center py-4 lg:py-10">
            <div aria-hidden className="glow left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2" />
            <div ref={inclina} className="relative w-[262px] sm:w-[284px] xl:w-[300px]" style={{ transformStyle: "preserve-3d" }}>
              <Phone>
                <div className={`absolute inset-0 transition-[filter] duration-500 ${destaqueAberto ? "brightness-[0.62] dark:brightness-[0.55]" : ""}`}>
                  {CAPITULOS.map((c, i) => (
                    <div
                      key={c.id}
                      ref={(el) => {
                        telas.current[i] = el;
                      }}
                      aria-hidden={atual !== i}
                      className="absolute inset-0 overflow-hidden"
                      style={{ zIndex: i === 0 ? 2 : 1, visibility: i === 0 ? "visible" : "hidden" }}
                    >
                      <ImagemTema base={TELAS_APP[c.tela].base} alt={TELAS_APP[c.tela].alt} fill sizes="400px" priority={i === 0} className="object-cover object-top" />
                    </div>
                  ))}
                </div>

                {/* camada de interação: abas, botões do app, destaques e arraste */}
                <div
                  ref={camada}
                  className="absolute inset-0 z-10 touch-pan-y"
                  onPointerDown={aoApertar}
                  onPointerMove={aoMover}
                  onPointerUp={aoSoltar}
                  onPointerCancel={aoSoltar}
                  onClickCapture={aoCapturarClique}
                >
                  {/* área de origem do destaque aberto */}
                  {destaqueAberto ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute rounded-[10px] border border-dashed border-accent/70"
                      style={{
                        left: pct(destaqueAberto.caixa[0], LARG),
                        top: pct(destaqueAberto.caixa[1], ALT),
                        width: pct(destaqueAberto.caixa[2], LARG),
                        height: pct(destaqueAberto.caixa[3], ALT),
                      }}
                    />
                  ) : null}

                  {cap.destaques.map((d) => (
                    <button
                      key={`${cap.id}-${d.id}`}
                      type="button"
                      aria-label={`Destacar: ${d.rotulo}`}
                      aria-pressed={aberto === d.id}
                      onPointerEnter={(e) => e.pointerType === "mouse" && abrir(d.id)}
                      onPointerLeave={(e) => e.pointerType === "mouse" && agendarFechar()}
                      onFocus={() => abrir(d.id)}
                      onBlur={agendarFechar}
                      onClick={() => {
                        marcarInteracao();
                        if (aberto === d.id) setAberto(null);
                        else abrir(d.id);
                      }}
                      className="absolute cursor-zoom-in rounded-[10px] focus-visible:outline-offset-0"
                      style={{
                        left: pct(d.caixa[0], LARG),
                        top: pct(d.caixa[1], ALT),
                        width: pct(d.caixa[2], LARG),
                        height: pct(d.caixa[3], ALT),
                      }}
                    >
                      <span
                        aria-hidden
                        className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center transition-[opacity,transform] duration-300 ${
                          aberto === d.id ? "scale-50 opacity-0" : "scale-100 opacity-100"
                        }`}
                      >
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent/50 [animation-duration:2.2s]" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(255,255,255,0.85)]" />
                      </span>
                    </button>
                  ))}

                  {/* botões reais do app */}
                  {cap.id === "treinos" ? (
                    <button
                      type="button"
                      aria-label="Abrir Acompanhar evolução"
                      onClick={() => {
                        marcarInteracao();
                        navegar(IDX.evolucao, "push");
                      }}
                      className="absolute rounded-[12px]"
                      style={{ left: pct(40, LARG), top: pct(200, ALT), width: pct(1090, LARG), height: pct(170, ALT) }}
                    >
                      <span aria-hidden className="absolute right-[6%] top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center">
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent/50 [animation-duration:2.2s]" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(255,255,255,0.85)]" />
                      </span>
                    </button>
                  ) : null}
                  {cap.id === "evolucao" ? (
                    <button
                      type="button"
                      aria-label="Voltar para Treinos"
                      onClick={() => {
                        marcarInteracao();
                        navegar(IDX.treinos, "pop");
                      }}
                      className="absolute rounded-full"
                      style={{ left: pct(30, LARG), top: pct(70, ALT), width: pct(160, LARG), height: pct(180, ALT) }}
                    />
                  ) : null}

                  {/* barra de abas do app */}
                  <div className="absolute inset-x-0 bottom-0 grid grid-cols-5" style={{ top: `${ABA_TOPO * 100}%` }}>
                    {ABAS.map((aba) => (
                      <button
                        key={aba.rotulo}
                        type="button"
                        aria-label={`Aba ${aba.rotulo}`}
                        onClick={() => {
                          marcarInteracao();
                          navegar(aba.capitulo, "aba");
                        }}
                        className="h-full w-full rounded-lg transition-colors hover:bg-accent/10 active:bg-accent/20"
                      />
                    ))}
                  </div>
                </div>
              </Phone>

              {/* recortes que saem da tela */}
              {geo
                ? CAPITULOS.map((c, i) =>
                    c.destaques.map((d) => {
                      const ativo = atual === i && aberto === d.id;
                      const ox = geo.x + (d.caixa[0] / LARG) * geo.w;
                      const oy = geo.y + (d.caixa[1] / ALT) * geo.h;
                      const ow = (d.caixa[2] / LARG) * geo.w;
                      let tx: number;
                      let ty: number;
                      let s: number;
                      if (geo.largo) {
                        const [ax, ay, aw] = d.alvo;
                        s = (aw * geo.w) / ow;
                        tx = geo.x + ax * geo.w - ox;
                        ty = geo.y + ay * geo.h - oy;
                      } else {
                        // no celular, o recorte sobe no próprio lugar
                        s = 1.1;
                        tx = (-ow * 0.1) / 2;
                        ty = -10;
                      }
                      return (
                        <div
                          key={`${c.id}-${d.id}`}
                          aria-hidden
                          className="pointer-events-none absolute left-0 top-0 z-20 origin-top-left"
                          style={{
                            left: ox,
                            top: oy,
                            width: ow,
                            opacity: ativo ? 1 : 0,
                            transform: ativo ? `translate3d(${tx}px, ${ty}px, 60px) scale(${s})` : "translate3d(0,0,0) scale(1)",
                            transition: ativo
                              ? `transform ${duracao(720)}ms ${MOLA}, opacity 0ms`
                              : `transform ${duracao(480)}ms ${IOS}, opacity ${duracao(160)}ms linear ${duracao(440)}ms`,
                          }}
                        >
                          <div
                            className="tema-par overflow-hidden rounded-[10px] transition-shadow duration-500"
                            style={{ boxShadow: ativo ? "0 30px 60px -18px rgba(11,11,12,0.45), 0 0 0 1px rgba(253,130,15,0.35)" : "none" }}
                          >
                            <ImagemTema base={`/screens/recortes/${d.id}`} alt="" width={d.caixa[2]} height={d.caixa[3]} sizes="420px" className="h-auto w-full" />
                          </div>
                          <span
                            className="absolute -top-7 left-0 font-data text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-opacity duration-300"
                            style={{ opacity: ativo && geo.largo ? 1 : 0, transform: `scale(${1 / s})`, transformOrigin: "left bottom" }}
                          >
                            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
                            {d.rotulo}
                          </span>
                        </div>
                      );
                    })
                  )
                : null}
            </div>

            {/* dica de uso */}
            <p
              className={`mt-7 flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs font-semibold text-ink-muted backdrop-blur transition-[opacity,transform] duration-700 ${
                interagiu ? "translate-y-1 opacity-0" : "opacity-100"
              }`}
              aria-hidden={interagiu}
            >
              <Hand className="h-3.5 w-3.5 text-accent-ink" strokeWidth={2.25} />
              Toque nas abas · arraste para o lado
            </p>
          </div>

          {/* Texto do capítulo (mobile) */}
          <div className="lg:hidden" aria-live="polite">
            <p className="font-data text-[11px] font-semibold tracking-[0.14em] text-ink-soft">
              <span className="text-accent-ink">{String(atual + 1).padStart(2, "0")}</span> · {cap.rotulo.toUpperCase()}
            </p>
            <h3 className="mt-3 text-[1.6rem] font-extrabold leading-[1.08] tracking-tight">{cap.titulo}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{cap.texto}</p>
            <ListaPontos pontos={cap.pontos} />
          </div>
        </div>
      </Container>
    </section>
  );
}
