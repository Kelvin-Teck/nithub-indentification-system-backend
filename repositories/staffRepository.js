const helpers = require("../config/helpers");
const { db } = require("../database/db");

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

module.exports = { addStaff };