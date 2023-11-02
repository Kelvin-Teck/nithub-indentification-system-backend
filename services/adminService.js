const helpers = require("../config/helpers");
const adminRepository = require("../repositories/adminRepository");

const makeAdmin = async (req, res) => {
  const { firstname, lastname, email, designation, phone_number } = req.body;

  if (!firstname && !lastname && !email && !designation && !phone_number)
    return helpers.newError("credentials cannot be empty", 403);

  const password = helpers.generatePassword();

  const hashPassword = await helpers.hashPassword(password);

  const data = {
    firstname,
    lastname,
    email,
    phone_number,
    designation,
    password: hashPassword,
  };

  await adminRepository.makeAdmin(data);

  return;
};

module.exports = { makeAdmin };
