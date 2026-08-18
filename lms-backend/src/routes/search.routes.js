const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const { searchContent } = require('../controllers/search.controller');

// Protect search routes with JWT verification
router.use(verifyToken);

router.get('/', searchContent);

module.exports = router;
