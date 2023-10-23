const helpers = require("../config/helpers");
const studentRepository = require("../repositories/studentRepository");

const getAllStudents = async () => {
  const allStudents = await studentRepository.getAllStudents();

  if (!allStudents) {
    return helpers.newError("no student found in our record!!!", 404);
  }

  return allStudents;
};

const addStudent = async (req) => {
  const {
    fullname,
    email,
    phone_number,
    program_type,
    program_duration,
  } = req.body;


    if (
      !fullname &&
      !email &&
      !phone_number &&
      !program_type &&
      !program_duration
    )
    return helpers.newError("fields cannot be empty", 403);
  
  const data = {
    fullname,
    email,
    phone_number,
    program_type,
    program_duration,
  };

  const QRCode = await helpers.generateQRCode(data);

   data.qrcode = QRCode; 

  await studentRepository.addStudent(data);

  return;
};

const getSingleStudentQRCode = async (req) => {
  const { id } = req.params;
  
  const studentInfo = await studentRepository.getStudentById(id);

  if (!studentInfo) return;

  return studentInfo.qrcode;
}

module.exports = {
  getAllStudents,
  getSingleStudentQRCode,
  addStudent,
};
