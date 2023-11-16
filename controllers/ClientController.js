const helpers = require("../config/helpers");
const clientService = require("../services/clientService");

const getAllClients = async (req, res, next) => {
  try {
    const response = await clientService.getAllClients();

    return res
      .status(200)
      .json(
        helpers.sendSuccess("all clients successfully retrived!!!", response)
      );
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError("couldn't get all clients!!!", error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};

const getSingleClient = async (req, res) => {
    try {
      const response = await clientService.getSingleClient(req);

      return res
        .status(200)
        .json(
          helpers.sendSuccess("client successfully retrived!!!", response)
        );
    } catch (error) {
      if (error.status) {
        return res
          .status(error.status)
          .json(helpers.sendError("couldn't get client!!!", error.status));
      }

      return res.status(500).json(helpers.sendError(error.message, 500));
    }
}

const addClient = async (req, res, next) => {
  try {
    const response = await clientService.addClient(req);

    return res
      .status(200)
      .json(helpers.sendSuccess("client successfully added!!!", response));
  } catch (error) {
    if (error.status) {
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
    }

    return res.status(500).json(helpers.sendError(error.message, 500));
  }
};

const getSingleClientQRCode = async (req, res) => {
  console.log(req.params.id);
  try {
    const response = await clientService.getSingleClientQRCode(req);

    return res
      .status(200)
      .json(
        helpers.sendSuccess(
          "Client's QRCode successfully generated!!!",
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
  getAllClients,
  getSingleClient,
  addClient,
  getSingleClientQRCode,
};
