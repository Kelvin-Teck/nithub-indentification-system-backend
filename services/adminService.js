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

  const { password: pass, ...data_to_sign } = data;

  const accessToken = await helpers.createAccessToken(data_to_sign);

  await adminRepository.makeAdmin(data);

  const mailIfo = {
    to: "chimborvictor10@gmail.com",
    subject: "assign as an admin at Nithub",
    text: "",
    html: `<div>You have been assigned as an admin an
     your password is : ${password}</div>`,
  };

  await helpers.sendMail(mailIfo);

  return;
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password)
    return helpers.newError("pls fill your credentials!!!", 403);

  const adminInfo = await adminRepository.getAdminByEmail(email);

  const verifiedPassword = await helpers.verifyPassword(
    adminInfo.password,
    password
  );

  if (!verifiedPassword)
    return helpers.newError("incorrect password or email", 403);

  console.log(verifiedPassword);
};

module.exports = { makeAdmin, login };
