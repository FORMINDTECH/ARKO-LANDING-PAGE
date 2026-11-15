"use client";

import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import Container from "../Container";
import Reveal from "../Reveal";
import Ampliavel from "../Ampliavel";
import Browser from "../devices/Browser";
import Phone from "../devices/Phone";
import Titulo from "../ui/Titulo";

/**
 * Conceito: um palco com um interruptor. O mesmo espaço mostra o produto pelos dois lados:
 * três telas do app em leque ou o painel em tamanho grande. Troca por crossfade (o mesmo
 * movimento do carrossel do painel na landing original).
 */
const LADOS = [
  { id: "app", label: "App de quem treina", curto: "App", icon: Smartphone },
  { id: "painel", label: "Painel do profissional", curto: "Painel", icon: Monitor },
] as const;

type Lado = (typeof LADOS)[number]["id"];

export default function Vitrine() {
  const [lado, setLado] = useState<Lado>("app");

  return (
    <section id="produto" className="relative py-24 sm:py-32">
      <Container>
        <Titulo
          centro
          rotulo="Por dentro"
          titulo="Um produto de verdade, dos dois lados da tela."
          apoio="Estas são telas reais do app e do painel, com dados de exemplo."
        />

        <Reveal delay={100} className="mt-10 flex justify-center">
          <div role="tablist" aria-label="Escolha o lado do produto" className="inline-flex rounded-2xl bg-surface-2 p-1.5">
            {LADOS.map(({ id, label, curto, icon: Icon }) => {
              const ativo = lado === id;
              return (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  aria-selected={ativo}
                  aria-controls={`vitrine-${id}`}
                  onClick={() => setLado(id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-5 ${
                    ativo ? "bg-surface text-ink shadow-sm" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${ativo ? "text-accent" : ""}`} strokeWidth={2} />
                  <span className="sm:hidden">{curto}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={150} direction="scale" className="mt-10">
          <div className="relative overflow-hidden rounded-[28px] bg-surface-2 px-4 pb-0 pt-10 sm:px-10 sm:pt-14">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/10 to-transparent" />
            <div className="grid">
              {/* App: três telas em leque */}
              <div
                id="vitrine-app"
                role="tabpanel"
                aria-hidden={lado !== "app"}
                className={`col-start-1 row-start-1 flex items-end justify-center transition-[opacity,transform] duration-[900ms] ease-in-out ${
                  lado === "app" ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0"
                }`}
              >
                <div className="flex w-full max-w-[860px] translate-y-[10%] items-end justify-center gap-3 sm:gap-6">
                  <Phone
                    tela="treinos"
                    className="w-[30%] max-w-[250px] -rotate-[5deg] translate-y-[6%]"
                    sizes="(min-width: 1024px) 250px, 30vw"
                  />
                  <Phone tela="inicio" className="z-10 w-[36%] max-w-[300px]" sizes="(min-width: 1024px) 300px, 36vw" brilho />
                  <Phone
                    tela="alimentacao"
                    className="w-[30%] max-w-[250px] rotate-[5deg] translate-y-[6%]"
                    sizes="(min-width: 1024px) 250px, 30vw"
                  />
                </div>
              </div>

              {/* Painel: tela grande, sangrando para baixo */}
              <div
                id="vitrine-painel"
                role="tabpanel"
                aria-hidden={lado !== "painel"}
                className={`col-start-1 row-start-1 flex items-end justify-center transition-[opacity,transform] duration-[900ms] ease-in-out ${
                  lado === "painel" ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0"
                }`}
              >
                <Ampliavel className="w-full max-w-5xl translate-y-[6%]">
                  <Browser tela="treinos" sizes="(min-width: 1280px) 1024px, 92vw" />
                </Ampliavel>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
