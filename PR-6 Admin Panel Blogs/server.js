const express = require('express')
const adminPanelConfing = require("./config/panel.config");
const path = require("path");
const server = express();
const mainRoute = require('./routes/index.route')

server.use("/uploads", express.static("uploads"))
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.set('views', path.join(__dirname, 'views'));
server.use("/", mainRoute )


server.listen(8000, () => {
  adminPanelConfing()
  console.log("Server is Running at http://localhost:8000")
})