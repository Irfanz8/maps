import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs', // GitHub Pages hanya membaca dari folder 'docs'
  images: {
    unoptimized: true, // Diperlukan jika menggunakan Next.js Image
  },
};

export default nextConfig;
