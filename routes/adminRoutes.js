const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.post("/make-admin", AdminController.makeAdmin);

module.exports = router;
