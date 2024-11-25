const { default: mongoose } = require("mongoose");
const { Product, Clothing, Electronics } = require("../product.model");
const { sort } = require("semver");

const findAllDraftsForShop = async ({ query, limit = 50, skip = 0 }) => {
  return await queryProduct({ query, limit, skip });
};

const findAllPublishForShop = async ({ query, limit = 50, skip = 0 }) => {
  return await queryProduct({ query, limit, skip });
};

const queryProduct = async ({ query, limit = 50, skip = 0 }) => {
  return await Product.find(query)
    .populate("product_shop", "name email -_id")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};

const publicProductByShop = async ({ product_shop, product_id }) => {
  const foundShop = await Product.findOne({
    product_shop,
    _id: product_id,
  });
  if (!foundShop) return null;
  foundShop.is_Draft = false;
  foundShop.is_Published = true;
  const { modifiedCount } = await foundShop.updateOne(foundShop);
  return modifiedCount;
};

const unPublicProductByShop = async ({ product_shop, product_id }) => {
  const foundShop = await Product.findOne({
    product_shop,
    _id: product_id,
  });
  if (!foundShop) return null;
  foundShop.is_Draft = true;
  foundShop.is_Published = false;
  const { modifiedCount } = await foundShop.updateOne(foundShop);
  return modifiedCount;
};

const searchProduct = async ({ keyword }) => {
  const result = await Product.find(
    {
      is_Published: true,
      $text: { $search: keyword },
    },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .lean();

  return result;
};

module.exports = {
  findAllDraftsForShop,
  publicProductByShop,
  findAllPublishForShop,
  unPublicProductByShop,
  searchProduct,
};
