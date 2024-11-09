const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: Number,
  gender: String,
  dob: Date,
  password: String,
})

module.exports = mongoose.model("users", userSchema);