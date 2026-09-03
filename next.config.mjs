const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? '/Portfolio' : '',
  trailingSlash: true,
  async redirects() {
    return [
      // 1. If accessed via curl (terminal) -> download Aegis installer
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'aegis.ilyankhan.tech' },
          { type: 'header', key: 'user-agent', value: 'curl/(.*)' },
        ],
        destination: 'https://raw.githubusercontent.com/Ilyan321/aegis-cli/main/install.sh',
        permanent: false,
      },
      // 2. If accessed via web browser -> Show 404 (does NOT show your portfolio!)
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'aegis.ilyankhan.tech' },
        ],
        destination: '/404',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
