const express = require("express");
const { Addblog, addBlog, viewallblog, myblog, blogdelete, editblog, editBlog, singleblogview } = require("../controller/blog.controller");
const passport = require("../middleware/localstrategy.middleware");
const blogsImg = require("../middleware/blogsImages.middleware");
const blogroute = express.Router();

blogroute.get("/Addblog", passport.checkAuthentication, Addblog);
blogroute.post("/Addblog", blogsImg.single("blogImg"), addBlog);
blogroute.get("/viewAllblog", passport.checkAuthentication, viewallblog);
blogroute.get("/myblog", passport.checkAuthentication, myblog);
blogroute.get("/editblog/:id", passport.checkAuthentication, editblog);
blogroute.post("/editblog/:id", blogsImg.single("blogImg"), editBlog);
blogroute.get("/blogdelete/:id", passport.checkAuthentication, blogdelete);
blogroute.get("/singleblogview/:id", passport.checkAuthentication, singleblogview);

module.exports = blogroute;