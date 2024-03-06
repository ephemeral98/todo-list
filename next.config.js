/** @type {import('next').NextConfig} */
const UnoCSS = require('@unocss/webpack').default;
const presetUno = require('@unocss/preset-uno').default;

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  webpack: (config, context) => {
    config.plugins.push(UnoCSS({ presets: [presetUno()] }));

    if (context.buildId !== 'development') {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
