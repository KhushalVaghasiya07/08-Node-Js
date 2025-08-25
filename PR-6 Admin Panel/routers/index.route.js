const express = require("express");
const { dashboard,  postlogin, logOut, loginGet, loginPost } = require("../controller/dashboard.controller");
const usersRouter = require("./user.route");
const blogroute = require("./blog.route");
const router = express.Router();

router.get("/", loginGet);
router.post("/loginUser", loginPost);
router.get("/logOut", logOut);
router.get("/dashboard", dashboard);
router.use("/users", usersRouter);
router.use("/blog", blogroute);

module.exports = router;