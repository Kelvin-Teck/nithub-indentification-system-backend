const helpers = require("../config/helpers");
const internRepository = require("../repositories/internRepository");

const getAllInterns = async () => {
  const allIntern = await internRepository.getAllInterns();

  if (!allIntern) {
    return helpers.newError("no student found in our record!!!", 404);
  }

  return allIntern;
};

const getSingleIntern = async (req) => {
  const { id } = req.params;

  const internInfo = await internRepository.getInternById(id);

  if (!internInfo)
    return helpers.newError("this intern does not exist in our record", 404);

  return internInfo;
};

const addIntern = async (req) => {
  const { name, email, phone_number, internship_position, duration } = req.body;

  if (!name && !email && !phone_number && !internship_position && !duration)
    return helpers.newError("fields cannot be empty", 403);

  const data = {
    name,
    email,
    phone_number,
    internship_position,
    duration,
  };

  const QRCode = await helpers.generateQRCode(data);

  data.qrcode = QRCode;

  await internRepository.addIntern(data);

  return;
};

const getSingleInternQRCode = async (req) => {
  const { id } = req.params;

  const InternInfo = await internRepository.getInternById(id);

  if (!InternInfo) return;

  return InternInfo.qrcode;
};

module.exports = {
  getAllInterns,
  getSingleIntern,
  getSingleInternQRCode,
  addIntern,
};
