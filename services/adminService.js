const helpers = require("../config/helpers");
const adminRepository = require("../repositories/adminRepository");
const staffRepository = require("../repositories/staffRepository");

const makeAdmin = async (req, res) => {
  const { id } = req.params;

  const {email} = req.body

  const isExistingAdmin = await adminRepository.getAdminByStaffId(id);

  if (isExistingAdmin) {
    return helpers.newError(
      "cannot perform operation this user is already an admin",
      403
    );
  }

  // const data = {
  //   id,
  //   firstname,
  //   lastname,
  //   email,
  //   phone_number,
  //   designation,
  // };

  const password = helpers.generatePassword();

  const hashedPassword = await helpers.hashPassword(password);

   const data = {id, hashedPassword}

  await adminRepository.makeAdmin(data);
  

  const mailInfo = {
    to: email,
    subject: "Invitation to become an admin as an admin at Nithub",
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

  if (adminInfo) {
    const verifyPassword = await helpers.verifyPassword(
      password,
      adminInfo.password
    );

    console.log(verifyPassword);

    if (verifyPassword) {
      const { password: pass, ...data_to_be_signed } = adminInfo;

      const accessToken = await helpers.createAccessToken(data_to_be_signed);

      return accessToken;
    }

    return helpers.newError("incorrect password or email...try again", 403);
  }
};

module.exports = { makeAdmin, login };
