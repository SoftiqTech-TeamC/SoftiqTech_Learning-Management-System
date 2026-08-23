const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');

const {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissions,
  gradeSubmission,
  getMySubmissions,
} = require('../controllers/assignment.controller');

router.get('/my/submissions', verifyToken, getMySubmissions);
router.post('/:id/submit', verifyToken, submitAssignment);

router.get('/', verifyToken, getAssignments);
router.get('/:id', verifyToken, getAssignmentById);

router.post('/', verifyToken, requireRole(['teacher', 'admin']), createAssignment);
router.put('/:id', verifyToken, requireRole(['teacher', 'admin']), updateAssignment);
router.delete('/:id', verifyToken, requireRole(['teacher', 'admin']), deleteAssignment);
router.get('/:id/submissions', verifyToken, requireRole(['teacher', 'admin']), getSubmissions);
router.patch('/submissions/:id/grade', verifyToken, requireRole(['teacher', 'admin']), gradeSubmission);

module.exports = router;