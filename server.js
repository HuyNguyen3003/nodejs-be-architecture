const app = require("./src/app");
const detect = require("detect-port");
const process = require("process");
const { engines } = require("./package");
const semver = require("semver");
const config = require("./src/configs/config");

const PORT = config.app.port;

const version = engines.node;
if (!semver.satisfies(process.version, version)) {
  console.log(
    `Required node version ${version} not satisfied with current version ${process.version}.`
  );
  process.exit(1);
}

detect(PORT, (err, availablePort) => {
  if (err) {
    console.error("Error detecting port:", err);
    return;
  }

  const server = app.listen(availablePort, (err) => {
    if (err) {
      console.error("Error starting server:", err);
      return;
    }
    console.log("WSV eCommerce is running on port " + availablePort);
    console.log("http://localhost:" + availablePort + "/api-docs");
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("WSV eCommerce is shutting down");
      process.exit(0);
    });
  });
});
