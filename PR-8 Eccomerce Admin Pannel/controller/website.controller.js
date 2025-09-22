const Product = require("../models/product.model");
const Catagory = require("../models/catagory.models");
const AddToCart = require("../models/addToCart.models");
const UserCart = require("../models/addToCart.models");


exports.webPage = async (req, res) => {
  try {
    let products = await Product.find();
    let catagories = await Catagory.find().sort({ _id: -1 }).limit(4);
    let dealProducts = await Product.find().sort({ _id: -1 }).limit(4);
    let user = req.user;

    res.render("website/index", { products, catagories, dealProducts, user });
  } catch (error) {
    console.log(error);
    return res.redirect("back")
  }
};

exports.singleProductView = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subCategoryTitle")
      .populate("extraSubCategoryTitle");

    if (!product) {
      return res.redirect("/");
    }

    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id }
    })
      .limit(4);

    res.render("website/singleProductView", {
      product,
      relatedProducts
    });
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
};

exports.addToCart = async (req, res) => {
  try {

    let product = await Product.findById(req.params.id)

    // console.log(req.user);
    // console.log(product._id);

    let user = req.user;

    let addToCart = await AddToCart.create({
      product: product._id,
      userATC: user._id
    })

    if (addToCart) {
      console.log("Product Added successfully")
      return res.redirect(`/VCart/productView/${product._id}`)
    } else {
      console.log("Something Wrong !!!");
      return res.redirect("/VCart")
    }

  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
}

exports.userCart = async (req, res) => {
  try {
    let user = req.user;

    let userCart = await UserCart.find({ userATC : user._id })
    // console.log(userCart.userATC);
    console.log(userCart)

    // console.log(user._id)

    return res.render("website/userCart", { userCart })
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
}