const mongoose = require("mongoose");

const subCatagorySchema = new mongoose.Schema({
  catagory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catagory"
  },
  subCatagoryTitle: {
    type: String
  }
});

module.exports = mongoose.model("subCatagory", subCatagorySchema)