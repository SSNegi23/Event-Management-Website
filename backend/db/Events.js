const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  photos:{
    data: Buffer,
    contentType: String
  },
  rules:String,
  paymentamount:String,
  contacts:decimal
})

module.exports = mongoose.model("events", EventSchema);