"use client";

import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Eye,
  Clock3,
  CheckCircle2,
} from "lucide-react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

type Course = {
  _id: string;
  title: string;
};

export default function CreateQuizPage() {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("30");
  const [description, setDescription] = useState("");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [saving, setSaving] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);

  /*
   * Fetch courses from backend
   */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);

        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const data = await response.json().catch(() => null);

          throw new Error(
            data?.message || "Failed to fetch courses."
          );
        }

        const data = await response.json();

        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch courses error:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const addQuestion = () => {
    setQuestions((current) => [
      ...current,
      {
        id: Date.now(),
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  const removeQuestion = (id: number) => {
    if (questions.length === 1) return;

    setQuestions((current) =>
      current.filter((question) => question.id !== id)
    );
  };

  const updateQuestion = (id: number, value: string) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === id
          ? {
              ...question,
              question: value,
            }
          : question
      )
    );
  };

  const updateOption = (
    questionId: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option, index) =>
                index === optionIndex ? value : option
              ),
            }
          : question
      )
    );
  };

  const setCorrectAnswer = (
    questionId: number,
    optionIndex: number
  ) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId
          ? {
              ...question,
              correctAnswer: optionIndex,
            }
          : question
      )
    );
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Enter a quiz title.");
      return;
    }

    if (!course) {
      alert("Select a course.");
      return;
    }

    if (!duration || Number(duration) <= 0) {
      alert("Enter a valid duration.");
      return;
    }

    if (!description.trim()) {
      alert("Enter a quiz description.");
      return;
    }

    if (questions.length === 0) {
      alert("Add at least one question.");
      return;
    }

    /*
     * Validate questions
     */
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      if (!question.question.trim()) {
        alert(`Enter question ${i + 1}.`);
        return;
      }

      if (question.options.some((option) => !option.trim())) {
        alert(`Please fill all options for question ${i + 1}.`);
        return;
      }
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in.");
      return;
    }

    /*
     * Backend expects:
     *
     * {
     *   courseId,
     *   title,
     *   description,
     *   duration,
     *   totalMarks,
     *   passingScore,
     *   questions: [
     *     {
     *       questionText,
     *       options,
     *       correctAnswer,
     *       marks
     *     }
     *   ]
     * }
     */

    const formattedQuestions = questions.map((question) => ({
      questionText: question.question.trim(),
      options: question.options.map((option) =>
        option.trim()
      ),
      correctAnswer:
        question.options[question.correctAnswer].trim(),
      marks: 1,
    }));

    const totalMarks = formattedQuestions.reduce(
      (total, question) => total + question.marks,
      0
    );

    const passingScore = Math.ceil(totalMarks * 0.6);

    const quizData = {
      courseId: course,
      title: title.trim(),
      description: description.trim(),
      duration: Number(duration),
      totalMarks,
      passingScore,
      questions: formattedQuestions,
    };

    try {
      setSaving(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizData),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to create quiz."
        );
      }

      console.log("Quiz created:", data);

      alert("Quiz created successfully!");

      window.location.href = "/teacher/quizzes";
    } catch (error) {
      console.error("Create quiz error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to create quiz."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* SIDEBAR */}
      <Sidebar active="Quizzes" />

      {/* MAIN CONTENT */}
      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/teacher/quizzes"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-slate-500 transition hover:bg-slate-50"
              >
                <ArrowLeft size={18} />
              </Link>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
                  Assessment Center
                </p>

                <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                  Create Quiz
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Build a quiz and publish it for your students.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <Eye size={17} />
                Preview
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#087f87] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b72] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={17} />
                {saving ? "Saving..." : "Save Quiz"}
              </button>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="mx-auto max-w-6xl space-y-6 p-8">
          {/* QUIZ INFORMATION */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Quiz Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add the basic information for your quiz.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* TITLE */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Quiz Title
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Algorithms Fundamentals"
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-[#087f87] focus:ring-2 focus:ring-[#087f87]/10"
                />
              </div>

              {/* COURSE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course
                </label>

                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  disabled={loadingCourses}
                  className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#087f87] disabled:bg-slate-50"
                >
                  <option value="">
                    {loadingCourses
                      ? "Loading courses..."
                      : "Select Course"}
                  </option>

                  {courses.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* DURATION */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Duration
                </label>

                <div className="relative">
                  <Clock3
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full rounded-lg border py-3 pl-10 pr-14 text-sm outline-none focus:border-[#087f87]"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    min
                  </span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={4}
                  placeholder="Add instructions or information for students..."
                  className="w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-[#087f87] focus:ring-2 focus:ring-[#087f87]/10"
                />
              </div>
            </div>
          </section>

          {/* QUESTIONS */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Quiz Questions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add multiple-choice questions and select the correct answer.
                </p>
              </div>

              <div className="rounded-full bg-[#eaf7f7] px-4 py-2 text-xs font-semibold text-[#087f87]">
                {questions.length}{" "}
                {questions.length === 1
                  ? "Question"
                  : "Questions"}
              </div>
            </div>

            {questions.map((question, questionIndex) => (
              <div
                key={question.id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                {/* QUESTION HEADER */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#087f87] text-sm font-bold text-white">
                      {questionIndex + 1}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Question {questionIndex + 1}
                      </h3>

                      <p className="text-xs text-slate-400">
                        Multiple choice question
                      </p>
                    </div>
                  </div>

                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeQuestion(question.id)
                      }
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  )}
                </div>

                {/* QUESTION */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Question
                  </label>

                  <textarea
                    value={question.question}
                    onChange={(e) =>
                      updateQuestion(
                        question.id,
                        e.target.value
                      )
                    }
                    rows={3}
                    placeholder="Write your question here..."
                    className="w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-[#087f87] focus:ring-2 focus:ring-[#087f87]/10"
                  />
                </div>

                {/* OPTIONS */}
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Answer Options
                    </label>

                    <span className="text-xs text-slate-400">
                      Select the correct answer
                    </span>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {question.options.map(
                      (option, optionIndex) => {
                        const isCorrect =
                          question.correctAnswer ===
                          optionIndex;

                        return (
                          <div
                            key={optionIndex}
                            className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                              isCorrect
                                ? "border-[#087f87] bg-[#f0fbfb]"
                                : "border-slate-200"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setCorrectAnswer(
                                  question.id,
                                  optionIndex
                                )
                              }
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                                isCorrect
                                  ? "border-[#087f87] bg-[#087f87] text-white"
                                  : "border-slate-300 text-slate-500"
                              }`}
                            >
                              {String.fromCharCode(
                                65 + optionIndex
                              )}
                            </button>

                            <input
                              value={option}
                              onChange={(e) =>
                                updateOption(
                                  question.id,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`Option ${String.fromCharCode(
                                65 + optionIndex
                              )}`}
                              className="w-full bg-transparent text-sm outline-none"
                            />

                            {isCorrect && (
                              <CheckCircle2
                                size={18}
                                className="shrink-0 text-[#087f87]"
                              />
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* ADD QUESTION */}
            <button
              type="button"
              onClick={addQuestion}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white py-4 text-sm font-semibold text-slate-600 transition hover:border-[#087f87] hover:bg-[#f5fbfb] hover:text-[#087f87]"
            >
              <Plus size={18} />
              Add Another Question
            </button>
          </section>

          {/* BOTTOM ACTIONS */}
          <div className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm">
            <Link
              href="/teacher/quizzes"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              Cancel
            </Link>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg border px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save as Draft"}
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-[#087f87] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b72] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={17} />
                {saving ? "Saving..." : "Save Quiz"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}