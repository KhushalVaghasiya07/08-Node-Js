const express = require("express")
const router = express.Router();
const { homepage, addMovie, delMovie, editFormRender, editMovie, addMovieFormRender } = require("../controller/movie.controller");
const uploadImg = require("../middleware/uploadImage");

router.get("/", homepage)
router.get("/add-movie",addMovieFormRender)
router.post("/add-movie", uploadImg.single("image"), addMovie);
router.get("/delete-movie/:id",delMovie)
router.get("/edit-movie/:id",editFormRender)
router.post("/edit-movie/:id", uploadImg.single("image"),editMovie)

module.exports = router