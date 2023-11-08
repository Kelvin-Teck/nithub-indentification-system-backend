const helpers = require("../config/helpers");
const adminRepository = require("../repositories/adminRepository");
const staffRepository = require("../repositories/staffRepository");

const makeAdmin = async (req, res) => {
  const { id } = req.params;

  const isExistingAdmin = await adminRepository.getAdminByStaffId(id);

  if (isExistingAdmin) {
    return helpers.newError(
      "cannot perform operation this user is already an admin",
      403
    );
  }

  const data = {
    id,
    firstname,
    lastname,
    email,
    phone_number,
    designation,
  };

  const { password } = await adminRepository.makeAdmin(data);
  console.log(password);

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
  console.log({ adminInfo });

  if (adminInfo) {
    const verifyPassword = await helpers.verifyPassword(
      password,
      adminInfo.password
    );

    if (verifyPassword) {
      const { password: pass, ...data_to_be_signed } = adminInfo;

      const accessToken = await helpers.createAccessToken(data_to_be_signed);

      return accessToken;
    }

  
  }
};

module.exports = { makeAdmin, login };
