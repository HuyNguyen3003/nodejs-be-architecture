const { default: mongoose } = require("mongoose");
const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static async savePublicKey({ userId, publicKey, privateKey, refreshToken }) {
    // Add logging

    const filter = { user: userId };
    const update = {
      publicKey: publicKey,
      privateKey: privateKey,
      refreshTokensUsed: [],
      refreshToken,
    };
    const options = { upsert: true, new: true };

    const tokens = await keyTokenModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (!tokens) {
      throw new Error("Create key token failed");
    }

    return tokens.publicKey;
  }
  catch(error) {
    throw new Error("Create key token failed: " + error.message);
  }

  static findByUserId = async ({ userId }) => {
    return await keyTokenModel.findOne({
      user: new mongoose.Types.ObjectId(userId),
    });
  };

  static deletePublicKey = async (id) => {
    return await keyTokenModel.deleteOne(new mongoose.Types.ObjectId(id));
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean();
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshToken: refreshToken });
  };
}

module.exports = KeyTokenService;
