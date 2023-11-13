const express = require("express");
const router = express.Router();
const staffController = require("../controllers/StaffController");
const cache = require('../middlewares/cache');

router.get("/get-all-staffs", cache(300), staffController.getAllStaff);
router.post("/add-staff", staffController.addStaff);
router.post("/update-staff/:id", staffController.updateStaff);

module.exports = router;
