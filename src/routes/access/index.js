const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");
const { asyncHandle } = require("../../helpers/asyncHandle");
const { authentication } = require("../../auth/authUtils");

router.post("/shop/signup", asyncHandle(accessController.signUp));

router.post("/shop/login", asyncHandle(accessController.login));

router.use(authentication);

router.post("/shop/refreshToken", asyncHandle(accessController.refreshToken));

router.post("/shop/logout", asyncHandle(accessController.logout));

module.exports = router;
