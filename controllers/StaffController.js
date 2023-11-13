const helpers = require("../config/helpers");
const StaffService = require("../services/staffService");

const addStaff = async (req, res) => {
  try {
    const response = await StaffService.addStaff(req);

    return res
      .status(200)
      .json(helpers.sendSuccess("staff added successfully", response));
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};

const updateStaff = async (req, res) => {
  try {
    const response = await StaffService.updateStaff(req);

    return res
      .status(200)
      .json(helpers.sendSuccess("staff updated successfully", response));
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};


module.exports = { addStaff, updateStaff };
