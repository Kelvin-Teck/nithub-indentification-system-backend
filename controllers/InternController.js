const helpers = require("../config/helpers");
const internService = require("../services/internService");

const getAllInterns = async (req, res, next) => {
  try {
    const response = await internService.getAllInterns();

    return res
      .status(200)
      .json(
        helpers.sendSuccess("all interns successfully retrived!!!", response)
      );
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError("couldn't get all interns!!!", error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};

const addIntern = async (req, res, next) => {
  try {
    const response = await internService.addIntern(req);

    return res
      .status(200)
      .json(helpers.sendSuccess("intern successfully added!!!", response));
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};

const getSingleInternQRCode = async (req, res) => {
  console.log(req.params.id);
  try {
    const response = await internService.getSingleInternQRCode(req);

    return res
      .status(200)
      .json(
        helpers.sendSuccess(
          "Intern's QRCode successfully generated!!!",
          response
        )
      );
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};

module.exports = {
    getAllInterns,
    getSingleInternQRCode,
    addIntern
};
