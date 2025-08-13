const express = require('express')
const movieConfig = require("./config/movie.config");
const movieRouter = require("./routes/movie.route")
const path = require("path")
const server = express();

server.use("/uploads", express.static("uploads"))
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.set('views', path.join(__dirname, 'views'));
server.use("/", movieRouter)



server.listen(8000, () => {
  movieConfig()
  console.log("Server is Running at http://localhost:8000")
})