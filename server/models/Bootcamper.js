const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BootcamperSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  campus: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  ethnicity: {
    type: String,
    required: true
  },
  active: {
    type: String,
    required: true
  },
  selected: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Bootcamper', BootcamperSchema);
