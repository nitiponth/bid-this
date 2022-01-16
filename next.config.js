require("dotenv").config;

module.exports = {
  reactStrictMode: true,
  env: {
    OMISE_PUBLIC_KEY: process.env.OMISE_PUBLIC_KEY,
    API_URL: process.env.API_URL,
    SUB_URL: process.env.SUB_URL,
  },
};
