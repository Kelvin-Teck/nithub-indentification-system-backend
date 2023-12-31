const helpers = require("../config/helpers");
const { db } = require("../database/db");

const getAllClients = async () => {
  const allClients = await db.Client.find({}).sort({ createdAt: -1 });
    
  return allClients;
};

const getClientById = async (id) => {
  const client = await db.Client.findOne({ _id: id });
   
  if (!client) {
    return helpers.newError('client does not exist in our records', 404);
  }

  return client;
}

const addClient = async (data) => {
    const query = {};
    
  query.fullname = data.fullname;
  query.email = data.email;
  query.phone_number = data.phone_number;
  query.start_date = data.start_date;
  query.end_date = data.end_date;
  query.duration = data.duration;
  query.qrcode = data.qrcode;

    const isExistingClient = await db.Client.findOne(query);

  if (isExistingClient) {
    return helpers.newError("This client already exists", 403);
  }

  await db.Client.create(data);

  return;
};

module.exports = {
  getAllClients,
  getClientById,
  addClient,
};
