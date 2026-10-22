import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <>
      <Image
        src="/brand/arko-logo.png"
        alt="ARKO"
        width={2400}
        height={676}
        priority
        className={`logo-dark ${className}`}
      />
      <Image
        src="/brand/arko-logo-light.png"
        alt="ARKO"
        width={2400}
        height={676}
        priority
        className={`logo-light ${className}`}
      />
    </>
  );
}
