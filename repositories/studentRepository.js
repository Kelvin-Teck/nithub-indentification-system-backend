const helpers = require("../config/helpers");
const { db } = require("../database/db");

const getAllStudents = async () => {
  const allStudents = await db.Student.find({});

  return allStudents;
};

const getStudentById = async (id) => {
  const student = await db.Student.findOne({ _id: id });

  if (!student) {
    return helpers.newError("client does not exist in our records", 404);
  }

  return student;
};

const addStudent = async (data) => {
  const query = {};

  query.fullname = data.fullname;
  query.email = data.email;
  query.phone_number = data.phone_number;
  query.program_type = data.program_type;
  query.start_date = data.start_date;
  query.end_date = data.end_date;
  query.program_duration = data.program_duration;
  query.qrcode = data.qrcode;

  const isExistingStudent = await db.Student.findOne(query);

  if (isExistingStudent) {
    return helpers.newError("This student already exists", 403);
  }

  await db.Student.create(data);

  return;
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
};
