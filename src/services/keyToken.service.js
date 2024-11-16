const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static async savePublicKey({ userId, publicKey,privateKey,refreshToken }) {
 // Add logging
 console.log('Creating key token for userId:', userId);

 const publicKeyString = publicKey.toString();
 const privateKeyString = privateKey.toString();

 const filter = { user: userId };
 const update = {
   publicKey:publicKeyString,
   privateKey:privateKeyString,
   refreshTokensUsed: [],
   refreshToken
 };
 const options = { upsert: true, new: true };

 const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);

 if (!tokens) {
   throw new Error('Create key token failed');
 }

 console.log('Key token created successfully');
 return tokens.publicKey;

} catch (error) {
 console.error('KeyToken Error::', error);
 throw new Error('Create key token failed: ' + error.message);
}
}

module.exports = KeyTokenService;
