const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products"
  },
  userATC: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("addToCart", addToCartSchema);