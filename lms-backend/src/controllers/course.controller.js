const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @route  POST /api/courses  (instructor only)
const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const course = await Course.create({
      title,
      description,
      price: price || 0,
      instructor: req.user.userId, // comes from the verified JWT
    });

    res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/courses  (anyone logged in — browse all courses)
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/courses/:id  (anyone logged in — view single course)
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/courses/my-courses  (instructor only — their own courses)
const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.userId });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PATCH /api/courses/:id  (instructor only — must own the course)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Ownership check - an instructor can only edit their own course
    if (course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only edit your own courses' });
    }

    const { title, description, price } = req.body;
    if (title) course.title = title;
    if (description) course.description = description;
    if (price !== undefined) course.price = price;

    await course.save();

    res.status(200).json({ message: 'Course updated', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({
      course: courseId,  // ← CHANGE: course (not courseId)
      student: req.user.userId,  // ← CHANGE: student (not studentId)
    });

    if (existing) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      course: courseId,  // ← CHANGE: course (not courseId)
      student: req.user.userId,  // ← CHANGE: student (not studentId)
    });

    res.status(201).json({
      message: 'Enrolled successfully',
      enrollment,
    });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ message: err.message });
  }
};

// @route  DELETE /api/courses/:id  (instructor only — must own the course)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own courses' });
    }

    await course.deleteOne();

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  getMyCourses,
  updateCourse,
  deleteCourse,
  enrollCourse,
};
