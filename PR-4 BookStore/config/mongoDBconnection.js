const mongoose = require("mongoose")

const mongooseConnection = () => {
  mongoose.connect("mongodb://localhost:27017/BookDetails")
  .then(() => console.log("DB connection Successfully"))
  .catch((err) => console.log(err));
}

module.exports = mongooseConnection;