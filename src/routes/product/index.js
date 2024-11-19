const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/product.controller");
const { asyncHandle } = require("../../helpers/asyncHandle");
const { authentication } = require("../../auth/authUtils");

router.use(authentication);

router.post("/create", asyncHandle(ProductController.CreateProduct));

module.exports = router;
