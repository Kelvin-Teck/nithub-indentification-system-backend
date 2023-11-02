const express = require("express");
const router = express.Router();
const staffController = require("../controllers/StaffController");

router.post("/add-staff", staffController.addStaff);

module.exports =  router;
