const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photos: {
    type: String, // Path to the photo file
    required: true,
  },
  rules: {
    type: String,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  contacts: {
    type: String,
    required: true,
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
