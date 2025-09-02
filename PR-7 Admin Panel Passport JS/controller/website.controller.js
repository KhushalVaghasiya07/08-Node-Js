const Blog = require("../models/blog.models")

exports.webPage = async (req, res) => {
  try {
    let blogs = await Blog.find()
    res.render("website/index", { blogs })
  } catch (error) {
    console.log(error)
  }
}

exports.loginPage = async (req, res) => {
  try {
    res.render("website/loginPage")
  } catch (error) {
    console.log(error)
  }
}

exports.signUpPage = async (req, res) => {
  try {
    res.render("website/signUpPage")
  } catch (error) {
    console.log(error)
  }
}

exports.singleBlogView = async (req, res) => {
  try {
    const blogs = await Blog.findById(req.params.id);
    const latestBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3);

    res.render("website/singleBlogView", { blogs, latestBlogs });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
