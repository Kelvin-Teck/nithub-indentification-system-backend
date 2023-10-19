const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

router.get("/get-all-students", StudentController.getAllStudents);
router.get("/get-qrcode/:id", StudentController.getSingleStudentQRCode);
router.post("/add-student", StudentController.addStudent);

module.exports = router;
