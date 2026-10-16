import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Endereços antigos: "Estantes" virou "Habilidades"; o blog (com tópicos, séries e RSS) virou "Conquistas"
  async redirects() {
    return [
      { source: '/shelves', destination: '/skills', permanent: true },
      { source: '/blog', destination: '/achievements', permanent: true },
      { source: '/topics/:path*', destination: '/achievements', permanent: true },
      { source: '/series/:path*', destination: '/achievements', permanent: true },
      { source: '/rss.xml', destination: '/achievements', permanent: true },
    ]
  },
};

export default nextConfig;
