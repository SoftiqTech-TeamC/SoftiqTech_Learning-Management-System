const mongoose = require('mongoose');
const Discussion = require('../models/Discussion');
const User = require('../models/User');

// @route  POST /api/discussions
// @desc   Create a new discussion thread
// @access Private
const createDiscussion = async (req, res) => {
  try {
    const { title, message, content } = req.body;
    const discussionMessage = message || content;
    const author = req.user.userId;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!discussionMessage || !discussionMessage.trim()) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const discussion = await Discussion.create({
      author,
      title: title.trim(),
      message: discussionMessage.trim(),
    });

    // Populate author info for the response
    await discussion.populate('author', 'name email role');

    res.status(201).json({
      message: 'Discussion created successfully',
      discussion,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/discussions
// @desc   Get all top-level discussion threads (newest first)
// @access Private
const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find({ parentDiscussion: null })
      .sort({ createdAt: -1 })
      .populate('author', 'name email role');

    res.status(200).json(discussions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/discussions/:id
// @desc   Get a single discussion and its replies
// @access Private
const getDiscussionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const discussion = await Discussion.findById(id).populate('author', 'name email role');

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Get all replies for this discussion thread (oldest first)
    const replies = await Discussion.find({ parentDiscussion: id })
      .sort({ createdAt: 1 })
      .populate('author', 'name email role');

    res.status(200).json({
      discussion,
      replies,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  POST /api/discussions/:id/replies
// @desc   Reply to a discussion thread
// @access Private
const replyToDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, content } = req.body;
    const replyMessage = message || content;
    const author = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Verify parent discussion exists
    const parentDiscussion = await Discussion.findById(id);
    if (!parentDiscussion) {
      return res.status(404).json({ message: 'Parent discussion not found' });
    }

    if (!replyMessage || !replyMessage.trim()) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const reply = await Discussion.create({
      author,
      message: replyMessage.trim(),
      parentDiscussion: id,
    });

    // Populate author info for the response
    await reply.populate('author', 'name email role');

    res.status(201).json({
      message: 'Reply created successfully',
      reply,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PATCH /api/discussions/:id
// @desc   Update own discussion thread or reply
// @access Private
const updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, content } = req.body;
    const updatedMessage = message || content;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Ensure user only updates their own discussions/replies
    if (discussion.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied: You can only update your own discussions' });
    }

    // Validate update fields if they are supplied
    if (title !== undefined) {
      if (!title.trim() && !discussion.parentDiscussion) {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      discussion.title = title.trim();
    }

    if (updatedMessage !== undefined) {
      if (!updatedMessage.trim()) {
        return res.status(400).json({ message: 'Message content cannot be empty' });
      }
      discussion.message = updatedMessage.trim();
    }

    await discussion.save();
    await discussion.populate('author', 'name email role');

    res.status(200).json({
      message: 'Discussion updated successfully',
      discussion,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  DELETE /api/discussions/:id
// @desc   Delete own discussion thread or reply
// @access Private
const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Ensure user only deletes their own discussions/replies
    if (discussion.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied: You can only delete your own discussions' });
    }

    // Delete the discussion itself
    await Discussion.findByIdAndDelete(id);

    // If it was a top-level thread, also delete all replies to it
    if (!discussion.parentDiscussion) {
      await Discussion.deleteMany({ parentDiscussion: id });
    }

    res.status(200).json({ message: 'Discussion deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createDiscussion,
  getDiscussions,
  getDiscussionById,
  replyToDiscussion,
  updateDiscussion,
  deleteDiscussion,
};
