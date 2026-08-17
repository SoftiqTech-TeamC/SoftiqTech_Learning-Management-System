const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    title: {
      type: String,
      required: [
        function () {
          // Title is required only if it is a top-level discussion (not a reply)
          return !this.parentDiscussion;
        },
        'Title is required',
      ],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      alias: 'content',
      trim: true,
    },
    parentDiscussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discussion',
      alias: 'replyTo',
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Discussion', discussionSchema);
