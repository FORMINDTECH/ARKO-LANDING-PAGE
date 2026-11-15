import Image from "next/image";

/**
 * Screenshot real nas duas versões (claro e escuro), que acompanha o tema da página.
 * `base` é o caminho sem sufixo: "/screens/app/inicio" → inicio-dark.webp e inicio-light.webp.
 * Com `fill`, o elemento pai precisa ser `relative`.
 */
export default function Tela({
  base,
  alt,
  sizes,
  fill = false,
  width,
  height,
  eager = false,
  className = "",
}: {
  base: string;
  alt: string;
  sizes: string;
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
      <Image
        src={`${base}-dark.webp`}
        alt={alt}
        {...dim}
        sizes={sizes}
        quality={90}
        {...carga}
        className={`tema-escuro ${className}`}
      />
      <Image
        src={`${base}-light.webp`}
        alt={alt}
        {...dim}
        sizes={sizes}
        quality={90}
        {...carga}
        className={`tema-claro ${className}`}
      />
    </>
  );
}
