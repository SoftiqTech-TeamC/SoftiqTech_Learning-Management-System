const User = require('../models/User');
const Discussion = require('../models/Discussion');

// @route  GET /api/search
// @desc   Search LMS content (users and discussions)
// @access Private
const searchContent = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const keyword = q.trim();
    const regex = new RegExp(keyword, 'i');

    const [users, discussions] = await Promise.all([
      User.find({
        $or: [
          { name: regex },
          { email: regex }
        ]
      }).select('name email role'),

      Discussion.find({
        $or: [
          { title: regex },
          { message: regex }
        ]
      }).populate('author', 'name email role')
    ]);

    res.status(200).json({
      users,
      discussions,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  searchContent,
};
