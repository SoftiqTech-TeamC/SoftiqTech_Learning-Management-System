const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');
const fs = require('fs');
const path = require('path');

// Helper function to delete file
const deleteFile = (filePath) => {
  if (filePath) {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};

// 1. Submit Assignment (Student - with file upload)
const submitAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const { textAnswer } = req.body;
    const file = req.file;

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

    const submissionData = {
      assignmentId,
      studentId: req.user.userId,
      textAnswer: textAnswer || '',
    };

    if (file) {
      submissionData.fileUrl = `/uploads/${file.filename}`;
      submissionData.fileOriginalName = file.originalname;
      submissionData.fileSize = file.size;
    }

    const submission = new Submission(submissionData);
    await submission.save();

    res.status(201).json({
      message: 'Assignment submitted successfully',
      submission,
      file: file ? {
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        path: `/uploads/${file.filename}`
      } : null
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Submit Assignment (Student - text only without file)
const submitAssignmentTextOnly = async (req, res) => {
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

// 3. Get My Submissions (Student)
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

// 4. Get All Submissions (Teacher/Admin)
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

// 5. Get Submission by ID
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

// 6. Get Submissions by Student ID (Teacher/Admin)
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

// 7. Get Submissions for an Assignment (Teacher)
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

// 8. Update Submission with File (Student - Before Grading)
const updateSubmissionWithFile = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (submission.studentId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only update your own submissions' });
    }

    if (submission.isGraded) {
      return res.status(400).json({ message: 'Cannot update a graded submission' });
    }

    const { textAnswer } = req.body;
    const file = req.file;

    if (textAnswer) submission.textAnswer = textAnswer;

    // Handle file update - delete old file if new file uploaded
    if (file) {
      // Delete old file if exists
      if (submission.fileUrl) {
        deleteFile(submission.fileUrl);
      }
      submission.fileUrl = `/uploads/${file.filename}`;
      submission.fileOriginalName = file.originalname;
      submission.fileSize = file.size;
    }

    await submission.save();
    res.json({
      message: 'Submission updated successfully',
      submission,
      file: file ? {
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        path: `/uploads/${file.filename}`
      } : null
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 9. Update Submission (Student - Text only)
const updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (submission.studentId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only update your own submissions' });
    }

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

// 10. Delete File from Submission (Student - Before Grading)
const deleteFileFromSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (submission.studentId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete files from your own submissions' });
    }

    if (submission.isGraded) {
      return res.status(400).json({ message: 'Cannot delete file from a graded submission' });
    }

    if (!submission.fileUrl) {
      return res.status(400).json({ message: 'No file attached to this submission' });
    }

    // Delete file from server
    deleteFile(submission.fileUrl);

    // Remove file fields from submission
    submission.fileUrl = undefined;
    submission.fileOriginalName = undefined;
    submission.fileSize = undefined;

    await submission.save();
    res.json({ message: 'File deleted from submission successfully', submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 11. Delete Submission (Student - Before Grading)
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

    // Delete file from server if exists
    if (submission.fileUrl) {
      deleteFile(submission.fileUrl);
    }

    await submission.deleteOne();
    res.json({ message: 'Submission deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 12. Grade Submission (Teacher)
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

// 13. Update Grade (Teacher)
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

// 14. Delete Grade (Teacher)
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

// 15. Unsubmit Assignment (Student)
const unsubmitAssignment = async (req, res) => {
  try {
    const submission = await Submission.findOne({
      assignmentId: req.params.id,
      studentId: req.user.userId,
    });

    if (!submission) {
      return res.status(404).json({ message: 'No submission found to unsubmit' });
    }

    if (submission.isGraded) {
      return res.status(400).json({ message: 'Cannot unsubmit a graded assignment' });
    }

    // Delete file from server if exists
    if (submission.fileUrl) {
      deleteFile(submission.fileUrl);
    }

    await submission.deleteOne();
    res.json({ message: 'Submission unsubmitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  submitAssignment,
  submitAssignmentTextOnly,
  getMySubmissions,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByStudent,
  getSubmissionsForAssignment,
  updateSubmissionWithFile,
  updateSubmission,
  deleteFileFromSubmission,
  deleteSubmission,
  gradeSubmission,
  updateGrade,
  deleteGrade,
  unsubmitAssignment,
};