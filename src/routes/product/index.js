const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/product.controller");
const { asyncHandle } = require("../../helpers/asyncHandle");
const { authentication } = require("../../auth/authUtils");

router.get(
  "/search/:keyword",
  asyncHandle(ProductController.SearchProductPublished)
);
router.get("/:product_id", asyncHandle(ProductController.findProduct));

router.get("", asyncHandle(ProductController.findAllProduct));

router.use(authentication);

router.post("/create", asyncHandle(ProductController.CreateProduct));
router.post("/publish/:id", asyncHandle(ProductController.PublishedForShop));

router.post(
  "/unpublish/:id",
  asyncHandle(ProductController.unPublishedForShop)
);

router.patch("/:productId", asyncHandle(ProductController.UpdateProduct));

// query

router.get("/drafts/all", asyncHandle(ProductController.getAllDraftForShop));

router.get(
  "/published/all",
  asyncHandle(ProductController.getAllPublishedForShop)
);

module.exports = router;
