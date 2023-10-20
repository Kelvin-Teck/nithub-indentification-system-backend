const helpers = require("../config/helpers");
const visitorRepository = require("../repositories/visitorRepository");

const getAllVisitors = async () => {
  const allVisitors = await visitorRepository.getAllVisitors();

  if (!allVisitors) {
    return helpers.newError("no visitors found in our record!!!", 404);
  }

  return allVisitors;
};

const addVisitor = async (req) => {
  const {
    name,
    email,
    phone_number,
    duration,
  } = req.body;

  const data = {
    name,
    email,
    phone_number,
    duration,
  };

  const QRCode = await helpers.generateQRCode(data);

  data.qrcode = QRCode;

  await visitorRepository.addVisitor(data);

  return;
};

const getSingleVisitorQRCode = async (req) => {
  const { id } = req.params;

  const visitorInfo = await visitorRepository.getVisitorById(id);

  if (!visitorInfo) return;

  return visitorInfo.qrcode;
};

module.exports = {
    getAllVisitors,
    getSingleVisitorQRCode,
    addVisitor
};
