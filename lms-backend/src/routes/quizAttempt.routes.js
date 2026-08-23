const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const {
  submitQuizAttempt,
  getMyQuizAttempts,
  getQuizAttempts,
  getQuizAttemptById,
} = require('../controllers/quizAttempt.controller');

// Student routes
router.post('/submit', verifyToken, submitQuizAttempt);
router.get('/my', verifyToken, getMyQuizAttempts);
router.get('/:id', verifyToken, getQuizAttemptById);

// Teacher/Admin routes
router.get('/quiz/:id/attempts', verifyToken, requireRole(['teacher', 'admin']), getQuizAttempts);

module.exports = router;