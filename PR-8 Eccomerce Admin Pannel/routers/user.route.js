const express = require("express");
const { addUserPageRender, addUserPost, viewAllUsers, deleteUser, editUserPageRender, editUserPost } = require("../controller/user.controller");
const passport = require("../middleware/localstrategy.middleware");
const userImage = require("../middleware/userImages.middleware");
const usersRouter = express.Router();

usersRouter.get("/addusers", passport.checkAuthentication, addUserPageRender);
usersRouter.post("/addusers", userImage.single("image"), addUserPost);
usersRouter.get("/viewAllusers", passport.checkAuthentication, viewAllUsers);
usersRouter.get("/editUser/:id", passport.checkAuthentication, editUserPageRender);
usersRouter.post("/editUser/:id", userImage.single("image"), editUserPost);
usersRouter.get("/deleteUser/:id", passport.checkAuthentication, deleteUser);

module.exports = usersRouter;  