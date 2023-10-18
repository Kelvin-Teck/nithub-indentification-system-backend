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
  const {  fullname,
  email,
  phone_number,
  program,
  start_date, 
  end_date,
        duration } = req.body;
    
    const data = {
      fullname,
      email,
      phone_number,
      program,
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
