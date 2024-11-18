const jwt = require("jsonwebtoken");
const { asyncHandle } = require("../helpers/asyncHandle");
const { findByUserId } = require("../services/keyToken.service");
const { AuthFailError } = require("../core/error.response");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, privateKey) => {
  try {
    // access token
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return {
      code: "501",
      message: error.message,
      status: "error",
    };
  }
};

const authentication = asyncHandle(async (req, res, next) => {
  // 1. Check userId in headers
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) {
    throw new AuthFailError("Invalid Request, 1");
  }

  // 2. Check keystore
  const keystore = await findByUserId({ userId });
  if (!keystore) {
    throw new AuthFailError("Invalid Request, 2");
  }

  // 3. Check access token
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new AuthFailError("Invalid Request, 3");
  }
  try {
    const deCode = jwt.verify(accessToken, keystore.publicKey);
    if (deCode.userId !== userId) {
      throw new AuthFailError("Invalid Request, 4");
    }
    req.keystore = keystore;
    next();
  } catch (error) {
    throw new AuthFailError("Invalid Request" + error.message);
  }
});

module.exports = {
  createTokenPair,
  authentication,
};
