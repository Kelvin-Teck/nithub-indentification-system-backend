const helpers = require("../config/helpers");
const clientRepository = require("../repositories/clientRepository");

const getAllClients = async () => {
  const allClients = await clientRepository.getAllClients();

  if (!allClients) {
    return helpers.newError("no client found in our record!!!", 404);
  }

  return allClients;
};

const getSingleClient = async (req) => {
  const { id } = req.params;

  const clientInfo = await clientRepository.getClientById(id);

  if (!clientInfo)
    return helpers.newError("this client does not exists in record", 404);

  return clientInfo;
};

const addClient = async (req) => {
  const { fullname, email, phone_number, duration } = req.body;

  if (!fullname && !email && !phone_number && !duration)
    return helpers.newError("fields cannot be empty", 403);

  const data = {
    fullname,
    email,
    phone_number,
    duration,
  };

  const QRCode = await helpers.generateQRCode(data);

  data.qrcode = QRCode;

  await clientRepository.addClient(data);

  return;
};

const getSingleClientQRCode = async (req) => {
  const { id } = req.params;

  const clientInfo = await clientRepository.getClientById(id);

  if (!clientInfo) return;

  return clientInfo.qrcode;
};

module.exports = {
  getAllClients,
  getSingleClient,
  addClient,
  getSingleClientQRCode,
};
