const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
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
  Mark2: {
    type: Number
  },
  Comment2: {
    type: String
  },
  Mark3: {
    type: Number
  },
  Comment3: {
    type: String
  },
  Cheating: {
    type: String
  },
  Day: {
    type: String
  },
  bootcamper: {
    type: [Schema.Types.ObjectId],
    ref: 'Bootcamper'
  }
});

module.exports = mongoose.model('Day', DaySchema);
