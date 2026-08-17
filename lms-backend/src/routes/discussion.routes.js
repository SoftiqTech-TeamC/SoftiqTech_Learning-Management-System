const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const {
  createDiscussion,
  getDiscussions,
  getDiscussionById,
  replyToDiscussion,
  updateDiscussion,
  deleteDiscussion,
} = require('../controllers/discussion.controller');

// Protect all routes in this file with JWT verification
router.use(verifyToken);

router.post('/', createDiscussion);
router.get('/', getDiscussions);
router.get('/:id', getDiscussionById);
router.post('/:id/replies', replyToDiscussion);
router.patch('/:id', updateDiscussion);
router.delete('/:id', deleteDiscussion);

module.exports = router;
