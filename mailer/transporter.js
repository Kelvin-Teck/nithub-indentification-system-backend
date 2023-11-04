const nodemailer = require("nodemailer");

let config = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  service: "gmail",
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
};

let transporter = nodemailer.createTransport(config);

module.exports = transporter;
