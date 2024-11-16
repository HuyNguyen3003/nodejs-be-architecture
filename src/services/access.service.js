const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getIntoData } = require("../utils");
const { BadRequestError, AuthFailError } = require("../core/error.response");
const { OK } = require("../core/success.response");
const { findByEmail } = require("./shop.service");

const roleShop = {
  SHOP: "0010",
  WRITER: "0011",
  EDITOR: "0012",
  ADMIN: "0013",
};

class AccessService {

  static signIn = async ({ email, password,refreshtoken = null }) => {
    const shop = await findByEmail({ email })
    if(!shop){
      throw new BadRequestError("Shop not found");
    }

    const match = bcrypt.compare(password, shop.password);
    if(!match){
      throw new AuthFailError('Authentication failed: 001');
    }

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
     
      const tokenPair = await createTokenPair(
      {
        userId: shop._id,
        email: shop.email,
      },
       privateKey
      );

    const itemPublicKey = await KeyTokenService.savePublicKey({
      userId: shop._id,
      publicKey,
      privateKey,
    });

    if (!itemPublicKey) { 
      throw new BadRequestError("Save public key failed");
    }
    
    return{
        tokenPair,
        shop: getIntoData({fields: ["_id", "name", "email"], object: shop}),
      }
    
      

  };
  static signUp = async ({ name, email, password }) => {

      //step 1 : check email
    const holderShop = await findByEmail({ email })
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

        // create token pair
        const tokenPair = await createTokenPair(
          {
            userId: newShop._id,
            email: newShop.email,
          },
          privateKey
        );


        const itemPublicKey = await KeyTokenService.savePublicKey({
          userId: newShop._id,
          publicKey, 
          privateKey,
          refreshToken: tokenPair.refreshToken,
        });

        if (!itemPublicKey) { 
          throw new BadRequestError("Save public key failed");
        }
       
        return {
          code: "200",
          metadata: {
            shop: getIntoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            tokenPair,
          },
        };
      }

  };
}

module.exports = AccessService;
