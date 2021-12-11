/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["www.e-leiloes.pt"],
  },
  webpack: (config, { defaultLoaders, isServer }) => {
    if (isServer) {
      config.externals.push('_http_common');
    }
  
    return config;
  },
};
