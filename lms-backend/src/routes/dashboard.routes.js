const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const {
  getStudentDashboard,
  getTeacherDashboard,
} = require('../controllers/dashboard.controller');

router.get('/student', verifyToken, getStudentDashboard);
router.get('/teacher', verifyToken, getTeacherDashboard);

module.exports = router;
