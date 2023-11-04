const helpers = require("../config/helpers");
const adminService = require("../services/adminService");

const makeAdmin = async (req, res) => {
  try {
    const response = await adminService.makeAdmin(req);

    return res
      .status(200)
      .json(
        helpers.sendSuccess(
          "you have successfully made this staff an admin",
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

const login = async (req, res) => {
  try {
    const response = await adminService.login(req);

    return res.status(200).json(helpers.sendSuccess("login successfull", response));
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
  makeAdmin,
  login,
};
