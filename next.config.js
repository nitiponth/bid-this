require("dotenv").config;
const { withSentryConfig } = require("@sentry/nextjs");

moduleExports = {
  reactStrictMode: true,
  env: {
    OMISE_PUBLIC_KEY: process.env.OMISE_PUBLIC_KEY,
    API_URL: process.env.API_URL,
    SUB_URL: process.env.SUB_URL,
    SENTRY_DNS: process.env.SENTRY_DSN,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
