const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");

const roleShop = {
  SHOP: "0010",
  WRITER: "0011",
  EDITOR: "0012",
  ADMIN: "0013",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      //step 1 : check email
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "400",
          message: "Email already exists",
          status: "error",
        };
      }
      //step 2 : create new shop
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        role: [roleShop.SHOP],
      });
      if (newShop) {
        // create private key, public key
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });

        const publicKeyString = await KeyTokenService.generateKeyToken({
          userId: newShop._id,
          publicKey,
        });
        console.log("publicKeyString", publicKeyString);
        if (!publicKeyString) {
          return {
            code: "500",
            message: "Generate key token failed",
            status: "error",
          };
        }
        // create token pair
        const tokenPair = await createTokenPair(
          {
            userId: newShop._id,
            email: newShop.email,
          },
          publicKeyString,
          privateKey
        );
        console.log(tokenPair);
        return {
          code: "2001",
          metadata: {
            userId: newShop._id,
            tokenPair,
          },
        };
      }
      return {
        code: "500",
        message: "Create shop failed",
        status: "error",
      };
    } catch (error) {
      return {
        code: "502",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
