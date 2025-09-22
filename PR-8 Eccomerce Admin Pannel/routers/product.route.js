const express = require('express');
const { addProduct, addProductForm, viewAllProduct, deleteProduct, getSubCategories, getExtraSubCategories, editProductForm, editProduct } = require('../controller/product.controller');
const productsImg = require('../middleware/productImages.middleware.');

const product = express.Router();

product.get("/AddProduct", addProductForm)
product.post("/AddProduct", productsImg.single("productImage"), addProduct)
product.get("/viewAllProduct", viewAllProduct)
product.get("/deleteProduct/:id", deleteProduct)
product.get("/editProduct/:id", editProductForm)
product.post("/editProduct/:id", productsImg.single("productImage"), editProduct)
product.get("/getSubCategories/:categoryId", getSubCategories);
product.get("/getExtraSubCategories/:subCategoryId", getExtraSubCategories);

module.exports = product;