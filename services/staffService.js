const helpers = require("../config/helpers");
const staffRepository = require("../repositories/staffRepository");

const getAllStaff = async (req, res) => {
  const allStaffs = await staffRepository.getAllStaff();

  if (!allStaffs) return helpers.newError('no staff found in record', 404);

  return allStaffs;
}

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

const updateStaff = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (
    !data.firstname ||
    !data.lastname ||
    !data.email ||
    !data.designation ||
    !data.phone_number
  )
    return helpers.newError("fields cannot be empty!!!", 403);

  const staffInfo = await staffRepository.getStaffById(id);

  if (!staffInfo)
    return helpers.newError("this staff does not exists in our record", 403);

  await staffRepository.updateStaff(id, data);

  return;
};

module.exports = {getAllStaff, addStaff, updateStaff };
