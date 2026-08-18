const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  togglePublishQuiz,
} = require('../controllers/quiz.controller');

// Student routes
router.get('/', verifyToken, getQuizzes);
router.get('/:id', verifyToken, getQuizById);

// Teacher/Admin routes
router.post('/', verifyToken, requireRole(['teacher', 'admin']), createQuiz);
router.put('/:id', verifyToken, requireRole(['teacher', 'admin']), updateQuiz);
router.delete('/:id', verifyToken, requireRole(['teacher', 'admin']), deleteQuiz);
router.patch('/:id/publish', verifyToken, requireRole(['teacher', 'admin']), togglePublishQuiz);

module.exports = router;