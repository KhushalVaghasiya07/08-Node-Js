const express = require('express');
const { addCatagory, addCatagoryPost, viewAllCatagory, deleteCatagory, editCatagory, editCatagoryPost } = require('../controller/catagory.controller');
const userImage = require('../middleware/userImages.middleware');
const CatagoryRoute = express.Router();

CatagoryRoute.get("/Add-Catagory", addCatagory)
CatagoryRoute.post("/Add-Catagory", userImage.single('CatagoryImg'), addCatagoryPost)
CatagoryRoute.get("/viewAllCatagory", viewAllCatagory)

CatagoryRoute.get("/delete-catagory/:id", deleteCatagory)
CatagoryRoute.get("/editCatagory/:id", editCatagory)
CatagoryRoute.post("/editCatagoryPost/:id", userImage.single("CatagoryImg"), editCatagoryPost)

module.exports = CatagoryRoute;
