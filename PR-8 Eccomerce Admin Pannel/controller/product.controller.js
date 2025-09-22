const Catagory = require("../models/catagory.models")
const subCatagory = require("../models/subCatagory")
const extSubCatagory = require("../models/extraSubCatagory");
const Product = require("../models/product.model");
const fs = require("fs")
const path = require("path")


exports.addProductForm = async (req, res) => {
  try {

    let catagories = await Catagory.find()
    let subCatagories = await subCatagory.find()
    let extSubCatagories = await extSubCatagory.find()
    return res.render("Product/addProduct", { catagories, subCatagories, extSubCatagories });

  } catch (error) {
    console.log(error);
    return res.redirect("back")
  }
}
0
exports.addProduct = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/Product-Images/${req.file.filename}`;
    }

    let extraSubCategoryTitle = req.body.extraSubCategoryTitle && req.body.extraSubCategoryTitle !== ""
      ? req.body.extraSubCategoryTitle
      : null;


    let newProduct = await Product.create({
      ...req.body,
      extraSubCategoryTitle: extraSubCategoryTitle ,
      productImage: imagePath
    })

    if (newProduct) {
      console.log("Your Product Edded Successfully");
      return res.redirect("/Product/AddProduct")
    }
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

exports.viewAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("category").populate("subCategoryTitle").populate("extraSubCategoryTitle")
    console.log(products)
    return res.render("Product/viewAllProduct", { products });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

exports.viewAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("category").populate("subCategoryTitle").populate("extraSubCategoryTitle")
    console.log(products)
    return res.render("Product/viewAllProduct", { products });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let singleProdcut = await Product.findById(req.params.id);

    if (singleProdcut && singleProdcut.productImage) {
      let imagePath = path.join(__dirname, "..", singleProdcut.productImage);
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.log("Image delete error:", err.message);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    console.log("Your Product is Deleted Successfully")
    return res.redirect("/Product/viewAllProduct");

  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

exports.editProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subCategoryTitle")
      .populate("extraSubCategoryTitle");
    const catagories = await Catagory.find();
    const subCatagories = await subCatagory.find();
    const extSubCatagories = await extSubCatagory.find();

    return res.render("Product/editProduct", { product, catagories, subCatagories, extSubCatagories });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

exports.editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let product = await Product.findById(id);
    let imagePath = product.productImage;

    if (req.file) {
      if (product.productImage) {
        let oldImagePath = path.join(__dirname, "..", product.productImage);
        if (oldImagePath != "") {
          try {
            fs.unlinkSync(oldImagePath);
          } catch (err) {
            console.log("Image delete error:", err.message);
          }
        }
      }
      imagePath = `/uploads/Product-Images/${req.file.filename}`;
    }

    let extraSubCategoryTitle =
      req.body.extraSubCategoryTitle && req.body.extraSubCategoryTitle !== ""
        ? req.body.extraSubCategoryTitle
        : null;

    let updateData = {
      ...req.body,
      extraSubCategoryTitle: extraSubCategoryTitle,
      productImage: imagePath,
    };

    await Product.findByIdAndUpdate(id, updateData, { new: true });

    console.log("Product updated successfully");
    return res.redirect("/Product/viewAllProduct");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};


exports.getSubCategories = async (req, res) => {
  try {
    let subCats = await subCatagory.find({ catagory: req.params.categoryId });
    return res.json(subCats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching subcategories" });
  }
};

exports.getExtraSubCategories = async (req, res) => {
  try {
    let extraSubs = await extSubCatagory.find({ subCatagoryTitle: req.params.subCategoryId });
    return res.json(extraSubs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching extra subcategories" });
  }
};