const helpers = require("../config/helpers");
const { db } = require("../database/db");

const getAllStaff = async () => {
  const allStaffs = await db.Staff.find({});

  if (allStaffs.length == 0)
    return helpers.newError("no staff found in record", 404);

  return allStaffs;
};

const getStaffByEmail = async (email) => {
  const staffInfo = await db.Staff.findOne({ email });

  if (!staffInfo) return;

  return staffInfo;
};

const getStaffById = async (id) => {
  const staffInfo = await db.Staff.findOne({ _id: id });

  if (!staffInfo) return;

  return staffInfo;
};

const updateStaff = async (id, data) => {
  await db.Staff.findByIdAndUpdate({ _id: id }, data);
  return;
};

const addStaff = async (data) => {
  const isExistingStaff = await db.Staff.findOne(data);

  if (isExistingStaff)
    return helpers.newError(
      "cannot perform this operation...this staff already exist",
      403
    );
  await db.Staff.create(data);

  return;
};

module.exports = {
  addStaff,
  getAllStaff,
  getStaffByEmail,
  getStaffById,
  updateStaff,
};
