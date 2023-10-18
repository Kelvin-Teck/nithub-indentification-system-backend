const helpers = require("../config/helpers");
const studentService = require("../services/studentService");

const getAllStudents = async (req, res, next) => {
  try {
    const response = await studentService.getAllStudents();

    return res
      .status(200)
      .json(
        helpers.sendSuccess("all students successfully retrived!!!", response)
      );
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError("couldn't get all students!!!", error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};

const addStudent = async (req, res, next) => {
  try {
    const response = await studentService.addStudent(req);

    return res
      .status(200)
      .json(helpers.sendSuccess("student successfully added!!!", response));
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
    }

    return res
      .status(500)
      .json(helpers.sendError(error.message, 500));
  }
};

module.exports = {
  getAllStudents,
  addStudent,
};
