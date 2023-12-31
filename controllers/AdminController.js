const helpers = require("../config/helpers");
const adminService = require("../services/adminService");

const makeAdmin = async (req, res) => {
  try {
    const response = await adminService.makeAdmin(req);

    return res
      .status(200)
      .json(
        helpers.sendSuccess(
          "you have successfully made this staff an admin..an email has also been sent with a password to login",
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

    return res
      .status(200)
      .json(helpers.sendSuccess("login successfull", response));
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};

const revokeAdmin = async (req, res) => {
  try {
    const response = await adminService.revokeAdmin(req);

    return res
      .status(200)
      .json(
        helpers.sendSuccess(
          "this staff has been revoked as an admin!!!",
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

const changePassword = async (req, res) => {
  try {
    const response = await adminService.changePassword(req);

    return res
      .status(200)
      .json(
        helpers.sendSuccess(
          "you have successfully changed your password!!!...check your mail for your new password",
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
  makeAdmin,
  login,
  revokeAdmin,
  changePassword,
};
