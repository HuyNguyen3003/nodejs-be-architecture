const {
  Product,
  Clothing: ClothingModel,
  Electronics: ElectronicsModel,
} = require("../models/product.model");

class ProductFactory {
  static createProduct = async (type, payload) => {
    switch (type) {
      case "Clothing":
        return await new Clothing(payload).createProduct();
      case "Electronics":
        return await new Electronics(payload).createProduct();
      default:
        throw new Error("Invalid product type", type);
    }
  };
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

  async createProduct() {
    return await Product.create(this);
  }
}

class Clothing extends BaseProduct {
  async createProduct() {
    const newClothing = await ClothingModel.create(this.product_attributes);
    if (!newClothing) throw new Error("Clothing not created");
    const newProduct = await super.createProduct();
    if (!newProduct) throw new Error("Product not created");
    return newProduct;
  }
}

class Electronics extends BaseProduct {
  async createProduct() {
    const Electronics = await ElectronicsModel.create(this.product_attributes);
    if (!Electronics) throw new Error("Electronic not created");
    const newProduct = await super.createProduct();
    if (!newProduct) throw new Error("Electronic not created");
    return newProduct;
  }
}

module.exports = ProductFactory;