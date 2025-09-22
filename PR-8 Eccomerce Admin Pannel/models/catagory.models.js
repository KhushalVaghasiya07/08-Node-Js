const mongoose = require("mongoose");

const CatagorySchema = new mongoose.Schema({
  CatagoryTitle: {
    type: String
  },
  CatagoryImg: {
    type: String
  }
});

module.exports = mongoose.model("Catagory", CatagorySchema)