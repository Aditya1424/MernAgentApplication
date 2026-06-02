const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const hashedPassword =
    await bcrypt.hash("admin123", 10);

  const admin = new User({
    email: "admin@gmail.com",
    password: hashedPassword
  });

  await admin.save();

  console.log("Admin Created");

  process.exit();
}

createAdmin();