const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? '/Portfolio' : '',
  trailingSlash: true,
};

export default nextConfig;
