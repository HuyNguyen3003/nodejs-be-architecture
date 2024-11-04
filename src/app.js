const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { checkOverload } = require("./helpers/check.connect");
const app = express();

// init middleware
// app.use(morgan("combined"));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//init database
require("./dbs/init.mongodb");
checkOverload();
//init routes
app.get("/", (req, res) => {
  const strCompess =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec ligula";
  res.status(200).json({
    message: "WSV eCommerce",
    metadata: strCompess.repeat(100000),
  });
});

// handle error

module.exports = app;
