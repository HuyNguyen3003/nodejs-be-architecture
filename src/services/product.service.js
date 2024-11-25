const { default: mongoose } = require("mongoose");
const {
  Product,
  Clothing: ClothingModel,
  Electronics: ElectronicsModel,
} = require("../models/product.model");
const {
  findAllDraftsForShop,
  publicProductByShop,
  findAllPublishForShop,
  unPublicProductByShop,
  searchProduct,
  findAllProduct,
  findProduct,
} = require("../models/repositories/product.repo");

class ProductFactory {
  static productRegistry = {};
  static registerProduct = (type, classRef) => {
    ProductFactory.productRegistry[type] = classRef;
  };

  static createProduct = async (type, payload) => {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw new Error("Invalid product type", type);
    return new productClass(payload).createProduct();
  };

  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = {
      product_shop,
      is_Draft: true,
    };
    return await findAllDraftsForShop({
      query,
      limit,
      skip,
    });
  }
  static async findAllPublicForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = {
      product_shop,
      is_Published: true,
    };
    return await findAllPublishForShop({
      query,
      limit,
      skip,
    });
  }

  static async publicProductByShop({ product_shop, product_id }) {
    return await publicProductByShop({ product_shop, product_id });
  }

  static async unPublicProductByShop({ product_shop, product_id }) {
    return await unPublicProductByShop({ product_shop, product_id });
  }

  static async searchProduct({ keyword }) {
    return await searchProduct({ keyword });
  }

  static async findAllProduct({
    sort = "ctime",
    limit = 50,
    page = 1,
    filter = { is_Published: true },
    select,
  }) {
    if (select === null) select = ["_id"];
    return await findAllProduct({
      sort,
      limit,
      page,
      filter,
      select,
    });
  }

  static async findProductById({ product_id, unselect }) {
    if (unselect === null) unselect = ["__v"];
    const result = await findProduct({ product_id, unselect });
    return result;
  }

  static async updateProduct({ keyword }) {
    return await searchProduct({ keyword });
  }
}

class BaseProduct {
  constructor({
    product_name,
    product_thumbnail,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumbnail = product_thumbnail;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  async createProduct(product_id) {
    return await Product.create({ ...this, _id: product_id });
  }
}

class Clothing extends BaseProduct {
  async createProduct() {
    const newClothing = await ClothingModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newClothing) throw new Error("Clothing not created");
    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new Error("Product not created");
    return newProduct;
  }
}

class Electronics extends BaseProduct {
  async createProduct() {
    const newElectronics = await ElectronicsModel.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronics) throw new Error("Electronic not created");
    const newProduct = await super.createProduct(newElectronics._id);
    if (!newProduct) throw new Error("Electronic not created");
    return newProduct;
  }
}

ProductFactory.registerProduct("Clothing", Clothing);
ProductFactory.registerProduct("Electronics", Electronics);
module.exports = ProductFactory;
