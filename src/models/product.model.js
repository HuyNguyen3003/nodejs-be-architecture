const slugify = require("slugify");
const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "products"; // Model name
const COLLECTION_NAME = "products";
var productSchema = new mongoose.Schema(
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
    product_slug: String,
    product_ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: {
      type: Array,
      default: [],
    },
    is_Draft: { type: Boolean, default: true, index: true, select: false },
    is_Published: { type: Boolean, default: false, index: true, select: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

productSchema.index({ product_name: "text", product_description: "text" });

//document middleware
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

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
  Product: mongoose.model(DOCUMENT_NAME, productSchema),
  Clothing: mongoose.model("Clothing", clothingSchema),
  Electronics: mongoose.model("Electronics", electronicSchema),
};
