
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.zyrosite.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'divyasangrah.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.divyasangrah.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'parivartan.divyasangrah.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  serverComponentsExternalPackages: ['@opentelemetry/exporter-jaeger'],
};

export default nextConfig;
