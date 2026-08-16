const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @route  POST /api/enrollments/:courseId  (student only)
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const existing = await Enrollment.findOne({
      student: req.user.userId,
      course: courseId,
    });
    if (existing) {
      return res.status(409).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      student: req.user.userId,
      course: courseId,
    });

    res.status(201).json({
      message: 'Enrolled successfully',
      enrollment,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/enrollments/my-courses  (student only — their enrolled courses)
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.userId })
      .populate({
        path: 'course',
        populate: { path: 'instructor', select: 'name email' },
      });

    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/enrollments/course/:courseId  (instructor only — see who's enrolled in their course)
const getCourseEnrollments = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Ownership check - instructor can only see enrollments for their own course
    if (course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only view enrollments for your own courses' });
    }

    const enrollments = await Enrollment.find({ course: courseId })
      .populate('student', 'name email');

    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  DELETE /api/enrollments/:courseId  (student only — unenroll)
const unenrollFromCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOneAndDelete({
      student: req.user.userId,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.status(200).json({ message: 'Unenrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  enrollInCourse,
  getMyEnrollments,
  getCourseEnrollments,
  unenrollFromCourse,
};
