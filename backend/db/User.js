const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  address: { type: String, default: "Add Address here" },
  mediaHandles: {
    instagram: { type: String, default: "Add Your Insta here" },
    twitter: { type: String, default: "Add Your Twitter here" },
    facebook: { type: String, default: "Add Your Facebook here" },
  },
  hobbies: { type: [String], default: [] }, // List of hobbies
  createdAt: { type: Date, default: Date.now }, // Auto-timestamp for user creation
});

module.exports = mongoose.model("User", userSchema);
