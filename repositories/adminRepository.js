const helpers = require("../config/helpers");
const { db } = require("../database/db");

const getAdminByStaffId = async (id) => {
  const adminInfo = await db.Admin.findOne({
    staff: id,
  });

  if (!adminInfo) return;

  return adminInfo;
};

const makeAdmin = async (data) => {
  const staffInfo = await db.Staff.findById(data.id);

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

  const password = helpers.generatePassword();

  const hashedPassword = await helpers.hashPassword(password);

  await db.Admin.create({ staff: staffInfo._id, password: hashedPassword });

  const newAdmin = { password };

  return newAdmin;
};

module.exports = { makeAdmin, getAdminByStaffId };
