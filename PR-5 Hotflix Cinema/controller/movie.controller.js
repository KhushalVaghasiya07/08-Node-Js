const fs = require("fs");
const path = require("path");
const Movie = require("../model/movie.model");

exports.homepage = async (req, res) => {
  let movie = await Movie.find();
  res.render("index", { movie });
};

exports.addMovie = async (req, res) => {
  let image = req.file ? "/uploads/" + req.file.filename : "";
  console.log("image : ", image);
  await Movie.create({ ...req.body, image });
  console.log("Movie Detail Successfully Added");
  res.redirect("/");
};


exports.delMovie = async (req, res) => {
  let id = req.params.id;
  let singleRec = await Movie.findById(id);
  if (singleRec?.image) {
    let imagePath = path.join(__dirname, "..", singleRec.image.replace(/^\//, ""));
    if (imagePath) {
      await fs.unlinkSync(imagePath);
    }
  }
  await Movie.findByIdAndDelete(id);
  res.redirect("/");
};

exports.editFormRender = async (req, res) => {
  let id = req.params.id;
  let movie = await Movie.findById(id);
  res.render("editMovie", { movie });
};

exports.addMovieFormRender = (req, res) => {
  res.render("addMovie");
};

exports.bookingViewPageRender = async (req, res) => {
  let id = req.params.id;
  let movie = await Movie.findById(id);
  res.render("bokingPage" , { movie });
};

exports.editMovie = async (req, res) => {
  const id = req.params.id;
  let singleEmp = await Movie.findById(id);
  if (!singleEmp) {
    return res.redirect("back");
  }

  let imagePath = "";
  if (req.file) {
    if (singleEmp.image) {
      // only unlink if an image exists
      let oldImagePath = path.join(__dirname, "..", singleEmp.image.replace(/^\//, ""));
      if (fs.existsSync(oldImagePath)) {
        await fs.unlinkSync(oldImagePath);
      }
    }
    imagePath = `/uploads/${req.file.filename}`;
  } else {
    imagePath = singleEmp.image || "";
  }

  await Movie.findByIdAndUpdate(id, { ...req.body, image: imagePath });
  res.redirect("/");
};
