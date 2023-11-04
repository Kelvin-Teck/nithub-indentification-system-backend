const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.post("/make-admin", AdminController.makeAdmin);
router.post("/login", AdminController.login);

module.exports = router;
