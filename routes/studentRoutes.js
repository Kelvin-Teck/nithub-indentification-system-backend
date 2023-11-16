const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");
const cache = require("../middlewares/cache");

router.get("/get-all-students", cache(300), StudentController.getAllStudents);
router.get(
  "/get-single-student/:id",
  cache(300),
  StudentController.getSingleStudent
);
router.get(
  "/get-qrcode/:id",
  cache(300),
  StudentController.getSingleStudentQRCode
);
router.post("/add-student", StudentController.addStudent);

module.exports = router;
