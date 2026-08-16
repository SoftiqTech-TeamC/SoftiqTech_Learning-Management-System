const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const {
  enrollInCourse,
  getMyEnrollments,
  getCourseEnrollments,
  unenrollFromCourse,
} = require('../controllers/enrollment.controller');

// Order matters: specific routes before dynamic /:courseId ones
router.get('/my-courses', verifyToken, requireRole(['student']), getMyEnrollments);
router.get('/course/:courseId', verifyToken, requireRole(['instructor']), getCourseEnrollments);

router.post('/:courseId', verifyToken, requireRole(['student']), enrollInCourse);
router.delete('/:courseId', verifyToken, requireRole(['student']), unenrollFromCourse);

module.exports = router;
