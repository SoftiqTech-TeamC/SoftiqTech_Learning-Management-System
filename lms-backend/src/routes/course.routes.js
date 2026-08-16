const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');   // already exists from your auth module
const requireRole = require('../middleware/role.middleware');   // already exists from your auth module
const {
  createCourse,
  getAllCourses,
  getCourseById,
  getMyCourses,
  updateCourse,
  deleteCourse,
} = require('../controllers/course.controller');

// Order matters: specific routes like /my-courses must come BEFORE /:id,
// otherwise Express treats "my-courses" as an :id value.

router.get('/my-courses', verifyToken, requireRole(['instructor']), getMyCourses);
router.get('/', verifyToken, getAllCourses);
router.get('/:id', verifyToken, getCourseById);

router.post('/', verifyToken, requireRole(['instructor']), createCourse);
router.patch('/:id', verifyToken, requireRole(['instructor']), updateCourse);
router.delete('/:id', verifyToken, requireRole(['instructor']), deleteCourse);

module.exports = router;
