const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
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
  Exam: {
    type: String
  },
  bootcamper: {
    type: [Schema.Types.ObjectId],
    ref: 'Bootcamper'
  }
});

module.exports = mongoose.model('Exam', ExamSchema);
