const helpers = require("../config/helpers");
const { db } = require("../database/db");

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
  console.log(data, id)
  await db.Staff.findByIdAndUpdate({ _id: id }, data );
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

module.exports = { addStaff, getStaffByEmail, getStaffById, updateStaff };
