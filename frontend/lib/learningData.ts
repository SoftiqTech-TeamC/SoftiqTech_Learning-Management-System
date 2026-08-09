// ---------------------------------------------------------------------------
// Learning area data — aligned to the 8 real courses from the Courses module.
//
// This holds the static definitions (courses, quiz questions, assignment
// briefs). Live state (your quiz scores, your submissions) lives in
// learningStore.tsx. When the backend is ready, the seed arrays below can be
// replaced by API responses without changing the pages.
// ---------------------------------------------------------------------------

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

export type QuizSeed = {
  id: string;
  title: string;
  courseSlug: string;
  courseTitle: string;
  durationMinutes: number;
  questions: QuizQuestion[];
};

export type AssignmentSeed = {
  id: string;
  title: string;
  courseSlug: string;
  courseTitle: string;
  description: string;
  dueDate: string;
};

// Live state stored per user (in localStorage via the store)
export type QuizResult = {
  correct: number;
  total: number;
  score: number;
  date: string;
};

export type AssignmentState = {
  status: "submitted";
  fileName: string;
  note: string;
  submittedDate: string;
};

export const COURSES = [
  { slug: "data-science", title: "Data Science" },
  { slug: "ai-ml", title: "AI & ML Fundamentals" },
  { slug: "business-strategy", title: "Business Strategy Essentials" },
  { slug: "ux-ui", title: "UX/UI Design Masterclass" },
  { slug: "cybersecurity", title: "Cybersecurity Essentials" },
  { slug: "digital-photography", title: "Digital Photography Pro" },
  { slug: "astrophysics", title: "Introduction to Astrophysics" },
  { slug: "sustainability", title: "Sustainability in Business" },
] as const;

