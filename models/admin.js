const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    staff: { type: mongoose.Types.ObjectId, ref: "Staff" },
    admin_type: { type: String, enum : ["super", "minor"], default: "minor" },
    password: { type: String },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admins", adminSchema);

module.exports = Admin;
