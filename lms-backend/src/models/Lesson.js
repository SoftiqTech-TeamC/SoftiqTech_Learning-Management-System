const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    durationMin: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ['video', 'text', 'quiz'],
      default: 'video',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
