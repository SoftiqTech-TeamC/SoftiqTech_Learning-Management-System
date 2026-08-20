const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @route  POST /api/courses (instructor only)
const createCourse = async (req, res) => {
  try {
    const { 
      title, 
      courseCode, 
      description, 
      category, 
      duration, 
      maxStudents, 
      status, 
      price 
    } = req.body;

    //  Validate required fields
    if (!title || !courseCode || !description) {
      return res.status(400).json({ 
        message: 'Title, course code, and description are required' 
      });
    }

    //  Check if course code already exists
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(409).json({ message: 'Course code already exists' });
    }

    const course = await Course.create({
      title,
      courseCode,
      description,
      category: category || 'Other',
      duration: duration || 'Not specified',
      maxStudents: maxStudents || 50,
      status: status || 'draft',
      price: price || 0,
      instructor: req.user.userId,
    });

    //  Populate instructor details before sending response
    const populatedCourse = await Course.findById(course._id).populate('instructor', 'name email');

    res.status(201).json({
      message: 'Course created successfully',
      course: populatedCourse,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/courses (anyone logged in — browse all courses)
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email').sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/courses/:id (anyone logged in — view single course)
// Supports both ObjectId AND slug
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    let course;

    // Check if ID is a MongoDB ObjectId or slug
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(id).populate('instructor', 'name email');
    } else {
      course = await Course.findOne({ slug: id }).populate('instructor', 'name email');
    }

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/courses/my-courses (instructor/teacher/admin only)
const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.userId })
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PATCH /api/courses/:id (instructor only — must own the course)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Ownership check
    if (course.instructor.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only edit your own courses' });
    }

    // Allow updating all fields
    const { 
      title, 
      courseCode, 
      description, 
      category, 
      duration, 
      maxStudents, 
      status, 
      price 
    } = req.body;

    if (title) course.title = title;
    if (courseCode) {
      // Check if new course code conflicts with another course
      const existing = await Course.findOne({ courseCode, _id: { $ne: course._id } });
      if (existing) {
        return res.status(409).json({ message: 'Course code already exists' });
      }
      course.courseCode = courseCode;
    }
    if (description) course.description = description;
    if (category) course.category = category;
    if (duration) course.duration = duration;
    if (maxStudents) course.maxStudents = maxStudents;
    if (status) course.status = status;
    if (price !== undefined) course.price = price;

    await course.save();

    const populatedCourse = await Course.findById(course._id).populate('instructor', 'name email');
    res.status(200).json({ message: 'Course updated', course: populatedCourse });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  POST /api/courses/:id/enroll (student only)
const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({
      course: courseId,
      student: req.user.userId,
    });

    if (existing) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      course: courseId,
      student: req.user.userId,
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

// @route  DELETE /api/courses/:id (instructor only — must own the course)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.userId && req.user.role !== 'admin') {
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