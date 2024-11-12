const { default: mongoose } = require("mongoose");
const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static async generateKeyToken({ userId, publicKeyString }) {
    try {
     
      const token = await keyTokenModel.create({
        publicKey: publicKeyString,
        user: new mongoose.Types.ObjectId(userId),
      });
      return token ? token.publicKey : null;
    } catch (error) {
      return {
        code: "500",
        message: error.message,
        status: "error",
      };
    }
  }
}

module.exports = KeyTokenService;
