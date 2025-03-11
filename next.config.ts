/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs', // Agar GitHub Pages bisa membaca hasil build
  images: {
    unoptimized: true, // Jika menggunakan Next.js Image
  },
};

module.exports = nextConfig;