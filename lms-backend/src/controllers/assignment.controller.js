const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');

// Get single assignment
const getAssignments = async (req, res) => {
  try {
    const { courseId } = req.query;
    const filter = courseId ? { courseId } : {};
    const assignments = await Assignment.find(filter)
      .populate('createdBy', 'name')
      .populate('courseId', 'title');
    
    // Add submission count for each assignment
    const Submission = require('../models/Submission');
    const assignmentsWithCount = await Promise.all(assignments.map(async (assignment) => {
      const submissionCount = await Submission.countDocuments({ assignmentId: assignment._id });
      const assignmentObj = assignment.toJSON();
      assignmentObj.submissionCount = submissionCount;
      return assignmentObj;
    }));
    
    res.json(assignmentsWithCount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAssignment = async (req, res) => {
  try {
    const { courseId, title, description, dueDate, totalMarks } = req.body;

    //  Import Course model correctly
    const Course = require('../models/Course');
    const Assignment = require('../models/Assignment');

    //  Find the course
    const course = await Course.findById(courseId);
    console.log('🔍 Course found:', course);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    //  Check if user is the instructor or admin
    const instructorId = course.instructor ? course.instructor.toString() : null;
    console.log('🔍 Instructor ID:', instructorId);
    console.log('🔍 User ID:', req.user.userId);
    
    if (instructorId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Only the course instructor can create assignments' 
      });
    }

    //  Create the assignment
    const assignment = new Assignment({
      courseId,
      title,
      description,
      dueDate,
      totalMarks,
      createdBy: req.user.userId,
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    console.error('❌ Create assignment error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update assignment
const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    if (assignment.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(assignment, req.body);
    assignment.updatedAt = Date.now();
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete assignment
const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    if (assignment.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await assignment.deleteOne();
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit assignment
const submitAssignment = async (req, res) => {
  try {
    const { fileUrl, textAnswer } = req.body;
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    const Submission = require('../models/Submission');
    const existingSubmission = await Submission.findOne({
      assignmentId: req.params.id,
      studentId: req.user.userId,
    });

    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted this assignment' });
    }

    const submission = new Submission({
      assignmentId: req.params.id,
      studentId: req.user.userId,
      fileUrl,
      textAnswer,
    });

    await submission.save();
    res.status(201).json({ message: 'Assignment submitted successfully', submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get submissions (Teacher/Admin only)
const getSubmissions = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    if (assignment.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only the instructor can view submissions' });
    }

    const Submission = require('../models/Submission');
    const submissions = await Submission.find({ assignmentId: req.params.id })
      .populate('studentId', 'name email');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Grade submission
const gradeSubmission = async (req, res) => {
  try {
    const { marksObtained, feedback } = req.body;
    const Submission = require('../models/Submission');
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    const assignment = await Assignment.findById(submission.assignmentId);
    if (assignment.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only the instructor can grade submissions' });
    }

    submission.marksObtained = marksObtained;
    submission.feedback = feedback;
    submission.isGraded = true;
    await submission.save();

    res.json({ message: 'Submission graded successfully', submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get my submissions (Student)
const getMySubmissions = async (req, res) => {
  try {
    const Submission = require('../models/Submission');
    const submissions = await Submission.find({ studentId: req.user.userId })
      .populate('assignmentId', 'title courseId')
      .populate({
        path: 'assignmentId',
        populate: { path: 'courseId', select: 'title' }
      });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single assignment by ID
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('courseId', 'title');
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Add submission count
    const Submission = require('../models/Submission');
    const submissionCount = await Submission.countDocuments({ assignmentId: assignment._id });
    const assignmentObj = assignment.toJSON();
    assignmentObj.submissionCount = submissionCount;
    
    res.json(assignmentObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissions,
  gradeSubmission,
  getMySubmissions,
};