export const QUIZZES_SEED: QuizSeed[] = [
  {
    id: "ds-quiz",
    title: "Data Science Basics",
    courseSlug: "data-science",
    courseTitle: "Data Science",
    durationMinutes: 12,
    questions: [
      { id: 1, question: "Which step usually comes first in the data science process?", options: ["Modeling", "Data collection", "Deployment", "Visualization"], correctIndex: 1 },
      { id: 2, question: "The middle value of a sorted dataset is the:", options: ["Mean", "Median", "Mode", "Range"], correctIndex: 1 },
      { id: 3, question: "Which library is commonly used for data analysis in Python?", options: ["React", "Pandas", "Express", "Django"], correctIndex: 1 },
    ],
  },
  {
    id: "aiml-quiz",
    title: "AI & ML Fundamentals",
    courseSlug: "ai-ml",
    courseTitle: "AI & ML Fundamentals",
    durationMinutes: 15,
    questions: [
      { id: 1, question: "Supervised learning uses data that is:", options: ["Unlabeled", "Labeled", "Encrypted", "Compressed"], correctIndex: 1 },
      { id: 2, question: "Which of these is a machine learning algorithm?", options: ["Bubble Sort", "Linear Regression", "Binary Search", "Quicksort"], correctIndex: 1 },
      { id: 3, question: "Overfitting means a model performs well on:", options: ["New data only", "Training data but poorly on new data", "No data", "All data equally"], correctIndex: 1 },
    ],
  },
  {
    id: "biz-quiz",
    title: "Business Strategy Basics",
    courseSlug: "business-strategy",
    courseTitle: "Business Strategy Essentials",
    durationMinutes: 10,
    questions: [
      { id: 1, question: "A SWOT analysis stands for Strengths, Weaknesses, Opportunities and:", options: ["Threats", "Tactics", "Trends", "Targets"], correctIndex: 0 },
      { id: 2, question: "A company's unique advantage over competitors is called its:", options: ["Mission statement", "Competitive advantage", "Balance sheet", "Supply chain"], correctIndex: 1 },
      { id: 3, question: "Which is an example of a long-term business goal?", options: ["Sending an email", "Expanding into new markets", "Printing a report", "Holding a meeting"], correctIndex: 1 },
    ],
  },
  {
    id: "uxui-quiz",
    title: "UX/UI Design Basics",
    courseSlug: "ux-ui",
    courseTitle: "UX/UI Design Masterclass",
    durationMinutes: 10,
    questions: [
      { id: 1, question: "UX stands for:", options: ["User Experience", "Unified Extension", "User Example", "UltraXimum"], correctIndex: 0 },
      { id: 2, question: "A simple, low-detail layout sketch is called a:", options: ["Prototype", "Wireframe", "Render", "Mockup"], correctIndex: 1 },
      { id: 3, question: "Good contrast in design mainly improves:", options: ["File size", "Readability", "Loading speed", "Code quality"], correctIndex: 1 },
    ],
  },
  {
    id: "cyber-quiz",
    title: "Cybersecurity Essentials",
    courseSlug: "cybersecurity",
    courseTitle: "Cybersecurity Essentials",
    durationMinutes: 12,
    questions: [
      { id: 1, question: "A strong password should include:", options: ["Only lowercase letters", "A mix of letters, numbers and symbols", "Your name", "The word 'password'"], correctIndex: 1 },
      { id: 2, question: "A fake email trying to steal your details is called:", options: ["Phishing", "Caching", "Hosting", "Pinging"], correctIndex: 0 },
      { id: 3, question: "Two-factor authentication adds security by requiring:", options: ["Two passwords", "A second verification step", "Two devices to be online", "A longer username"], correctIndex: 1 },
    ],
  },
  {
    id: "photo-quiz",
    title: "Photography Fundamentals",
    courseSlug: "digital-photography",
    courseTitle: "Digital Photography Pro",
    durationMinutes: 8,
    questions: [
      { id: 1, question: "Which setting controls how much light enters the camera?", options: ["Aperture", "Filename", "Zoom ratio", "Battery"], correctIndex: 0 },
      { id: 2, question: "A faster shutter speed is best for capturing:", options: ["Blurry motion", "Fast-moving subjects", "Dark scenes", "Nothing"], correctIndex: 1 },
      { id: 3, question: "The 'rule of thirds' helps with:", options: ["Battery life", "Composition", "File format", "Zoom"], correctIndex: 1 },
    ],
  },
  {
    id: "astro-quiz",
    title: "Astrophysics Intro",
    courseSlug: "astrophysics",
    courseTitle: "Introduction to Astrophysics",
    durationMinutes: 10,
    questions: [
      { id: 1, question: "The force that keeps planets in orbit is:", options: ["Magnetism", "Gravity", "Friction", "Tension"], correctIndex: 1 },
      { id: 2, question: "A light-year is a unit of:", options: ["Time", "Distance", "Brightness", "Temperature"], correctIndex: 1 },
      { id: 3, question: "Our solar system's central star is the:", options: ["Moon", "Sun", "Mars", "Venus"], correctIndex: 1 },
    ],
  },
  {
    id: "sustain-quiz",
    title: "Sustainability Basics",
    courseSlug: "sustainability",
    courseTitle: "Sustainability in Business",
    durationMinutes: 8,
    questions: [
      { id: 1, question: "Sustainability mainly focuses on meeting today's needs without harming:", options: ["Future generations", "Today's profits", "Current staff", "Old products"], correctIndex: 0 },
      { id: 2, question: "Which is a renewable energy source?", options: ["Coal", "Solar", "Oil", "Natural gas"], correctIndex: 1 },
      { id: 3, question: "'Reduce, reuse, recycle' is a principle of:", options: ["Marketing", "Waste management", "Accounting", "Coding"], correctIndex: 1 },
    ],
  },
];

export const ASSIGNMENTS_SEED: AssignmentSeed[] = [
  { id: "ds-assign", title: "Data Cleaning Project", courseSlug: "data-science", courseTitle: "Data Science", description: "Clean and prepare the provided dataset, then summarise the steps taken in a short report.", dueDate: "Aug 14, 2026" },
  { id: "aiml-assign", title: "Train a Simple Model", courseSlug: "ai-ml", courseTitle: "AI & ML Fundamentals", description: "Train a basic classification model on the sample dataset and report its accuracy.", dueDate: "Aug 16, 2026" },
  { id: "uxui-assign", title: "Design a Landing Page", courseSlug: "ux-ui", courseTitle: "UX/UI Design Masterclass", description: "Create a wireframe and high-fidelity design for a product landing page.", dueDate: "Aug 18, 2026" },
  { id: "biz-assign", title: "Business Case Study", courseSlug: "business-strategy", courseTitle: "Business Strategy Essentials", description: "Analyse the given company scenario and present three strategic recommendations.", dueDate: "Aug 20, 2026" },
  { id: "cyber-assign", title: "Security Audit Checklist", courseSlug: "cybersecurity", courseTitle: "Cybersecurity Essentials", description: "Prepare a basic security checklist for a small web application.", dueDate: "Aug 22, 2026" },
];

// Helpers
export function getQuizSeed(id: string): QuizSeed | undefined {
  return QUIZZES_SEED.find((q) => q.id === id);
}
