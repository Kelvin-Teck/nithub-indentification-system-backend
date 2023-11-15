const helpers = require("../config/helpers");
const { db } = require("../database/db");

const getAllInterns = async () => {
  const allInterns = await db.Intern.find({}).sort({createdAt: -1});

  return allInterns;
};

const getInternById = async (id) => {
  const intern = await db.Intern.findOne({ _id: id });

  if (!intern) {
    return helpers.newError("intern does not exist in our records", 404);
  }

  return intern;
};

const addIntern = async (data) => {
  const query = {};

  query.name = data.name;
  query.email = data.email;
  query.phone_number = data.phone_number;
  query.internship_position = data.internship_position;
  query.duration = data.duration;
  query.qrcode = data.qrcode;

  const isExistingIntern = await db.Intern.findOne(query);

  if (isExistingIntern) {
    return helpers.newError("This intern already exists", 403);
  }

  await db.Intern.create(data);

  return;
};

module.exports = {
  getAllInterns,
  getInternById,
  addIntern,
};
