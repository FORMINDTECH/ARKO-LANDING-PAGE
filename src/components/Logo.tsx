import Image from "next/image";

export default function Logo({ className = "", eager = false }: { className?: string; eager?: boolean }) {
  const carga = eager ? ({ loading: "eager" } as const) : {};
  return (
    <>
      <Image
        src="/brand/arko-logo.png"
        alt="ARKO"
        width={2400}
        height={676}
        {...carga}
        className={`tema-escuro ${className}`}
      />
      <Image
        src="/brand/arko-logo-light.png"
        alt="ARKO"
        width={2400}
        height={676}
        {...carga}
        className={`tema-claro ${className}`}
      />
    </>
  );
}
