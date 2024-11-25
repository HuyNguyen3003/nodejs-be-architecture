const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { checkOverload } = require("./helpers/check.connect");
const cors = require("cors");

const app = express();
app.use(cors());

// init middleware
// app.use(morgan("combined"));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init database
require("./dbs/init.mongodb");
checkOverload();
//init routes

app.use("/", require("./routes"));

// handle error
app.use((req, res, next) => {
  const error = new Error("Not found api");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const status = error.status || 500;
  return res.status(status).json({
    error: {
      message: error.message,
      code: status,
      stack: error.stack,
      status: "error",
    },
  });
});

module.exports = app;
