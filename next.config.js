require("dotenv").config;

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "bid-this-storage.s3.ap-southeast-1.amazonaws.com",
      "images.unsplash.com",
    ],
  },
  env: {
    OMISE_PUBLIC_KEY: process.env.OMISE_PUBLIC_KEY,
    API_URL: process.env.API_URL,
    SUB_URL: process.env.SUB_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    DISCORD_INVITE: process.env.DISCORD_INVITE,
  },
};
