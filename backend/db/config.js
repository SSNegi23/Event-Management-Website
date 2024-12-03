const mongoose = require("mongoose");

// Connect to MongoDB without deprecated options
mongoose.connect("mongodb://localhost:27017/EventManagement");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

module.exports = db;
