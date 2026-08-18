const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const {
  submitAssignment,
  getMySubmissions,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByStudent,
  getSubmissionsForAssignment,
  updateSubmission,
  deleteSubmission,
  gradeSubmission,
  updateGrade,
  deleteGrade,
} = require('../controllers/submission.controller');

// Student routes
router.post('/assignments/:id/submit', verifyToken, submitAssignment);
router.get('/submissions/my', verifyToken, getMySubmissions);
router.put('/submissions/:id', verifyToken, updateSubmission);
router.delete('/submissions/:id', verifyToken, deleteSubmission);

// Teacher/Admin routes
router.get('/submissions', verifyToken, requireRole(['teacher', 'admin']), getAllSubmissions);
router.get('/submissions/:id', verifyToken, requireRole(['teacher', 'admin']), getSubmissionById);
router.get('/submissions/student/:studentId', verifyToken, requireRole(['teacher', 'admin']), getSubmissionsByStudent);
router.get('/assignments/:id/submissions', verifyToken, requireRole(['teacher', 'admin']), getSubmissionsForAssignment);
router.patch('/submissions/:id/grade', verifyToken, requireRole(['teacher', 'admin']), gradeSubmission);
router.put('/submissions/:id/grade', verifyToken, requireRole(['teacher', 'admin']), updateGrade);
router.delete('/submissions/:id/grade', verifyToken, requireRole(['teacher', 'admin']), deleteGrade);

module.exports = router;