const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getIntoData } = require("../utils");
const { BadRequestError } = require("../core/error.response");

const roleShop = {
  SHOP: "0010",
  WRITER: "0011",
  EDITOR: "0012",
  ADMIN: "0013",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {

      //step 1 : check email
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        throw new BadRequestError("Shop already exists");
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
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },  
        });

       ;
        const publicKeyString = publicKey.toString();
       
        const itemPublicKey = await KeyTokenService.generateKeyToken({
          userId: newShop._id,
          publicKeyString,
        });

        if (!itemPublicKey) { 
          throw new BadRequestError("Save public key failed");
        }

      

        const publicKeyObj = crypto.createPublicKey(itemPublicKey); 

        if (!publicKeyObj) { 
          throw new BadRequestError("Convert public key failed");

        }

        // create token pair
        const tokenPair = await createTokenPair(
          {
            userId: newShop._id,
            email: newShop.email,
          },
          publicKeyObj,
          privateKey
        );
       
        return {
          code: "2001",
          metadata: {
            shop: getIntoData({
              field: ["_id", "name", "email"],
              object: newShop,
            }),
            tokenPair,
          },
        };
      }

  };
}

module.exports = AccessService;
