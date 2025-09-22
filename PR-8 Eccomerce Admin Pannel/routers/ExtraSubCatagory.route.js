const express = require('express');
const { addExtraSubCatagoryForm, addExtraSubCatagory, viewExtraAllSubCatagory, editExtraSubCatagoryForm, deleteExtraSubCatagory, editExtraSubCatagory } = require('../controller/extraSubCatagory');

const extraSubCatagory = express.Router();

extraSubCatagory.get("/AddExtraSubCatagory", addExtraSubCatagoryForm)
extraSubCatagory.post("/AddExtraSubCatagory", addExtraSubCatagory)
extraSubCatagory.get("/viewExtraAllSubCatagory", viewExtraAllSubCatagory)
extraSubCatagory.get("/editExtraSubCatagory/:id", editExtraSubCatagoryForm)
extraSubCatagory.post("/editExtraSubCatagory/:id", editExtraSubCatagory)
extraSubCatagory.get("/deleteExtraSubCatagory/:id", deleteExtraSubCatagory)




module.exports = extraSubCatagory;