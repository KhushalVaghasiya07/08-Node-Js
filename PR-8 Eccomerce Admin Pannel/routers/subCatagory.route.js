const express = require('express');
const { AddSubCatagoryPage, viewSubCategoryPage, AddSubCatagoryPost, subCatagoryDelete, subCatagoryEditPage, getAllSubCategories } = require('../controller/subCatagory.controller');

const subCatagory = express.Router();

subCatagory.get("/AddSubCatagory", AddSubCatagoryPage)
subCatagory.post("/AddSubCatagory", AddSubCatagoryPost  )
subCatagory.get("/viewAllSubCatagory", viewSubCategoryPage)
subCatagory.get("/deleteSubCatagory/:id", subCatagoryDelete)
subCatagory.get("/editSubCatagory/:id", subCatagoryEditPage)

subCatagory.get("/getAllSubCategory",getAllSubCategories);

module.exports = subCatagory