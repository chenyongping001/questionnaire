/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    serverActions: {
      allowedOrigins: ['questionnaire.td.masterpeak.cn', '*.td.masterpeak.cn'],
    },
  },
}

module.exports = nextConfig
