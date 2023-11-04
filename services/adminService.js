const helpers = require("../config/helpers");
const adminRepository = require("../repositories/adminRepository");
const staffRepository = require("../repositories/staffRepository");

const makeAdmin = async (req, res) => {
  const { id, firstname, lastname, email, designation, phone_number } =
    req.body;

  const isExistingAdmin = await adminRepository.getAdminByStaffId(id);

  if (isExistingAdmin)
    return helpers.newError(
      "cannot perform operation this user is already an admin",
      403
    )

  if (!firstname && !lastname && !email && !designation && !phone_number)
    return helpers.newError("credentials cannot be empty", 403);

  const password = helpers.generatePassword();
  console.log(password);

  const hashPassword = await helpers.hashPassword(password);
  console.log(hashPassword);

  const data = {
    firstname,
    lastname,
    email,
    phone_number,
    designation,
    password: hashPassword,
  };

  await adminRepository.makeAdmin(data);

  const mailInfo = {
    to: email,
    subject: "assign as an admin at Nithub",
    text: "",
    html: `<div>You have been assigned as an admin an
     your password is : ${password}</div>`,
  };

  await helpers.sendMail(mailInfo);

  return;
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password)
    return helpers.newError("pls fill your credentials!!!", 403);

  const staffDetails = await staffRepository.getStaffByEmail(email);

  const adminInfo = await adminRepository.getAdminByStaffId(staffDetails._id);

  console.log(adminInfo);

  const verifiedPassword = await helpers.verifyPassword(
    adminInfo.password,
    password
  );

  // console.log(adminInfo.password, password);
  console.log(verifiedPassword);

  if (!verifiedPassword)
    return helpers.newError("incorrect password or email", 403);

  const { password: pass, ...data_to_be_signed } = adminInfo;

  const accessToken = await helpers.createAccessToken(data_to_be_signed);

  return accessToken;
};

module.exports = { makeAdmin, login };
