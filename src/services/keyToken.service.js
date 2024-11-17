const { default: mongoose } = require("mongoose");
const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static async savePublicKey({ userId, publicKey,privateKey,refreshToken }) {
 // Add logging

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

 return tokens.publicKey;

} catch (error) {
 throw new Error('Create key token failed: ' + error.message);
}
  
  
  static findByUserId = async({ userId }) => {
    return  await keyTokenModel.findOne({ user: new mongoose.Types.ObjectId(userId) }).lean();
  }
  
  static deletePublicKey = async( id ) => {
    return await keyTokenModel.deleteOne(new mongoose.Types.ObjectId(id));
  }

}

module.exports = KeyTokenService;
 