const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    phone_number: { type: String, required: true, unique: true },
    program: String ,
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

const Client = mongoose.model("Clients", clientSchema);

module.exports = Client;
