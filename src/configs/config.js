require('dotenv').config();
const process = require("process");

const dev = {
  app: {
    port: process.env.PORT || 5055,
  },
  mongo: {
    connectString:
      process.env.MONGO_URI || "mongodb://localhost:27017/wsv_ecommerce",
  },
  timeout: {
    _SECONDS: process.env._SECONDS || 30000,
  },
};

const prod = {
  app: {
    port: process.env.PORT,
  },
  mongo: {
    connectString: process.env.MONGO_URI,
  },
};

const config = { dev, prod };

const env = process.env.NODE_ENV || "dev";
console.log(`Environment: ${env}`);
module.exports = config[env];
