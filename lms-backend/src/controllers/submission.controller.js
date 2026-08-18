const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');

// 1. Submit Assignment (Student)
const submitAssignment = async (req, res) => {
  try {
    const { fileUrl, textAnswer } = req.body;
    const assignmentId = req.params.id;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const existingSubmission = await Submission.findOne({
      assignmentId,
      studentId: req.user.userId,
    });

    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted this assignment' });
    }

    const submission = new Submission({
      assignmentId,
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

// 2. Get My Submissions (Student)
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ studentId: req.user.userId })
      .populate('assignmentId', 'title courseId totalMarks')
      .populate({
        path: 'assignmentId',
        populate: { path: 'courseId', select: 'title' }
      });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Get All Submissions (Teacher/Admin)
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('studentId', 'name email')
      .populate({
        path: 'assignmentId',
        populate: { path: 'courseId', select: 'title' }
      });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Get Submission by ID
const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('studentId', 'name email')
      .populate({
        path: 'assignmentId',
        populate: { path: 'courseId', select: 'title' }
      });
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5. Get Submissions by Student ID (Teacher/Admin)
const getSubmissionsByStudent = async (req, res) => {
  try {
    const submissions = await Submission.find({ studentId: req.params.studentId })
      .populate('assignmentId', 'title courseId totalMarks')
      .populate({
        path: 'assignmentId',
        populate: { path: 'courseId', select: 'title' }
      });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 6. Get Submissions for an Assignment (Teacher)
const getSubmissionsForAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (assignment.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only the instructor can view submissions' });
    }

    const submissions = await Submission.find({ assignmentId })
      .populate('studentId', 'name email');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 7. Update Submission (Student - Before Grading)
const updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Check if user owns the submission
    if (submission.studentId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only update your own submissions' });
    }

    // Check if already graded
    if (submission.isGraded) {
      return res.status(400).json({ message: 'Cannot update a graded submission' });
    }

    const { fileUrl, textAnswer } = req.body;
    if (fileUrl) submission.fileUrl = fileUrl;
    if (textAnswer) submission.textAnswer = textAnswer;

    await submission.save();
    res.json({ message: 'Submission updated successfully', submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 8. Delete Submission (Student - Before Grading)
const deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (submission.studentId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own submissions' });
    }

    if (submission.isGraded) {
      return res.status(400).json({ message: 'Cannot delete a graded submission' });
    }

    await submission.deleteOne();
    res.json({ message: 'Submission deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 9. Grade Submission (Teacher)
const gradeSubmission = async (req, res) => {
  try {
    const { marksObtained, feedback } = req.body;
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

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

// 10. Update Grade (Teacher)
const updateGrade = async (req, res) => {
  try {
    const { marksObtained, feedback } = req.body;
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const assignment = await Assignment.findById(submission.assignmentId);
    if (assignment.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only the instructor can update grades' });
    }

    submission.marksObtained = marksObtained;
    submission.feedback = feedback;
    submission.isGraded = true;
    await submission.save();

    res.json({ message: 'Grade updated successfully', submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 11. Delete Grade (Teacher)
const deleteGrade = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const assignment = await Assignment.findById(submission.assignmentId);
    if (assignment.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only the instructor can delete grades' });
    }

    submission.marksObtained = 0;
    submission.feedback = '';
    submission.isGraded = false;
    await submission.save();

    res.json({ message: 'Grade deleted successfully', submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  submitAssignment,
  getMySubmissions,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByStudent,
  getSubmissionsForAssignment,
  updateSubmission,
  deleteSubmission,
  gradeSubmission,
  updateGrade,
  deleteGrade,
};