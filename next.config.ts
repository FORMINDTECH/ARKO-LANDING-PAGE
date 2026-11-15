import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 é usado nas capturas do app e do painel (texto pequeno precisa de nitidez)
    qualities: [75, 90],
  },
};

export default nextConfig;
