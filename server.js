const app = require("./src/app");

const PORT = process.env.PORT || 5055;

const server = app.listen(PORT, () => {
  console.log("WSV eCommerce is running on port " + PORT);
  console.log("http://localhost:" + PORT);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("WSV eCommerce is shutting down");
  });
  // notify.ping
});
