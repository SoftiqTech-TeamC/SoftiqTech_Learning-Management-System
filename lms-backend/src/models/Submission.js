const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  assignmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Assignment', 
    required: true 
  },
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  fileUrl: { type: String, default: '' },
  textAnswer: { type: String, default: '' },
  marksObtained: { type: Number, default: 0 },
  feedback: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now },
  isGraded: { type: Boolean, default: false },
});

module.exports = mongoose.model('Submission', SubmissionSchema);