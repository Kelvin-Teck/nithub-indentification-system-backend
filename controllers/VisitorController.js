const helpers = require("../config/helpers");
const visitorService = require("../services/visitorService");

const getAllVisitors = async (req, res, next) => {
  try {
    const response = await visitorService.getAllVisitors();

    return res
      .status(200)
      .json(
        helpers.sendSuccess("all visitors successfully retrived!!!", response)
      );
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError("couldn't get all visitors!!!", error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};

const getSingleVisitor = async (req, res) => {
  try {
    const response = await visitorService.getSingleVisitor(req);

    return res
      .status(200)
      .json(
        helpers.sendSuccess("visitor successfully retrived!!!", response)
      );
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError("couldn't get visitor!!!", error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
}

const addVisitor = async (req, res) => {

  try {
    const response = await visitorService.addVisitor(req);

    return res
      .status(200)
      .json(helpers.sendSuccess("visitor successfully added!!!", response));
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};

const getSingleVisitorQRCode = async (req, res) => {
  console.log(req.params.id);
  try {
    const response = await visitorService.getSingleVisitorQRCode(req);

    return res
      .status(200)
      .json(
        helpers.sendSuccess(
          "Visitor's QRCode successfully generated!!!",
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
  getAllVisitors,
  getSingleVisitor,
  getSingleVisitorQRCode,
  addVisitor
};
