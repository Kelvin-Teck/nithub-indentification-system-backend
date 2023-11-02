const helpers = require("../config/helpers");
const adminRepository = require("../repositories/adminRepository");

const makeAdmin = async (req, res) => {
  const { firstname, lastname, email, designation } = req.body;

  if (!firstname && !lastname && !email && !designation)
    return helpers.newError("credentials cannot be empty", 403);

  const password = helpers.generatePassword();

  const hashPassword = await helpers.hashPassword(password);

  const data = {
    firstname,
    lastname,
    email,
    designation,
    password: hashPassword,
  };

  await adminRepository.makeAdmin(data);

  return;
};

module.exports = { makeAdmin };
