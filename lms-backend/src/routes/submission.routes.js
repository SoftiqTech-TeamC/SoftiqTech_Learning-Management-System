const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');
const {
  submitAssignment,
  submitAssignmentTextOnly,
  getMySubmissions,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByStudent,
  getSubmissionsForAssignment,
  updateSubmissionWithFile,
  updateSubmission,
  deleteFileFromSubmission,
  deleteSubmission,
  gradeSubmission,
  updateGrade,
  deleteGrade,
  unsubmitAssignment,
} = require('../controllers/submission.controller');




router.post('/assignments/:id/submit', verifyToken, upload.single('file'), submitAssignment);

router.post('/assignments/:id/submit-text', verifyToken, submitAssignmentTextOnly);

router.delete('/assignments/:id/unsubmit', verifyToken, unsubmitAssignment);

router.get('/submissions/my', verifyToken, getMySubmissions);

router.put('/submissions/:id', verifyToken, upload.single('file'), updateSubmissionWithFile);

router.patch('/submissions/:id', verifyToken, updateSubmission);

router.delete('/submissions/:id/file', verifyToken, deleteFileFromSubmission);

router.delete('/submissions/:id', verifyToken, deleteSubmission);

router.get('/submissions', verifyToken, requireRole(['teacher', 'admin']), getAllSubmissions);
router.get('/submissions/:id', verifyToken, requireRole(['teacher', 'admin']), getSubmissionById);
router.get('/submissions/student/:studentId', verifyToken, requireRole(['teacher', 'admin']), getSubmissionsByStudent);
router.get('/assignments/:id/submissions', verifyToken, requireRole(['teacher', 'admin']), getSubmissionsForAssignment);
router.patch('/submissions/:id/grade', verifyToken, requireRole(['teacher', 'admin']), gradeSubmission);
router.put('/submissions/:id/grade', verifyToken, requireRole(['teacher', 'admin']), updateGrade);
router.delete('/submissions/:id/grade', verifyToken, requireRole(['teacher', 'admin']), deleteGrade);

module.exports = router;