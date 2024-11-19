const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "products"; // Model name
const COLLECTION_NAME = "products";
var shopSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_thumbnail: { type: String, required: true },
    product_description: { type: String },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing"],
    },
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    product_attributes: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//define the product type = clothing
const clothingSchema = new mongoose.Schema(
  {
    manufacture: { type: String, required: true },
    model: String,
    color: String,
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    collation: "clothing",
    timestamps: true,
  }
);

//define the product type = electronics
const electronicSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
    product_shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  },
  {
    collation: "electronics",
    timestamps: true,
  }
);

//Export the model
module.exports = {
  Product: mongoose.model(DOCUMENT_NAME, shopSchema),
  Clothing: mongoose.model("Clothing", clothingSchema),
  Electronics: mongoose.model("Electronics", electronicSchema),
};
