const mongoose = require("mongoose");

const visitorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone_number: { type: String, required: true },
    duration: { type: String, required: true },
    qrcode: String,
  },
  { timestamp: true }
);

const Visitor = mongoose.model("Visitors", visitorSchema);

module.exports = Visitor;
