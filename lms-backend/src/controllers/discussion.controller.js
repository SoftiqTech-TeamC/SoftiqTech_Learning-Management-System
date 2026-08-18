const Discussion = require('../models/Discussion');

// Get all discussions
const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find({ parentDiscussion: null })
      .populate('author', 'name email')
      .populate('replies')
      .sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get discussion with replies
const getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate('author', 'name email')
      .populate({
        path: 'replies',
        populate: { path: 'author', select: 'name email' }
      });
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.json(discussion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create discussion
const createDiscussion = async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    const discussion = new Discussion({
      title,
      message,
      author: req.user.userId,
    });

    await discussion.save();
    res.status(201).json(discussion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update discussion
const updateDiscussion = async (req, res) => {
  try {
    const { title, message } = req.body;
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    if (discussion.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this discussion' });
    }

    if (title) discussion.title = title;
    if (message) discussion.message = message;
    await discussion.save();

    res.json(discussion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete discussion
const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    if (discussion.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this discussion' });
    }

    // Delete all replies
    await Discussion.deleteMany({ parentDiscussion: req.params.id });
    await discussion.deleteOne();

    res.json({ message: 'Discussion and all replies deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reply to discussion
const replyToDiscussion = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const parentDiscussion = await Discussion.findById(req.params.id);
    if (!parentDiscussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const reply = new Discussion({
      message,
      author: req.user.userId,
      parentDiscussion: req.params.id,
    });

    await reply.save();
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDiscussions,
  getDiscussionById,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  replyToDiscussion,
};