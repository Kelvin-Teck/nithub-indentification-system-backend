const express = require("express");
const router = express.Router();
const VisitorController = require("../controllers/VisitorController");

router.get("/get-all-visitors", VisitorController.getAllVisitors);
router.get("/get-qrcode/:id", VisitorController.getSingleVisitorQRCode);
router.post("/add-visitor", VisitorController.addVisitor);

module.exports = router;
