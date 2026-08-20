const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructions: { type: String, default: '' },
  dueDate: { type: Date, required: true },
  totalMarks: { type: Number, required: true },
   submissionType: { 
    type: String, 
    enum: ['file', 'text', 'both'], 
    default: 'file' 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

AssignmentSchema.virtual('submissionCount', {
  ref: 'Submission',
  localField: '_id',
  foreignField: 'assignmentId',
  count: true,
});

// For populated data, add toJSON
AssignmentSchema.set('toJSON', { virtuals: true });
AssignmentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);