const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/ClientController");
const cache = require("../middlewares/cache");

router.get("/get-all-clients", cache(300), ClientController.getAllClients);
router.get("/get-single-client/:id", cache(300), ClientController.getSingleClient);
router.get(
  "/get-qrcode/:id",
  cache(300),
  ClientController.getSingleClientQRCode
);
router.post("/add-client", ClientController.addClient);

module.exports = router;
