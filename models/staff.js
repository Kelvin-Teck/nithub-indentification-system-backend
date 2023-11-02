const mongoose = require("mongoose");

const staffSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    designation: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    qrcode: { type: String },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staffs", staffSchema);

module.exports = Staff;
