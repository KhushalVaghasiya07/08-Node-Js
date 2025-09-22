/* eslint-disable no-unused-vars */
const SubCatagory = require("../models/subCatagory")
const Catagory = require("../models/catagory.models")
const ExtraSubCat = require("../models/extraSubCatagory");
const Product = require("../models/product.model");

exports.AddSubCatagoryPage = async (req, res) => {
  try {
    let categories = await Catagory.find();
    return res.render("SubCatagory/AddSubCatagory", { categories })
  } catch (error) {
    console.log(error);
  }
}

exports.viewSubCategoryPage = async (req, res) => {
  try {
    let subCatagory = await SubCatagory.find().populate("catagory");
    return res.render("SubCatagory/viewAllSubCatagory", { subCatagory });
  } catch (error) {
    console.log(error);
  }
}

exports.AddSubCatagoryPost = async (req, res) => {
  try {
    let SubCatExist = await SubCatagory.findOne({ subCatagoryTitle: req.body.subCatagoryTitle })
    if (SubCatExist) {
      console.log("Your Sub Catagory Already Exist !!!");
      return res.redirect("/SubCatagory/AddSubCatagory")
    }

    let newSubCatagory = await SubCatagory.create(req.body);
    if (newSubCatagory) {
      console.log("Your Sub Catagory Added Successfully");
      res.redirect("/SubCatagory/AddSubCatagory")
    }
  } catch (error) {
    console.log("error", error)
    return res.redirect("/")
  }
}

exports.subCatagoryDelete = async (req, res) => {
  try {
    let id = req.params.id;
    let subCatagory = await SubCatagory.findByIdAndDelete(id);

    await SubCatagory.deleteMany({ subCatagoryTitle: subCatagory._id });
    await ExtraSubCat.deleteMany({ subCatagoryTitle: subCatagory._id });
    await Product.deleteMany({ subCatagoryTitle: subCatagory._id });

    return res.redirect("/SubCatagory/viewAllSubCatagory")
  } catch (error) {
    console.log("error", error)
    return res.redirect("/")
  }
}

exports.subCatagoryEditPage = async (req, res) => {
  try {
    let categories = await Catagory.find();
    let subCatagory = await SubCatagory.findById(req.params.id);
    return res.render("SubCatagory/editSubCatagory", { subCatagory, categories })
  } catch (error) {
    console.log("error", error)
    return res.redirect("/")
  }
}

exports.getAllSubCategories = async (req, res) => {
  try {
    let categories = await SubCatagory.find({ catagory: req.query.categoryId });
    return res.json({ categories, message: "All SubCategory Fetched!!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
