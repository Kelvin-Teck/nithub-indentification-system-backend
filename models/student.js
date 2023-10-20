const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
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
    program_type: { type: String, required: true },
    start_date: { type: Date, },
    end_date: { type: Date },
    program_duration: { type: String, required: true },
    qrcode: String
  },
  { timestamps: true }
);

const Student = mongoose.model("Students", studentSchema);

module.exports = Student;
