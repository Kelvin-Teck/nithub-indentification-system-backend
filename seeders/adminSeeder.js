const mongoose = require("mongoose");
const { db, connectToDB } = require("../database/db");

const seedStaff = async () => {

  try {
    await db.Staff.insertMany([
      {
        firstname: "David",
        lastname: "Loop",
        email: "test@getMaxListeners.com",
        designation: "ED",
        phone_number: "0987654567766",
      },
    ]);

    console.log(`seeding successfull!!!`);
  } catch (error) {
    console.log(error.message);
  }
};
// {
//     firstname: "David",
//     lastname: "Loop",
//     email: "test@getMaxListeners.com",
//     designation: "ED",
//     phone_number: "0987654567766",
//   },
