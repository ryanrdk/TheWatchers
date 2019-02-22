const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColleSchema = new Schema({
  Username: {
    type: String,
    required: true
  },
  User_id: {
    type: String,
    required: true
  },
  Campus: {
    type: String,
    required: true,
  },
  Final_mark: {
    type: Number
  },
  Mark1: {
    type: Number
  },
  Comment1: {
    type: String
  },
  Cheating: {
    type: String
  },
  Colle: {
    type: String
  },
  bootcamper: {
    type: [Schema.Types.ObjectId],
    ref: 'Bootcamper'
  }
});

module.exports = mongoose.model('Colle', ColleSchema);
