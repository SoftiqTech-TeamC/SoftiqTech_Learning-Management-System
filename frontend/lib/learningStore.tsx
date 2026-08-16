"use client";

// ---------------------------------------------------------------------------
// Learning store — shared state for quizzes, assignments and grades.
//
// Uses React Context + localStorage so that:
//   - what you do on Quizzes/Assignments persists across refreshes
//   - the Grades page reflects your REAL activity (not hardcoded rows)
//
// Persistence happens inside the action functions (not in an effect), which
// keeps SSR safe. When the backend is ready, swap the localStorage writes for
// API calls; the pages consuming this context won't change.
// ---------------------------------------------------------------------------

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  COURSES,
  QUIZZES_SEED,
  ASSIGNMENTS_SEED,
  type QuizResult,
  type AssignmentState,
} from "./learningData";

type LearningState = {
  quizResults: Record<string, QuizResult>;
  assignments: Record<string, AssignmentState>;
};

type LearningContextType = LearningState & {
  saveQuizResult: (quizId: string, correct: number, total: number) => void;
  submitAssignment: (assignmentId: string, fileName: string, note: string) => void;
  unsubmitAssignment: (assignmentId: string) => void;
};

const STORAGE_KEY = "nexus_learning_state_v1";

const LearningContext = createContext<LearningContextType | null>(null);

function loadState(): LearningState {
  if (typeof window === "undefined") {
    return { quizResults: {}, assignments: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as LearningState;
  } catch {
    // ignore corrupt storage
  }
  return { quizResults: {}, assignments: {} };
}

function persist(state: LearningState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full / unavailable — ignore
  }
}

function todayLabel() {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function LearningProvider({ children }: { children: ReactNode }) {
  // Lazy initial state — reads localStorage once on first client render.
  const [state, setState] = useState<LearningState>(() => loadState());

  function update(next: LearningState) {
    persist(next);
    setState(next);
  }

  function saveQuizResult(quizId: string, correct: number, total: number) {
    update({
      ...state,
      quizResults: {
        ...state.quizResults,
        [quizId]: {
          correct,
          total,
          score: Math.round((correct / total) * 100),
          date: todayLabel(),
        },
      },
    });
  }

  function submitAssignment(assignmentId: string, fileName: string, note: string) {
    update({
      ...state,
      assignments: {
        ...state.assignments,
        [assignmentId]: {
          status: "submitted",
          fileName,
          note,
          submittedDate: todayLabel(),
        },
      },
    });
  }

  function unsubmitAssignment(assignmentId: string) {
    const nextAssignments = { ...state.assignments };
    delete nextAssignments[assignmentId];
    update({ ...state, assignments: nextAssignments });
  }

  return (
    <LearningContext.Provider
      value={{ ...state, saveQuizResult, submitAssignment, unsubmitAssignment }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const ctx = useContext(LearningContext);
  if (!ctx) {
    throw new Error("useLearning must be used within a LearningProvider");
  }
  return ctx;
}

export { COURSES, QUIZZES_SEED, ASSIGNMENTS_SEED };
