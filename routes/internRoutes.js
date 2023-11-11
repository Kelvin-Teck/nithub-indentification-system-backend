const express = require("express");
const router = express.Router();
const InternController = require("../controllers/InternController");
const cache = require("../middlewares/cache");

router.get("/get-all-interns", cache(300), InternController.getAllInterns);
router.get(
  "/get-qrcode/:id",
  cache(300),
  InternController.getSingleInternQRCode
);
router.post("/add-intern", InternController.addIntern);

module.exports = router;
