const { CREATED, SuccessResponse } = require("../core/success.response");
const ProductService = require("../services/product.service");
class ProductController {
  CreateProduct = async (req, res, next) => {
    return new CREATED({
      message: "Success",
      metadata: await ProductService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  UpdateProduct = async (req, res, next) => {
    return new SuccessResponse({
      message: "Update product success",
      metadata: await ProductService.updateProductById(
        req.body.product_type,
        req.params.productId,
        {
          ...req.body,
          product_shop: req.user.userId,
        }
      ),
    }).send(res);
  };

  getAllDraftForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get all draft products",
      metadata: await ProductService.findAllDraftsForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getAllPublishedForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get all Public products",
      metadata: await ProductService.findAllPublicForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  PublishedForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Published product",
      metadata: await ProductService.publicProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  unPublishedForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Published product",
      metadata: await ProductService.unPublicProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  SearchProductPublished = async (req, res, next) => {
    new SuccessResponse({
      message: "Search product",
      metadata: await ProductService.searchProduct(req.params),
    }).send(res);
  };

  findAllProduct = async (req, res, next) => {
    const { select } = req.query;
    const selectArray = select ? select.split(",") : null;

    new SuccessResponse({
      message: "Search product",
      metadata: await ProductService.findAllProduct({
        select: selectArray,
      }),
    }).send(res);
  };

  findProduct = async (req, res, next) => {
    const { unselect } = req.query;
    const selectArray = unselect ? unselect.split(",") : null;

    new SuccessResponse({
      message: "Search product",
      metadata: await ProductService.findProductById({
        unselect: selectArray,
        product_id: req.params.product_id,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
