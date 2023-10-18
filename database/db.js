const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGODB_URI_LOCAL, {
      dbName: "nithub-indentification-system",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection established successfully!!!");
  } catch (error) {
    console.log(
      `There was an error trying to connect to DB!!! ${error.message}`
    );
  }
};
//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
//7J4JM6UMVRF7YWO2
const db = {};

db.Student = require("../models/student");
db.Client = require("../models/client");


module.exports = { connectToDB, db };
