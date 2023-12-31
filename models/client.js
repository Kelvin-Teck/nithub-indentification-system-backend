const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    phone_number: { type: String, required: true, unique: true },
    duration: { type: String, required: true },
    qrcode: String,
  },
  { timestamps: true }
);

const Client = mongoose.model("Clients", clientSchema);

module.exports = Client;
