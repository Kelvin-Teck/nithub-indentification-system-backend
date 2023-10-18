const helpers = require("../config/helpers");
const { db } = require("../database/db");

const getAllClients = async () => {
  const allClients = await db.Client.find({});
    
  return allClients;
};

const addClient = async (data) => {
    const query = {};
    
  query.fullname = data.fullname;
  query.email = data.email;
  query.phone_number = data.phone_number;
  query.start_date = data.start_date;
  query.end_date = data.end_date;
  query.duration = data.duration;

    const isExistingClient = await db.Client.findOne(query);

  if (isExistingClient) {
    return helpers.newError("This client already exists", 403);
  }

  await db.Client.create(data);

  return;
};

module.exports = {
  getAllClients,
  addClient,
};
