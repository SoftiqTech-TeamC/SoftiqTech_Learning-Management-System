const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: function() {
      return !this.parentDiscussion; // Required only for top-level discussions
    },
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parentDiscussion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual to get replies
DiscussionSchema.virtual('replies', {
  ref: 'Discussion',
  localField: '_id',
  foreignField: 'parentDiscussion',
});

module.exports = mongoose.model('Discussion', DiscussionSchema);