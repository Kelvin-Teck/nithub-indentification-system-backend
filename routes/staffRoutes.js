const express = require("express");
const router = express.Router();
const staffController = require("../controllers/StaffController");

router.post("/add-staff", staffController.addStaff);
router.post("/update-staff/:id", staffController.updateStaff);

module.exports = router;
