const helpers = require("../config/helpers");
const staffRepository = require("../repositories/staffRepository");

const addStaff = async (req, res) => {
  const { firstname, lastname, email, designation, phone_number } = req.body;

  if (!firstname && !lastname && !email && !designation && !phone_number)
    return helpers.newError("fields cannot be empty", 403);

  const data = { firstname, lastname, email, designation, phone_number };
  const QRCode = await helpers.generateQRCode(data);
  data.qrcode = QRCode;


  await staffRepository.addStaff(data);

  return;
};

module.exports = { addStaff };
