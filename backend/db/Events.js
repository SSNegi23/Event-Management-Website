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
    default: '',
  },
  image: {
    // filename: {
    //   type: String,
    //   required: true,
    // },
    // contentType: {
    //   type: String,
    //   required: true,
    // },
    type: String,
  },
}, { timestamps: true, collection: "Event" }); // Automatically add createdAt and updatedAt timestamps

// Create and export the Event model
const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
