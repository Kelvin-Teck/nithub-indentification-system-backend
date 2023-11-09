const QRCode = require("qrcode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../mailer/transporter");

const sendError = (message, code) => {
  var error = {
    status: "ERROR",
    code: code,
    message: message,
  };

  return error;
};

const sendSuccess = (message, data = undefined) => {
  var success = {
    status: "SUCCESS",
    code: 200,
    message: message,
    data: data,
  };

  return success;
};

const newError = (message, code) => {
  const error = new Error(message);
  error.status = code;
  throw error;
};

const generateQRCode = async (data) => {
  try {
    const json_to_string = JSON.stringify(data);
    const code = await QRCode.toDataURL(json_to_string);

    return code;
  } catch (error) {
    return newError(
      `an error occured while generating QRCode '--${error.message}--'`,
      404
    );
  }
};

const generatePassword = () => {
  let password = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  for (let i = 0; i < 8; i++) {
    const randomCharacters = Math.floor(Math.random() * characters.length);

    password += characters[randomCharacters];
  }

  return password;
};

const hashPassword = async (data) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data, salt);

    return hashedPassword;
  } catch (error) {
    return newError(
      "error ocurred while trying to hash password" + error.message,
      404
    );
  }
};

const verifyPassword = async (inputed_password, password_from_db) => {
  try {
    const verifiedPassword = await bcrypt.compare(
      inputed_password,
      password_from_db
    );

    return verifiedPassword;
  } catch (error) {
    return newError(
      "error ocurred while trying to validate password " + error.message,
      404
    );
  }
};

const createAccessToken = (admin) =>
  jwt.sign(admin, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "5h" });

const sendMail = async (mailInfo) => {
  let message = {
    from: "<message@noreply>",
    to: mailInfo.to,
    subject: mailInfo.subject,
    text: mailInfo.text,
    html: mailInfo.html,
  };

  try {
    await transporter.sendMail(message);
  } catch (error) {
    return newError(error.message, 403);
  }
};

const verifyAccessToken = async (token) => {
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      newError(err.message, 403);
    } else {
      req.admin = decode;
      next();
    }
  });
};

module.exports = {
  sendError,
  sendSuccess,
  newError,
  generateQRCode,
  generatePassword,
  hashPassword,
  verifyPassword,
  createAccessToken,
  sendMail,
  verifyAccessToken,
};
