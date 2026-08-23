const QuizAttempt = require('../models/QuizAttempt');
const Quiz = require('../models/Quiz');

// Submit Quiz Attempt (Student)
const submitQuizAttempt = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if already attempted
    const existingAttempt = await QuizAttempt.findOne({
      quizId,
      studentId: req.user.userId,
    });

    if (existingAttempt) {
      return res.status(400).json({ message: 'You have already attempted this quiz' });
    }

    // Calculate score
    let correctAnswers = 0;
    let totalMarks = 0;

    const processedAnswers = answers.map((answer) => {
      const question = quiz.questions.find(
        (q) => q._id.toString() === answer.questionId
      );

      if (!question) {
        return { ...answer, isCorrect: false };
      }

      const isCorrect = question.correctAnswer === answer.selectedOption;
      const marks = isCorrect ? question.marks : 0;

      if (isCorrect) correctAnswers++;
      totalMarks += marks;

      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect,
      };
    });

    const score = totalMarks;
    const percentage = (score / quiz.totalMarks) * 100;
    const passed = percentage >= quiz.passingScore;

    const attempt = new QuizAttempt({
      quizId,
      studentId: req.user.userId,
      answers: processedAnswers,
      score,
      totalMarks: quiz.totalMarks,
      percentage,
      passed,
    });

    await attempt.save();

    res.status(201).json({
      message: 'Quiz submitted successfully',
      attempt: {
        _id: attempt._id,
        score,
        totalMarks: quiz.totalMarks,
        percentage,
        passed,
        submittedAt: attempt.submittedAt,
      },
    });
  } catch (err) {
    console.error('Quiz attempt error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get My Quiz Attempts (Student)
const getMyQuizAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ studentId: req.user.userId })
      .populate('quizId', 'title totalMarks passingScore');
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Quiz Attempts for a specific quiz (Teacher/Admin)
const getQuizAttempts = async (req, res) => {
  try {
    const quizId = req.params.id;
    const attempts = await QuizAttempt.find({ quizId })
      .populate('studentId', 'name email')
      .populate('quizId', 'title');
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Quiz Attempt (Student)
const getQuizAttemptById = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.id)
      .populate('quizId', 'title totalMarks passingScore')
      .populate('studentId', 'name email');
    if (!attempt) {
      return res.status(404).json({ message: 'Quiz attempt not found' });
    }
    res.json(attempt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  submitQuizAttempt,
  getMyQuizAttempts,
  getQuizAttempts,
  getQuizAttemptById,
};