const mongoose = require("mongoose");

const movieConfig = () => {
  mongoose.connect("mongodb+srv://khushalvaghasiya0:Khushal123@cluster0.r9k7jxe.mongodb.net/moviesDB")
    .then(() => console.log("Database Succesfully"))
  .catch((err) => console.log(err))
}

module.exports = movieConfig