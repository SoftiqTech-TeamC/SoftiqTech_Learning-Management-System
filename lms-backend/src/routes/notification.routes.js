const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const {
  createNotification,
  getMyNotifications,
  getMyUnreadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require('../controllers/notification.controller');

// Protect all routes in this file with JWT verification
router.use(verifyToken);

router.post('/', createNotification);
router.get('/', getMyNotifications);
router.get('/unread', getMyUnreadNotifications);
router.patch('/read-all', markAllAsRead);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

module.exports = router;
