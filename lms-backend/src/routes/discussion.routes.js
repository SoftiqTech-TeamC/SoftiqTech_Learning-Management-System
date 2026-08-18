const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const {
  getDiscussions,
  getDiscussionById,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  replyToDiscussion,
} = require('../controllers/discussion.controller');

// Public routes (require authentication)
router.get('/', verifyToken, getDiscussions);
router.get('/:id', verifyToken, getDiscussionById);

// Protected routes
router.post('/', verifyToken, createDiscussion);
router.put('/:id', verifyToken, updateDiscussion);
router.delete('/:id', verifyToken, deleteDiscussion);
router.post('/:id/reply', verifyToken, replyToDiscussion);

module.exports = router;