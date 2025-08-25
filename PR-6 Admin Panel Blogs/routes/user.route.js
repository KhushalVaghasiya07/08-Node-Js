const express = require("express");
const { addUser } = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.get("/adduser", addUser);

module.exports = userRouter;