/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  webpack(config) {
    // Allow importing media files like .mp4 from src directory
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/i,
      type: 'asset/resource'
    });
    return config;
  }
}

module.exports = nextConfig;
