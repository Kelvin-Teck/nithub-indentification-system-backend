const helpers = require("../config/helpers");
const { db } = require("../database/db");

const getAdminByEmail = async (email) => {
  const adminInfo = await db.Admin.findOne({ email });

  if (!adminInfo) return helpers.newError("sorry you are not an authorized admin!!!", 404);

  return adminInfo;
}

const makeAdmin = async (data) => {
  const staffInfo = await db.Staff.findOne({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone_number: data.phone_number,
    designation: data.designation,
  });

  if (!staffInfo)
    return helpers.newError("This staff does not exist in record!!!", 404);

  const isExistingAdmin = await db.Admin.findOne({
    staff: staffInfo._id,
  });

  if (isExistingAdmin)
    return helpers.newError(
      "cannot perform this operation because this staff is already an admin!!",
      403
    );

  await db.Admin.create({ staff: staffInfo._id, password: data.password });

  return;
};

module.exports = { makeAdmin, getAdminByEmail };
