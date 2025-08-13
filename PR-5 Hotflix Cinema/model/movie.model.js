const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  movieName: String,
  genre: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
  }
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;