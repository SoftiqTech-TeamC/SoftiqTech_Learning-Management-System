"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface QuizAttempt {
  _id: string;
  quizId: {
    _id: string;
    title: string;
    totalMarks: number;
    passingScore: number;
  };
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
}

export default function MyQuizAttemptsPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/quiz-attempts/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attempts");
        }

        const data = await response.json();
        setAttempts(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load attempts");
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading attempts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Quiz Attempts</h1>
          <Link
            href="/quizzes"
            className="rounded-md bg-[#087F87] px-4 py-2 text-white transition hover:bg-[#066B72]"
          >
            Browse Quizzes
          </Link>
        </div>

        {attempts.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <p className="text-gray-600">You haven't attempted any quizzes yet.</p>
            <Link
              href="/quizzes"
              className="mt-4 inline-block text-[#087F87] hover:underline"
            >
              Start a Quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {attempts.map((attempt) => (
              <div
                key={attempt._id}
                className="rounded-lg bg-white p-6 shadow transition hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {attempt.quizId.title}
                    </h3>
                    <div className="mt-1 text-sm text-gray-600">
                      Score: {attempt.score} / {attempt.totalMarks}
                    </div>
                    <div className="text-sm text-gray-600">
                      Percentage: {Math.round(attempt.percentage)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Submitted: {new Date(attempt.submittedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        attempt.passed
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {attempt.passed ? " Passed" : " Failed"}
                    </div>
                    <Link
                      href={`/quizzes/${attempt.quizId._id}/result/${attempt._id}`}
                      className="mt-2 inline-block text-sm text-[#087F87] hover:underline"
                    >
                      View Results
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}