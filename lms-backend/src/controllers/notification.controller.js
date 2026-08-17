const Notification = require('../models/Notification');
const User = require('../models/User');

// @route  POST /api/notifications
// @desc   Create a new notification
// @access Private
const createNotification = async (req, res) => {
  try {
    const { recipient, title, message, type } = req.body;
    const sender = req.user.userId;

    if (!recipient || !title || !message) {
      return res.status(400).json({ message: 'Recipient, title and message are required' });
    }

    // Verify recipient user exists
    const recipientUser = await User.findById(recipient);
    if (!recipientUser) {
      return res.status(404).json({ message: 'Recipient user not found' });
    }

    const notification = await Notification.create({
      recipient,
      sender,
      title,
      message,
      type: type || 'info',
    });

    res.status(201).json({
      message: 'Notification created successfully',
      notification,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/notifications
// @desc   Get current user's notifications
// @access Private
const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.userId })
      .sort({ createdAt: -1 })
      .populate('sender', 'name email role');

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/notifications/unread
// @desc   Get current user's unread notifications
// @access Private
const getMyUnreadNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.userId,
      isRead: false,
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'name email role');

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PATCH /api/notifications/:id/read
// @desc   Mark a notification as read
// @access Private
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Ensure user only modifies their own notifications
    if (notification.recipient.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied: You can only modify your own notifications' });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
      message: 'Notification marked as read',
      notification,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PATCH /api/notifications/read-all
// @desc   Mark all current user's notifications as read
// @access Private
const markAllAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { recipient: req.user.userId, isRead: false },
      { isRead: true }
    );

    res.status(200).json({
      message: 'All notifications marked as read',
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  DELETE /api/notifications/:id
// @desc   Delete a notification
// @access Private
const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Ensure user only deletes their own notifications
    if (notification.recipient.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied: You can only delete your own notifications' });
    }

    await Notification.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createNotification,
  getMyNotifications,
  getMyUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
