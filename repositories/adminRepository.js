const helpers = require("../config/helpers");
const { db } = require("../database/db");

const getAdminByStaffId = async (id) => {
  const adminInfo = await db.Admin.findOne({
    staff: id,
  });

  if (!adminInfo) return;

  return adminInfo;
};

const revokeAdmin = async (adminId) => {
  await db.Admin.deleteOne({ _id: adminId });
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

  await db.Admin.create({
    staff: staffInfo._id,
    password: data.hashedPassword,
  });

  return;
};

module.exports = { makeAdmin, getAdminByStaffId, revokeAdmin };
