const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');   
const requireRole = require('../middleware/role.middleware');   
const {
  createCourse,
  getAllCourses,
  getCourseById,
  getMyCourses,
  updateCourse,
  deleteCourse,
  enrollCourse,
} = require('../controllers/course.controller');

router.get('/my-courses', verifyToken, requireRole(['instructor']), getMyCourses);
router.get('/', verifyToken, getAllCourses);
router.get('/:id', verifyToken, getCourseById);

router.put('/:id', verifyToken, requireRole(['teacher', 'faculty', 'admin']), updateCourse);

router.post('/', verifyToken, requireRole(['teacher', 'faculty', 'admin']), createCourse);
router.post('/:id/enroll', verifyToken, enrollCourse);
router.patch('/:id', verifyToken, requireRole(['teacher', 'faculty', 'admin']), updateCourse);
router.delete('/:id', verifyToken, requireRole(['teacher', 'faculty', 'admin']), deleteCourse);

module.exports = router;
