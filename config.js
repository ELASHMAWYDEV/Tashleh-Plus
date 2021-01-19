require("dotenv/config");

module.exports = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || "randomaccesstoken",
  MONGO_URI_DEVELOPMENT: process.env.MONGO_URI_DEVELOPMENT,
  MONGO_URI_PRODUCTION: process.env.MONGO_URI_PRODUCTION,
};
