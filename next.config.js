/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["www.e-leiloes.pt"],
  },
  webpack5: (config, { defaultLoaders, isServer }) => {
    if (isServer) {
      config.externals.push('_http_common');
    }
  
    return config;
  },
  target: 'experimental-serverless-trace'
};
