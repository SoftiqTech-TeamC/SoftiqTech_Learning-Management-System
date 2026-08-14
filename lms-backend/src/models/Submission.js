const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student is required'],
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course is required'],
    },
    assignmentTitle: {
      type: String,
      required: [true, 'Assignment title is required'],
      trim: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'graded', 'late'],
      default: 'pending',
    },
    grade: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
