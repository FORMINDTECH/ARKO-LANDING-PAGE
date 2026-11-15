import Image from "next/image";

/** Logotipo positivo (escuro) no tema claro e negativo (claro) no escuro. */
export default function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <>
      <Image
        src="/brand/arko-logo-light.svg"
        alt="Arko"
        width={362}
        height={102}
        priority={priority}
        unoptimized
        className={`only-light ${className}`}
      />
      <Image
        src="/brand/arko-logo.svg"
        alt="Arko"
        width={362}
        height={102}
        priority={priority}
        unoptimized
        className={`only-dark ${className}`}
      />
    </>
  );
}
