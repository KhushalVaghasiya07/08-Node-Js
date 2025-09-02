const express = require("express");
const { webPage, loginPage, signUpPage, singleBlogView } = require("../controller/website.controller");
const webRouter = express.Router();


webRouter.get("/" , webPage)
webRouter.get("/login" , loginPage)
webRouter.get("/signup", signUpPage)
webRouter.get("/blogs/:id", singleBlogView)


module.exports = webRouter;