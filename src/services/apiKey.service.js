const apiKeyModel = require('../models/apikey.model');

const fileById = async (key) => { 
    const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
    return objKey;
}

module.exports = {
    fileById,
}