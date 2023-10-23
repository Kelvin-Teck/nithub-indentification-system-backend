const helpers = require("../config/helpers");
const { db } = require("../database/db");

const getAllVisitors = async () => {
  const allVisitors = await db.Visitor.find({}).sort({createdAt: -1});

  return allVisitors;
};

const getVisitorById = async (id) => {
  const visitor = await db.Visitor.findOne({ _id: id });

  if (!visitor) {
    return helpers.newError("This visitor does not exist in our records", 404);
  }

  return visitor;
};

const addVisitor = async (data) => {
  const query = {};

  query.fullname = data.fullname;
  query.email = data.email;
  query.phone_number = data.phone_number;
  query.duration = data.duration;
  query.qrcode = data.qrcode;

  const isExistingVisitor = await db.Visitor.findOne(query);

  if (isExistingVisitor) {
    return helpers.newError("This visitor already exists", 403);
  }

  await db.Visitor.create(data);

  return;
};

module.exports = {
  getAllVisitors,
  getVisitorById,
  addVisitor,
};
