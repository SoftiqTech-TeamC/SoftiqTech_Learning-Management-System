const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const {
  getMyProfile,
  getAllUsers,
  updateUserRole,
} = require('../controllers/user.controller');

router.get('/me', verifyToken, getMyProfile);
router.get('/', verifyToken, requireRole(['admin']), getAllUsers);
router.patch('/:id/role', verifyToken, requireRole(['admin']), updateUserRole);

module.exports = router;
