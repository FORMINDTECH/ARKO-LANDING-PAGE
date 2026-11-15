import Image from "next/image";

/**
 * Screenshot real nas duas versões (claro e escuro), que acompanha o tema da página.
 * `base` é o caminho sem sufixo: "/screens/app/inicio" → inicio-dark.webp e inicio-light.webp.
 * Com `fill`, o elemento pai precisa ser `relative`.
 *
 * As capturas são servidas no arquivo original (já em WebP, 60 a 230 KB), sem passar pelo
 * otimizador: reduzir e recomprimir deixava o texto pequeno do app e do painel borrado,
 * principalmente na tela ampliada. A versão do tema oculto não é baixada (lazy + display:none).
 */
export default function Tela({
  base,
  alt,
  fill = false,
  width,
  height,
  eager = false,
  className = "",
}: {
  base: string;
  alt: string;
  /** Mantido por compatibilidade; com o arquivo original não é usado. */
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  /** Carrega já (hero). */
  eager?: boolean;
  className?: string;
}) {
  const dim = fill ? { fill: true as const } : { width, height };
  const carga = eager ? ({ loading: "eager", fetchPriority: "high" } as const) : {};
  return (
    <>
      <Image src={`${base}-dark.webp`} alt={alt} {...dim} unoptimized {...carga} className={`tema-escuro ${className}`} />
      <Image src={`${base}-light.webp`} alt={alt} {...dim} unoptimized {...carga} className={`tema-claro ${className}`} />
    </>
  );
}
