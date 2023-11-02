const helpers = require("../config/helpers");
const staffRepository = require("../repositories/staffRepository");

const addStaff = async (req, res) => {
  const { firstname, lastname, email, designation } = req.body;

  if (!firstname && !lastname && !email && !designation)
    return helpers.newError("fields cannot be empty", 403);

  const data = { firstname, lastname, email, designation };

  await staffRepository.addStaff(data);

  return;
};

module.exports = { addStaff };
