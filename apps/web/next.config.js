const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@no-surrender/common'],
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'app/components');
    config.resolve.alias['@components/*'] = path.resolve(__dirname, 'app/components/*');
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'lib');
    config.resolve.alias['@store'] = path.resolve(__dirname, 'store');
    return config;
  },
};

module.exports = nextConfig;