const express = require('express');
const { dashboard, loginGet, loginPost, logOut, forgetPassword, sendEmail, verifyOTP, resetPassword } = require('../controller/dashboard.controller');
const passport = require("../middleware/localstrategy.middleware");
const router = express.Router();

router.get("/", loginGet);
router.post("/loginUser", loginPost);
router.get("/logOut", logOut);


router.get("/forget-password", forgetPassword);
router.post("/send-email", sendEmail);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

router.get("/dashboard", passport.checkAuthentication, dashboard);

router.use("/users", require("./user.route"));
router.use("/Catagory", require("./catagory.route.js"));
router.use("/SubCatagory", require("./subCatagory.route.js"));
router.use("/ExtraSubCatagory", require("./ExtraSubCatagory.route.js"));
router.use("/Product", require("./product.route.js"));

module.exports = router;