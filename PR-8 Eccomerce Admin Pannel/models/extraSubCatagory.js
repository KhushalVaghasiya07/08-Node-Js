  const mongoose = require("mongoose");

  const extraSubCatagorySchema = new mongoose.Schema({
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory"
    },
    subCatagoryTitle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCatagory"
    },
    extraSubCatagoryTitle: {
      type : String
    }
  });

  module.exports = mongoose.model("extraSubCatagory", extraSubCatagorySchema)