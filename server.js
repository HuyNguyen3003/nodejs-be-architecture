const app = require("./src/app");
const detect = require("detect-port");
const process = require("process");

const PORT = process.env.PORT || 5055;

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
    console.log("http://localhost:" + availablePort);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("WSV eCommerce is shutting down");
      process.exit(0);
    });
  });
});
