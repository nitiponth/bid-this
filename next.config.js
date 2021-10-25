require("dotenv").config;

module.exports = {
  reactStrictMode: true,
  env: {
    OMISE_PUBLIC_KEY: process.env.OMISE_PUBLIC_KEY,
  },
};
