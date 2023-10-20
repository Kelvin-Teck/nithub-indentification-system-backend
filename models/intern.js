const mongoose = require("mongoose");

const internSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone_number: { type: String, required: true, unique: true },
    internship_position: { type: String, required: true },
    duration: { type: String, required: true },
    qrcode: String,
  },
  { timestamp: true }
);

const Intern = mongoose.model("Interns", internSchema);

module.exports = Intern;
