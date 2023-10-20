const express = require("express");
const router = express.Router();
const InternController = require("../controllers/InternController");

router.get("/get-all-interns", InternController.getAllInterns);
router.get("/get-qrcode/:id", InternController.getSingleInternQRCode);
router.post("/add-intern", InternController.addIntern);

module.exports = router;
