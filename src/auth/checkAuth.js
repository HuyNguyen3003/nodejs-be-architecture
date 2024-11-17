const { fileById } = require("../services/apiKey.service");



const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: 'authorization'

}

const apiKey = async (req, res, next) => { 
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if(!key) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }
        const objKey = await fileById(key);
        if(!objKey) {
            return res.status(401).json({
                message: "Forbidden",
            });
        }
        req.objKey = objKey;
        return next();
      

        
    }catch (error) {
        return {
            code: "501",
            message: error.message,
            status: "error",
        };
    }
}

const permission =  (requiredPermission) => { 
    return (req, res, next) => {

        if (!req.objKey.permissions.includes(requiredPermission)) {
            return res.status(403).json({
                message: "Permission denied",
            });
        }
        return next();
    }
}



module.exports = {
    apiKey,
    permission,
}