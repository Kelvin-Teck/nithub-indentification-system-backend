const express = require("express");
const router = express.Router();
const VisitorController = require("../controllers/VisitorController");
const cache = require("../middlewares/cache");

router.get("/get-all-visitors", cache(300), VisitorController.getAllVisitors);
router.get(
  "/get-single-visitor/:id",
  cache(300),
  VisitorController.getSingleVisitor
);
router.get(
  "/get-qrcode/:id",
  cache(300),
  VisitorController.getSingleVisitorQRCode
);
router.post("/add-visitor", VisitorController.addVisitor);

module.exports = router;
