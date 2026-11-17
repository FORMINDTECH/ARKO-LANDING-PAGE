"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mascote animado (vídeo WebM com transparência, 60 fps), em loop e sem som.
 * - Só baixa o vídeo quando a seção chega perto da tela, e só toca enquanto está visível.
 * - Safari não mostra a transparência do WebM (VP9 com alfa): lá fica a pose parada equivalente.
 * - No servidor e antes de montar, aparece a pose parada (sem salto de layout: mesma proporção).
 */
export default function MascoteAnimado({
  video,
  poster,
  largura,
  altura,
  alt,
  className = "",
}: {
  /** Caminho do .webm em /public. */
  video: string;
  /** Pose parada (WebP) para Safari e para antes de carregar. */
  poster: string;
  /** Proporção do vídeo (largura × altura em px). */
  largura: number;
  altura: number;
  alt: string;
  className?: string;
}) {
  const caixa = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const [usarVideo, setUsarVideo] = useState(false);
  const [perto, setPerto] = useState(false);
  const [pronto, setPronto] = useState(false);

  // Decide no navegador se dá para usar o vídeo com transparência.
  useEffect(() => {
    const ua = navigator.userAgent;
    const safari = /^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(ua);
    const suporta = document.createElement("video").canPlayType('video/webm; codecs="vp09.00.10.08"') !== "";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depende do navegador, só existe no cliente
    setUsarVideo(!safari && suporta);
  }, []);

  // Carrega quando chega perto; toca só enquanto aparece.
  useEffect(() => {
    const el = caixa.current;
    if (!el || !usarVideo) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setPerto(true);
        const v = ref.current;
        if (!v) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [usarVideo]);

  return (
    <div ref={caixa} className={`relative ${className}`} style={{ aspectRatio: `${largura} / ${altura}` }}>
      {/* pose parada: some com um fade quando o vídeo começa */}
      {/* eslint-disable-next-line @next/next/no-img-element -- imagem pequena e local, sem otimização */}
      <img
        src={poster}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
          pronto ? "opacity-0" : "opacity-100"
        }`}
      />
      {usarVideo && perto ? (
        <video
          ref={ref}
          src={video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          onPlaying={() => setPronto(true)}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
            pronto ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
    </div>
  );
}
