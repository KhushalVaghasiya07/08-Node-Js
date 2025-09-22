const express = require("express");
const { webPage, singleProductView, addToCart, userCart } = require("../controller/website.controller");
const webRouter = express.Router();


webRouter.get("/", webPage)
webRouter.get("/productView/:id", singleProductView)
webRouter.get("/AddtoCart/:id", addToCart)
webRouter.get("/Cart/:id", userCart)


module.exports = webRouter;