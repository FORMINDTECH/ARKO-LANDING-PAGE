import Image from "next/image";

/**
 * Screenshot em duas versões reais (claro e escuro) que acompanha o tema da página.
 * `base` é o caminho sem o sufixo: "/screens/app/inicio" → inicio-light.webp e inicio-dark.webp.
 *
 * Com `fill`, as duas ocupam o elemento pai (que precisa ser relative).
 * Sem `fill`, envolva em um elemento com a classe `tema-par` para as duas se empilharem.
 */
export default function ImagemTema({
  base,
  alt,
  sizes,
  fill = false,
  width,
  height,
  priority = false,
  className = "",
}: {
  base: string;
  alt: string;
  sizes: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  const dim = fill ? { fill: true as const } : { width, height };
  return (
    <>
      <Image src={`${base}-light.webp`} alt={alt} {...dim} sizes={sizes} quality={90} priority={priority} className={`t-claro ${className}`} />
      <Image src={`${base}-dark.webp`} alt={alt} {...dim} sizes={sizes} quality={90} className={`t-escuro ${className}`} />
    </>
  );
}
