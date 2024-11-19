const { CREATED } = require("../core/success.response");
const ProductService = require("../services/product.service");
class ProductController {
  CreateProduct = async (req, res, next) => {
    console.log(req.body.product_type);
    return new CREATED({
      message: "Success",
      metadata: await ProductService.createProduct(
        req.body.product_type,
        req.body
      ),
    }).send(res);
  };
}

module.exports = new ProductController();
