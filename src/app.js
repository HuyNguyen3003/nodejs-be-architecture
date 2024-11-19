const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { checkOverload } = require("./helpers/check.connect");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");
const process = require("process");

const app = express();
app.use(cors());
/// api docs
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API Documentation",
      version: "1.0.0",
      description: "API documentation for the E-Commerce system",
    },
    servers: [
      {
        url: process.env.APP_URL,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
    },
  },
  apis: ["./src/routes/**/*.js"], // Path to the API docs
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
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
      status: "error",
    },
  });
});

module.exports = app;
