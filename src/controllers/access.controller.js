const {CREATED,SuccessResponse} = require('../core/success.response');
const AccessService = require("../services/access.service");
class AccessController {
  signUp = async (req, res, next) => {

      console.log("[P]::signUp::", req.body);
      return new CREATED({
        message: "Shop successfully created",
        metadata: await AccessService.signUp(req.body),
      }).send(res);

  };
  login = async (req, res, next) => { 
    console.log("[P]::signUp::", req.body);
    return new SuccessResponse({
      metadata: await AccessService.signIn(req.body),
    }).send(res);
  
  }

  logout = async (req, res, next) => { 
    return new SuccessResponse({
      message: "Logout successfully",
      metadata: await AccessService.logout( req.keystore ),
    }).send(res);
  }


}



module.exports = new AccessController();
