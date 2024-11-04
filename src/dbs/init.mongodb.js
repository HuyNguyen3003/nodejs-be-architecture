const mongoose = require("mongoose");
const config = require("../configs/config");

const connectString = config.mongo.connectString;

class Database {
  constructor() {
    this.connect();
  }

  //connect
  connect() {
    // mongoose.set("debug", true);
    // mongoose.set("debug", { color: true });
    mongoose
      .connect(connectString)
      .then(() => {
        console.log("Connected to MongoDB");
        // countConnect();
      })
      .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
