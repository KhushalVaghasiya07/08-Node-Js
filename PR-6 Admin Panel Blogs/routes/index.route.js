const express = require("express");
const router = express.Router();
const { homepage } = require("../controller/index.controller");
const userRouter = require("./user.route");

router.get("/", homepage)
router.use("/users", userRouter)

module.exports = router