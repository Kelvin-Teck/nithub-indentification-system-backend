const express = require("express");
const router = express.Router();
const ClientController = require('../controllers/ClientController')


router.get("/get-all-clients", ClientController.getAllClients);
router.get("/get-qrcode/:id", ClientController.getSingleClientQRCode);
router.post("/add-client", ClientController.addClient);


module.exports = router;
