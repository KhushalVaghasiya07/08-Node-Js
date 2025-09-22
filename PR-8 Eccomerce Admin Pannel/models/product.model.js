const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catagory",
  },
  subCategoryTitle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCatagory",
  },
  extraSubCategoryTitle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "extraSubCatagory",
    default: null
  },
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  productDescription: {
    type: String,
  },
  productImage: {
    type: String,
  },
  productDiscount: {
    type: Number,
  }
});

module.exports = mongoose.model("Products", productSchema)