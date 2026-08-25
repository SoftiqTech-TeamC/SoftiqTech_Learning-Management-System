"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Question {
  _id: string;
  questionText: string;
  options: string[];
  marks: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  passingScore: number;
  questions: Question[];
}

export default function QuizAttemptPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params?.quizId as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState(false);

  // Fetch quiz data
  useEffect(() => {
    if (!quizId) return;

    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }

        const data = await response.json();
        setQuiz(data);
        setTimeLeft(data.duration * 60); // Convert minutes to seconds
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load quiz");
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Timer
  useEffect(() => {
    if (!timerStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerStarted, timeLeft]);

  // Start timer when user first answers a question
  const startTimer = () => {
    if (!timerStarted) {
      setTimerStarted(true);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, option: string) => {
    startTimer();
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // Submit quiz
  const handleSubmit = async () => {
    if (submitting) return;

    // Check if all questions are answered
    const totalQuestions = quiz?.questions.length || 0;
    const answeredQuestions = Object.keys(answers).length;

    if (answeredQuestions < totalQuestions) {
      const confirmSubmit = confirm(
        `You have answered ${answeredQuestions} out of ${totalQuestions} questions. Are you sure you want to submit?`
      );
      if (!confirmSubmit) return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const answerArray = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quiz-attempts/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quizId,
            answers: answerArray,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit quiz");
      }

      // Redirect to results page
      router.push(`/quizzes/${quizId}/result/${data.attempt._id}`);
    } catch (err: any) {
      setError(err.message || "Failed to submit quiz");
      setSubmitting(false);
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading quiz...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-red-600">{error}</div>
          <Link
            href="/quizzes"
            className="mt-4 inline-block text-[#087F87] hover:underline"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-gray-600">Quiz not found</div>
          <Link
            href="/quizzes"
            className="mt-4 inline-block text-[#087F87] hover:underline"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(answers).length;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-sm text-gray-600">{quiz.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                Total Marks: <span className="font-semibold">{quiz.totalMarks}</span>
              </div>
              <div className="text-sm text-gray-600">
                Passing Score: <span className="font-semibold">{quiz.passingScore}%</span>
              </div>
              <div className="text-sm font-semibold text-red-600">
                Time Left: {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-600">
                Progress: {answeredCount}/{totalQuestions}
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        {quiz.questions.map((question, index) => (
          <div
            key={question._id}
            className="mb-4 rounded-lg bg-white p-6 shadow"
          >
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Question {index + 1}: {question.questionText}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({question.marks} mark{question.marks > 1 ? "s" : ""})
              </span>
            </h3>

            <div className="space-y-2">
              {question.options.map((option, optIndex) => (
                <label
                  key={optIndex}
                  className={`flex cursor-pointer items-center rounded-md border p-3 transition ${
                    answers[question._id] === option
                      ? "border-[#087F87] bg-[#087F87]/10"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={() => {
                      handleAnswerSelect(question._id, option);
                    }}
                    className="mr-3 h-4 w-4 accent-[#087F87]"
                  />
                  <span className="text-gray-800">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="mt-6 flex justify-between">
          <Link
            href="/quizzes"
            className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-md bg-[#087F87] px-8 py-2 text-white transition hover:bg-[#066B72] disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>
      </div>
    </main>
  );
}