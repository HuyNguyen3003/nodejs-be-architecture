const { default: mongoose } = require("mongoose");
// const os = require("os");
const process = require("process");
const config = require("../configs/config");

const _SECONDS = config.timeout._SECONDS;

// const connect
const countConnect = () => {
  const numConnect = mongoose.connections.length;
  return console.log(`Number of connections: ${numConnect}`);
};

// check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnect = mongoose.connections.length;
    const memoryUsage = process.memoryUsage().rss;
    // const numCores = os.cpus().length;
    // const maxConnections = numCores * 5;

    console.log(`Number of connections: ${numConnect}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
    // if (numConnect > maxConnections) {
    //   console.log(`Overload: ${numConnect} connections`);
    // }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};
