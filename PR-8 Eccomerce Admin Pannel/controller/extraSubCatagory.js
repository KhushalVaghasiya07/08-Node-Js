const Catagory = require("../models/catagory.models");
const ExtraSubCatagory = require("../models/extraSubCatagory");
const subCatagory = require("../models/subCatagory");
const Product = require("../models/product.model");

exports.addExtraSubCatagoryForm = async (req, res) => {
  try {
    let catagories = await Catagory.find();
    res.render("ExtraSubCatagory/AddExtraSubCatagory", { catagories, subCatagories: [] });
  } catch (error) {
    console.log("Error:", error);
    res.redirect("/");
  }
};

exports.addExtraSubCatagory = async (req, res) => {
  try {
    let exist = await ExtraSubCatagory.findOne({ extraSubCatagoryTitle: req.body.extraSubCatagoryTitle });
    if (exist) {
      console.log("Extra SubCategory Already Exists");
      return res.redirect("/ExtraSubCatagory/AddExtraSubCatagory");
    }
    await ExtraSubCatagory.create(req.body);
    res.redirect("/ExtraSubCatagory/viewExtraAllSubCatagory");
  } catch (error) {
    console.log("Error:", error);
    res.redirect("/");
  }
};

exports.viewExtraAllSubCatagory = async (req, res) => {
  try {
    let extraCatagory = await ExtraSubCatagory.find()
      .populate("catagory")
      .populate("subCatagoryTitle");
    res.render("ExtraSubCatagory/viewExtraAllSubCatagory", { extraCatagory });
  } catch (error) {
    console.log("Error:", error);
    res.redirect("/");
  }
};

exports.editExtraSubCatagoryForm = async (req, res) => {
  try {
    let extraCatagory = await ExtraSubCatagory.findById(req.params.id);
    let subCat = await subCatagory.find();
    let catagory = await Catagory.find();

    return res.render("ExtraSubCatagory/editExtraCatagory", { catagory, subCat, extraCatagory })
  } catch (error) {
    console.log(error);
  }
};

exports.deleteExtraSubCatagory = async (req, res) => {
  try {
    let extraCatagory = await ExtraSubCatagory.findByIdAndDelete(req.params.id);
    await Product.deleteMany({ extraSubCategoryTitle: extraCatagory._id });
    return res.render("/ExtraSubCatagory/viewExtraAllSubCatagory")
  } catch (error) {
    console.log(error);
  }
};

exports.editExtraSubCatagory = async (req, res) => {
  try {
    let extraCatagory = await ExtraSubCatagory.findByIdAndUpdate(req.params.id , {...req.body} );
    return res.redirect("/ExtraSubCatagory/viewExtraAllSubCatagory")
  } catch (error) {
    console.log(error);
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    let subCats = await subCatagory.find({ catagory: req.params.categoryId }); // ✅ use "catagory"
    return res.json(subCats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching subcategories" });
  }
};

// get extra subcategories by subCategory
exports.getExtraSubCategories = async (req, res) => {
  try {
    let extraSubs = await extSubCatagory.find({ subCatagoryTitle: req.params.subCategoryId }); // ✅ use "subCatagoryTitle"
    return res.json(extraSubs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching extra subcategories" });
  }
};