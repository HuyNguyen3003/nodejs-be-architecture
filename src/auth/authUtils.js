const jwt = require("jsonwebtoken");

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

module.exports = {
  createTokenPair,
};
