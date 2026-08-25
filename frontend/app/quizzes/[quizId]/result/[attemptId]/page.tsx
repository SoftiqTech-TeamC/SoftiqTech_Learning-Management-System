"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface AttemptResult {
  _id: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
  quizId: {
    _id: string;
    title: string;
    passingScore: number;
  };
}

export default function QuizResultPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = params?.attemptId as string;

  const [result, setResult] = useState<AttemptResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!attemptId) return;

    const fetchResult = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/quiz-attempts/${attemptId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch result");
        }

        const data = await response.json();
        setResult(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load result");
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-gray-600">Loading results...</div>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-xl text-red-600">{error || "Result not found"}</div>
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

  const isPassed = result.passed;
  const percentage = Math.round(result.percentage);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="rounded-lg bg-white p-8 shadow">
          <h1 className="text-2xl font-bold text-gray-900">
            Quiz Results: {result.quizId.title}
          </h1>

          {/* Score Display */}
          <div className="mt-6 text-center">
            <div
              className={`inline-block rounded-full p-6 ${
                isPassed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <div className="text-5xl font-bold">{percentage}%</div>
            </div>

            <div className="mt-4">
              <div
                className={`text-2xl font-semibold ${
                  isPassed ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPassed ? " Passed!" : " Failed"}
              </div>
              <div className="text-gray-600">
                Score: {result.score} / {result.totalMarks}
              </div>
              <div className="text-sm text-gray-500">
                Passing Score: {result.quizId.passingScore}%
              </div>
              <div className="text-sm text-gray-500">
                Submitted: {new Date(result.submittedAt).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/quizzes"
              className="rounded-md bg-[#087F87] px-6 py-2 text-white transition hover:bg-[#066B72]"
            >
              Back to Quizzes
            </Link>
            <Link
              href={`/quizzes/${result.quizId._id}/attempt`}
              className="rounded-md border border-[#087F87] px-6 py-2 text-[#087F87] transition hover:bg-[#087F87]/10"
            >
              Retry Quiz
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}