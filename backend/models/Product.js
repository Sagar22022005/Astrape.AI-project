const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    categories: [String],
    image: String,
    stock: { type: Number, default: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
