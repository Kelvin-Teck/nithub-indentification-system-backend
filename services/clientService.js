const helpers = require("../config/helpers");
const clientRepository = require("../repositories/clientRepository");

const getAllClients = async () => {
  const allClients = await clientRepository.getAllClients();

  if (!allClients) {
    return helpers.newError("no client found in our record!!!", 404);
  }

  return allClients;
};

const addClient = async (req) => {
  const { fullname, email, phone_number, start_date, end_date, duration } =
    req.body;

  if (
    !fullname &&
    !email &&
    !phone_number &&
    !start_date &&
    !end_date &&
    !duration
  )
    return helpers.newError("fields cannot be empty", 403);

  const data = {
    fullname,
    email,
    phone_number,
    start_date,
    end_date,
    duration,
  };

  await clientRepository.addClient(data);

  return;
};

module.exports = {
  getAllClients,
  addClient,
};
