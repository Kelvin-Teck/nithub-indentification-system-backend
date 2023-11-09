const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.post("/make-admin/:id", AdminController.makeAdmin);
router.post("/login", AdminController.login);
router.post("/change-password", AdminController.changePassword);
router.delete("/revoke-admin/:id", AdminController.revokeAdmin);

module.exports = router;
