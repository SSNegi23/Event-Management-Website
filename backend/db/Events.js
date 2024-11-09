const mongoose = require('mongoose');

// Create the event schema
const EventSchema = new mongoose.Schema({
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
  rules: {
    type: String,
    default: '',
  },
  paymentAmount: {
    type: Number,
    default: 0,
  },
  contacts: {
    type: String,
    default: '',
  },
  image: {
    type: String,
  },
  organizer: {
    type: String,
    required: true,
    default: '',
  }
}, { timestamps: true, collection: "Event" }); // Automatically add createdAt and updatedAt timestamps

// Create and export the Event model
const Event = mongoose.model('Event', EventSchema);
module.exports = Event;