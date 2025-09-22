/* eslint-disable no-undef */
const Catagory = require("../models/catagory.models")
const SubCatagory = require("../models/subCatagory")
const ExtraSubCatagory = require("../models/extraSubCatagory")
const fs = require("fs")
const path = require("path")
const Product = require("../models/product.model")

exports.addCatagory = (req, res) => {
  try {
    return res.render("Catagory/catagoryPage")
  } catch (error) {
    console.log("error : ", error)
    res.redirect("back")
  }
}

exports.addCatagoryPost = async (req, res) => {

  try {
    let catagoryExist = await Catagory.findOne({ CatagoryTitle: req.body.CatagoryTitle });
    if (catagoryExist) {
      console.log("Your Catagory is Already Exist !!!")
      return res.redirect("/Catagory/Add-Catagory")
    };

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/User-Images/${req.file.filename}`;
    }

    let newCatagory = await Catagory.create({
      ...req.body,
      CatagoryImg: imagePath
    })

    if (newCatagory) {
      console.log("Your Catagory Added Successfully")
      return res.redirect("/Catagory/viewAllCatagory")
    } else {
      return res.redirect("/SubCatagory/AddSubCatagory")
    }

  } catch (error) {
    console.log("error", error);
    return res.redirect("/");
  }
}

exports.viewAllCatagory = async (req, res) => {
  try {
    let Catagories = await Catagory.find()
    return res.render("Catagory/viewAllCatagory", { Catagories })
  } catch (error) {
    console.log("error : ", error)
    res.redirect("back")
  }
}

exports.deleteCatagory = async (req, res) => {
  try {
    let id = req.params.id;
    let singleCatRec = await Catagory.findById(id);

    if (singleCatRec && singleCatRec.CatagoryImg) {
      let imagePath = path.join(__dirname, "..", singleCatRec.CatagoryImg);
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.log("Image delete error:", err.message);
      }
    }

    await Catagory.findByIdAndDelete(id);
    await SubCatagory.deleteMany({ catagory: singleCatRec._id })
    await ExtraSubCatagory.deleteMany({ catagory: singleCatRec._id })
    await Product.deleteMany({ catagory: singleCatRec._id })


    res.redirect("/Catagory/viewAllCatagory");
  } catch (error) {
    console.log("error : ", error);
    res.redirect("/Catagory/viewAllCatagory");
  }
};

exports.editCatagory = async (req, res) => {
  try {
    let catagory = await Catagory.findById(req.params.id)
    return res.render("Catagory/editCatagory", { catagory })
  } catch (error) {
    console.log("error", error)
  }
}

exports.editCatagoryPost = async (req, res) => {
  try {
    let id = req.params.id;
    let imagepath;
    let catagory = await Catagory.findById(id);
    if (req.file) {
      if (catagory.CatagoryImg != "") {
        imagepath = path.join(__dirname, "..", catagory.CatagoryImg)
        try {
          fs.unlinkSync(imagepath)
        } catch (error) {
          console.log("error", error)
          return res.redirect("/Catagory/editCatagory/")
        }
        imagepath = `/uploads/User-Images/${req.file.filename}`
      }
    } else {
      imagepath = catagory.CatagoryImg;
    }

    await Catagory.findByIdAndUpdate(id, { ...req.body, CatagoryImg: imagepath })
    console.log("Your Catagory Update Successfully")
    return res.redirect("/Catagory/viewAllCatagory")
  } catch (error) {
    console.log("error", error)
    return res.redirect("/")
  }
}