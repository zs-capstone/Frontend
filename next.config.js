/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    return [
      {
        destination: process.env.DESTINATION_URL,
        source: process.env.SOURCE_PATH,
      },
    ];
  },
};

module.exports = {
  images: {
    domains: [
      "api.cdn.visitjeju.net",
      "yeoreodigm-s3.s3.ap-northeast-2.amazonaws.com",
      "s3.ap-northeast-2.amazonaws.com",
    ],
    minimumCacheTTL: 60,
  },
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ["ko"],
    defaultLocale: "ko",
  },
};
