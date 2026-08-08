import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Clock3,
  BookOpen,
  FolderKanban,
  BarChart3,
  Globe2,
  Award,
  Infinity,
  CalendarDays,
  ChevronDown,
  Star,
  Users,
  PlayCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

type Course = {
  title: string;
  image: string;
  description: string;
  instructor: string;
  instructorRole: string;
  instructorImage: string;
  rating: string;
  ratings: string;
  students: string;
  price: string;
  oldPrice: string;
  discount: string;
  duration: string;
  lessons: string;
  projects: string;
  level: string;
  language: string;
  certificate: string;
  access: string;
  updated: string;
  learning: string[];
  modules: {
    title: string;
    lessons: string;
    duration: string;
  }[];
};

const courses: Record<string, Course> = {
  "data-science": {
    title: "Data Science",
    image: "/courses/data-science.jpg",
    description:
      "Master the core concepts and techniques of Data Science. Learn how to collect, clean, analyze, and visualize data to uncover insights, build predictive models, and drive data-informed decisions.",
    instructor: "Arjun Mehta",
    instructorRole: "Senior Data Scientist at InnovateX",
    instructorImage: "https://i.pravatar.cc/150?img=12",
    rating: "4.7",
    ratings: "2,540 ratings",
    students: "12,345 students",
    price: "Rs. 5,999",
    oldPrice: "Rs. 11,999",
    discount: "50% OFF",
    duration: "9h 20m",
    lessons: "40",
    projects: "6",
    level: "Beginner to Advanced",
    language: "English",
    certificate: "Yes",
    access: "Lifetime Access",
    updated: "August 2026",
    learning: [
      "Understand data analysis fundamentals",
      "Statistical methods and probability",
      "Data visualization and storytelling",
      "Machine learning concepts and algorithms",
      "Big data and database fundamentals",
      "Business intelligence and analytics",
    ],
    modules: [
      {
        title: "Module 1: Introduction to Data Science",
        lessons: "6 Lessons",
        duration: "1h 15m",
      },
      {
        title: "Module 2: Statistical Analysis",
        lessons: "8 Lessons",
        duration: "1h 45m",
      },
      {
        title: "Module 3: Data Visualization",
        lessons: "7 Lessons",
        duration: "1h 20m",
      },
      {
        title: "Module 4: Machine Learning Basics",
        lessons: "6 Lessons",
        duration: "1h 10m",
      },
      {
        title: "Module 5: Business Analytics",
        lessons: "10 Lessons",
        duration: "2h 30m",
      },
      {
        title: "Module 6: Capstone Project",
        lessons: "3 Lessons",
        duration: "1h 00m",
      },
    ],
  },

  "ai-ml": {
    title: "AI & ML Fundamentals",
    image: "/courses/ai.jpg",
    description:
      "Build a strong foundation in Artificial Intelligence and Machine Learning. Learn how intelligent systems work, explore machine learning algorithms, and create practical AI solutions.",
    instructor: "Dr. Ali Khan",
    instructorRole: "AI Researcher & Machine Learning Engineer",
    instructorImage: "https://i.pravatar.cc/150?img=11",
    rating: "4.8",
    ratings: "1,890 ratings",
    students: "9,842 students",
    price: "Rs. 6,499",
    oldPrice: "Rs. 12,999",
    discount: "50% OFF",
    duration: "10h 15m",
    lessons: "45",
    projects: "7",
    level: "Beginner to Advanced",
    language: "English",
    certificate: "Yes",
    access: "Lifetime Access",
    updated: "August 2026",
    learning: [
      "Understand Artificial Intelligence fundamentals",
      "Learn supervised and unsupervised learning",
      "Work with popular machine learning algorithms",
      "Understand neural networks and deep learning",
      "Build practical machine learning models",
      "Evaluate and improve model performance",
    ],
    modules: [
      {
        title: "Module 1: Introduction to AI",
        lessons: "7 Lessons",
        duration: "1h 20m",
      },
      {
        title: "Module 2: Machine Learning Fundamentals",
        lessons: "8 Lessons",
        duration: "1h 45m",
      },
      {
        title: "Module 3: Supervised Learning",
        lessons: "8 Lessons",
        duration: "1h 40m",
      },
      {
        title: "Module 4: Unsupervised Learning",
        lessons: "6 Lessons",
        duration: "1h 15m",
      },
      {
        title: "Module 5: Neural Networks",
        lessons: "9 Lessons",
        duration: "2h 10m",
      },
      {
        title: "Module 6: AI Project",
        lessons: "7 Lessons",
        duration: "2h 05m",
      },
    ],
  },

  "business-strategy": {
    title: "Business Strategy Essentials",
    image: "/courses/business.jpg",
    description:
      "Learn how successful businesses create strategies, understand markets, manage resources, and make smart decisions. Develop practical skills for modern business environments.",
    instructor: "Taha Ahmed",
    instructorRole: "Business Strategy Consultant",
    instructorImage: "https://i.pravatar.cc/150?img=13",
    rating: "4.6",
    ratings: "1,420 ratings",
    students: "7,650 students",
    price: "Rs. 4,999",
    oldPrice: "Rs. 9,999",
    discount: "50% OFF",
    duration: "8h 40m",
    lessons: "36",
    projects: "5",
    level: "Beginner to Intermediate",
    language: "English",
    certificate: "Yes",
    access: "Lifetime Access",
    updated: "August 2026",
    learning: [
      "Understand strategic business planning",
      "Analyze markets and competitors",
      "Develop strong business strategies",
      "Understand customer needs and behavior",
      "Learn financial and operational planning",
      "Create a practical business strategy",
    ],
    modules: [
      {
        title: "Module 1: Business Strategy Basics",
        lessons: "6 Lessons",
        duration: "1h 10m",
      },
      {
        title: "Module 2: Market Analysis",
        lessons: "7 Lessons",
        duration: "1h 25m",
      },
      {
        title: "Module 3: Competitive Strategy",
        lessons: "6 Lessons",
        duration: "1h 20m",
      },
      {
        title: "Module 4: Business Planning",
        lessons: "7 Lessons",
        duration: "1h 40m",
      },
      {
        title: "Module 5: Growth Strategy",
        lessons: "6 Lessons",
        duration: "1h 30m",
      },
      {
        title: "Module 6: Final Business Project",
        lessons: "4 Lessons",
        duration: "1h 35m",
      },
    ],
  },

  "ux-ui": {
    title: "UX/UI Design Masterclass",
    image: "/courses/ux-ui.jpg",
    description:
      "Learn how to design modern, user-friendly digital experiences. Explore UX research, wireframing, prototyping, visual design, and usability testing.",
    instructor: "Danial Ahmed",
    instructorRole: "Senior UX/UI Designer",
    instructorImage: "https://i.pravatar.cc/150?img=14",
    rating: "4.8",
    ratings: "1,760 ratings",
    students: "8,420 students",
    price: "Rs. 5,499",
    oldPrice: "Rs. 10,999",
    discount: "50% OFF",
    duration: "11h 10m",
    lessons: "42",
    projects: "8",
    level: "Beginner to Advanced",
    language: "English",
    certificate: "Yes",
    access: "Lifetime Access",
    updated: "August 2026",
    learning: [
      "Understand UX design principles",
      "Conduct user research",
      "Create wireframes and user flows",
      "Design modern user interfaces",
      "Build interactive prototypes",
      "Perform usability testing",
    ],
    modules: [
      {
        title: "Module 1: UX Design Fundamentals",
        lessons: "6 Lessons",
        duration: "1h 20m",
      },
      {
        title: "Module 2: User Research",
        lessons: "7 Lessons",
        duration: "1h 35m",
      },
      {
        title: "Module 3: Wireframing",
        lessons: "6 Lessons",
        duration: "1h 25m",
      },
      {
        title: "Module 4: UI Design",
        lessons: "9 Lessons",
        duration: "2h 15m",
      },
      {
        title: "Module 5: Prototyping",
        lessons: "8 Lessons",
        duration: "2h 00m",
      },
      {
        title: "Module 6: Final Design Project",
        lessons: "6 Lessons",
        duration: "2h 35m",
      },
    ],
  },

  cybersecurity: {
    title: "Cybersecurity Essentials",
    image: "/courses/cybersecurity.jpg",
    description:
      "Learn the fundamentals of cybersecurity, network protection, threats, vulnerabilities, and security best practices to protect digital systems and information.",
    instructor: "Sara Javaid",
    instructorRole: "Cybersecurity Specialist",
    instructorImage: "https://i.pravatar.cc/150?img=32",
    rating: "4.7",
    ratings: "2,110 ratings",
    students: "10,230 students",
    price: "Rs. 6,999",
    oldPrice: "Rs. 13,999",
    discount: "50% OFF",
    duration: "12h 00m",
    lessons: "48",
    projects: "6",
    level: "Beginner to Advanced",
    language: "English",
    certificate: "Yes",
    access: "Lifetime Access",
    updated: "August 2026",
    learning: [
      "Understand cybersecurity fundamentals",
      "Identify common cyber threats",
      "Learn network security principles",
      "Understand authentication and encryption",
      "Perform basic security assessments",
      "Apply security best practices",
    ],
    modules: [
      {
        title: "Module 1: Cybersecurity Fundamentals",
        lessons: "7 Lessons",
        duration: "1h 30m",
      },
      {
        title: "Module 2: Network Security",
        lessons: "8 Lessons",
        duration: "1h 50m",
      },
      {
        title: "Module 3: Cyber Threats",
        lessons: "7 Lessons",
        duration: "1h 40m",
      },
      {
        title: "Module 4: Encryption & Authentication",
        lessons: "8 Lessons",
        duration: "2h 00m",
      },
      {
        title: "Module 5: Security Testing",
        lessons: "9 Lessons",
        duration: "2h 30m",
      },
      {
        title: "Module 6: Security Project",
        lessons: "9 Lessons",
        duration: "2h 30m",
      },
    ],
  },

  "digital-photography": {
    title: "Digital Photography Pro",
    image: "/courses/photography.jpg",
    description:
      "Learn professional digital photography from camera basics to composition, lighting, editing, and creative storytelling. Build confidence to capture high-quality photographs.",
    instructor: "Eman Ahad",
    instructorRole: "Professional Photographer",
    instructorImage: "https://i.pravatar.cc/150?img=47",
    rating: "4.7",
    ratings: "980 ratings",
    students: "5,420 students",
    price: "Rs. 3,999",
    oldPrice: "Rs. 7,999",
    discount: "50% OFF",
    duration: "7h 30m",
    lessons: "32",
    projects: "5",
    level: "Beginner to Intermediate",
    language: "English",
    certificate: "Yes",
    access: "Lifetime Access",
    updated: "August 2026",
    learning: [
      "Understand camera settings",
      "Master composition techniques",
      "Work with natural and artificial lighting",
      "Learn portrait photography",
      "Edit and enhance photographs",
      "Create a professional photography portfolio",
    ],
    modules: [
      {
        title: "Module 1: Camera Fundamentals",
        lessons: "6 Lessons",
        duration: "1h 00m",
      },
      {
        title: "Module 2: Composition",
        lessons: "5 Lessons",
        duration: "1h 10m",
      },
      {
        title: "Module 3: Lighting",
        lessons: "6 Lessons",
        duration: "1h 20m",
      },
      {
        title: "Module 4: Portrait Photography",
        lessons: "5 Lessons",
        duration: "1h 05m",
      },
      {
        title: "Module 5: Photo Editing",
        lessons: "6 Lessons",
        duration: "1h 25m",
      },
      {
        title: "Module 6: Final Photography Project",
        lessons: "4 Lessons",
        duration: "1h 30m",
      },
    ],
  },

  astrophysics: {
    title: "Introduction to Astrophysics",
    image: "/courses/astrophysics.jpg",
    description:
      "Explore the fascinating world of stars, planets, galaxies, black holes, and the universe. Build a strong foundation in astrophysics through simple explanations and practical examples.",
    instructor: "Dr. Nahal Ahmed",
    instructorRole: "Astrophysics Researcher",
    instructorImage: "https://i.pravatar.cc/150?img=49",
    rating: "4.6",
    ratings: "850 ratings",
    students: "4,380 students",
    price: "Rs. 4,499",
    oldPrice: "Rs. 8,999",
    discount: "50% OFF",
    duration: "8h 15m",
    lessons: "34",
    projects: "4",
    level: "Beginner to Intermediate",
    language: "English",
    certificate: "Yes",
    access: "Lifetime Access",
    updated: "August 2026",
    learning: [
      "Understand the structure of the universe",
      "Learn about stars and their life cycles",
      "Explore planets and solar systems",
      "Understand galaxies and black holes",
      "Learn basic astrophysics concepts",
      "Explore modern space discoveries",
    ],
    modules: [
      {
        title: "Module 1: Introduction to the Universe",
        lessons: "5 Lessons",
        duration: "1h 00m",
      },
      {
        title: "Module 2: Stars",
        lessons: "6 Lessons",
        duration: "1h 20m",
      },
      {
        title: "Module 3: Planets & Solar Systems",
        lessons: "6 Lessons",
        duration: "1h 15m",
      },
      {
        title: "Module 4: Galaxies",
        lessons: "5 Lessons",
        duration: "1h 10m",
      },
      {
        title: "Module 5: Black Holes",
        lessons: "6 Lessons",
        duration: "1h 30m",
      },
      {
        title: "Module 6: Space Research Project",
        lessons: "6 Lessons",
        duration: "2h 00m",
      },
    ],
  },

  sustainability: {
    title: "Sustainability in Business",
    image: "/courses/sustainability.jpg",
    description:
      "Learn how businesses can grow responsibly while reducing environmental impact. Explore sustainable business models, green practices, ethical decisions, and long-term growth strategies.",
    instructor: "Laiba Aslam",
    instructorRole: "Sustainability & Business Consultant",
    instructorImage: "https://i.pravatar.cc/150?img=45",
    rating: "4.6",
    ratings: "720 ratings",
    students: "3,950 students",
    price: "Rs. 4,299",
    oldPrice: "Rs. 8,599",
    discount: "50% OFF",
    duration: "7h 45m",
    lessons: "30",
    projects: "5",
    level: "Beginner to Intermediate",
    language: "English",
    certificate: "Yes",
    access: "Lifetime Access",
    updated: "August 2026",
    learning: [
      "Understand sustainable business models",
      "Learn about environmental responsibility",
      "Explore green business practices",
      "Understand ethical decision making",
      "Develop sustainable growth strategies",
      "Create a sustainability action plan",
    ],
    modules: [
      {
        title: "Module 1: Sustainability Fundamentals",
        lessons: "5 Lessons",
        duration: "1h 00m",
      },
      {
        title: "Module 2: Sustainable Business Models",
        lessons: "6 Lessons",
        duration: "1h 20m",
      },
      {
        title: "Module 3: Green Business Practices",
        lessons: "5 Lessons",
        duration: "1h 10m",
      },
      {
        title: "Module 4: Ethics & Responsibility",
        lessons: "5 Lessons",
        duration: "1h 15m",
      },
      {
        title: "Module 5: Sustainable Growth",
        lessons: "5 Lessons",
        duration: "1h 20m",
      },
      {
        title: "Module 6: Sustainability Project",
        lessons: "4 Lessons",
        duration: "1h 40m",
      },
    ],
  },
};

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = courses[slug];

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#102131]">
            Course not found
          </h1>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 mt-5 bg-[#0B8B90] text-white px-5 py-3 rounded-lg"
          >
            <ArrowLeft size={18} />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#102131]">
      {/* TOP NAV */}

      <header className="h-[70px] bg-white border-b flex items-center px-7">
        <Link href="/courses" className="flex items-center gap-3">
          {/* YOUR LOGO */}
          <img
            src="/logo.png"
            alt="Nexus Learning Logo"
            className="h-10 w-10 object-contain"
          />

          <div>
            <h1 className="font-bold text-[18px] leading-none">
              Nexus
            </h1>

            <p className="text-xs text-gray-500 mt-1">
              Learning
            </p>
          </div>
        </Link>

        <nav className="ml-12 flex items-center gap-8 text-sm">
          <Link
            href="/courses"
            className="font-medium hover:text-[#0B8B90]"
          >
            Courses
          </Link>

          <span className="text-gray-500">Categories</span>
          <span className="text-gray-500">Career Paths</span>
          <span className="text-gray-500">For Business</span>
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <span className="text-gray-500 text-sm">
            My Account
          </span>

          <div className="w-10 h-10 rounded-full bg-[#0B8B90] text-white flex items-center justify-center font-semibold">
            A
          </div>
        </div>
      </header>

      {/* CONTENT */}

      <main className="max-w-[1500px] mx-auto px-8 py-7">
        {/* Breadcrumb */}

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
          <Link
            href="/courses"
            className="hover:text-[#0B8B90]"
          >
            My Courses
          </Link>

          <span>›</span>

          <span>{course.title}</span>
        </div>

        {/* COURSE HERO */}

        <div className="grid grid-cols-[1fr_395px] gap-8">
          {/* LEFT */}

          <div>
            <div className="grid grid-cols-[500px_1fr] gap-7">
              {/* Course Image */}

              <div className="relative h-[285px] rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Course Info */}

              <div>
                <h1 className="text-[42px] leading-tight font-bold">
                  {course.title}
                </h1>

                <p className="text-gray-600 text-[16px] leading-7 mt-4">
                  {course.description}
                </p>

                {/* Instructor */}

                <div className="flex items-center gap-3 mt-5">
                  <img
                    src={course.instructorImage}
                    alt={course.instructor}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />

                  <div>
                    <p className="font-semibold text-[#0B8B90]">
                      {course.instructor}
                    </p>

                    <p className="text-sm text-gray-500">
                      {course.instructorRole}
                    </p>
                  </div>
                </div>

                {/* Rating */}

                <div className="flex items-center gap-2 mt-5">
                  <div className="flex gap-1 text-yellow-500">
                    <Star size={17} fill="currentColor" />
                    <Star size={17} fill="currentColor" />
                    <Star size={17} fill="currentColor" />
                    <Star size={17} fill="currentColor" />
                    <Star size={17} fill="currentColor" />
                  </div>

                  <span className="font-semibold">
                    {course.rating}
                  </span>

                  <span className="text-gray-500">
                    ({course.ratings})
                  </span>

                  <span className="text-gray-400">|</span>

                  <span className="font-medium">
                    {course.students}
                  </span>
                </div>
              </div>
            </div>

            {/* TABS */}

            <div className="mt-7 border-b bg-white rounded-t-lg">
              <div className="flex items-center gap-10 px-5">
                <button className="py-4 border-b-[3px] border-[#0B8B90] text-[#0B8B90] font-semibold">
                  Overview
                </button>

                <button className="py-4 text-gray-600">
                  Curriculum
                </button>

                <button className="py-4 text-gray-600">
                  Instructor
                </button>

                <button className="py-4 text-gray-600">
                  Reviews
                </button>

                <button className="py-4 text-gray-600">
                  FAQs
                </button>
              </div>
            </div>

            {/* COURSE OVERVIEW */}

            <section className="bg-white border rounded-xl mt-4 p-6">
              <h2 className="text-2xl font-bold">
                Course Overview
              </h2>

              <p className="text-gray-600 leading-7 mt-3">
                This comprehensive course is designed to give you
                practical knowledge and a strong understanding of{" "}
                {course.title}. You will learn important concepts,
                work through real-world examples, and build skills
                that can be applied in practical situations.
              </p>

              <h3 className="text-xl font-bold mt-7">
                What you'll learn
              </h3>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
                {course.learning.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[#0B8B90] mt-1 shrink-0"
                    />

                    <span className="text-gray-700 text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* CURRICULUM */}

            <section className="bg-white border rounded-xl mt-5 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Course Curriculum
                </h2>

                <button className="text-[#0B8B90] font-semibold text-sm">
                  Expand All
                </button>
              </div>

              <div className="mt-5 border rounded-lg overflow-hidden">
                {course.modules.map((module) => (
                  <div
                    key={module.title}
                    className="flex items-center gap-4 px-5 py-4 border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <PlayCircle
                      size={18}
                      className="text-[#102131]"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {module.title}
                      </p>
                    </div>

                    <span className="text-sm text-gray-500">
                      {module.lessons}
                    </span>

                    <span className="text-sm text-gray-500 w-20">
                      {module.duration}
                    </span>

                    <ChevronDown
                      size={18}
                      className="text-gray-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}

          <aside>
            {/* Price Card */}

            <div className="bg-white border rounded-xl p-6 sticky top-5">
              <div className="flex items-center gap-3">
                <span className="text-[31px] font-bold">
                  {course.price}
                </span>

                <span className="text-gray-400 line-through">
                  {course.oldPrice}
                </span>

                <span className="bg-[#0B8B90] text-white text-xs px-2 py-1 rounded">
                  {course.discount}
                </span>
              </div>

              <button className="w-full mt-5 bg-[#0B8B90] hover:bg-[#096F73] text-white rounded-lg py-3 font-semibold text-[16px]">
                Enroll Now
              </button>

              <button className="w-full mt-3 border border-[#0B8B90] text-[#0B8B90] rounded-lg py-3 font-semibold">
                ♡ Add to Wishlist
              </button>

              <div className="border-t mt-6 pt-5 space-y-4">
                <InfoRow
                  icon={<Clock3 size={18} />}
                  label="Total Duration"
                  value={course.duration}
                />

                <InfoRow
                  icon={<BookOpen size={18} />}
                  label="Lessons"
                  value={course.lessons}
                />

                <InfoRow
                  icon={<FolderKanban size={18} />}
                  label="Projects"
                  value={course.projects}
                />

                <InfoRow
                  icon={<BarChart3 size={18} />}
                  label="Level"
                  value={course.level}
                />

                <InfoRow
                  icon={<Globe2 size={18} />}
                  label="Language"
                  value={course.language}
                />

                <InfoRow
                  icon={<Award size={18} />}
                  label="Certificate"
                  value={course.certificate}
                />

                <InfoRow
                  icon={<Infinity size={18} />}
                  label="Access"
                  value={course.access}
                />

                <InfoRow
                  icon={<CalendarDays size={18} />}
                  label="Last Updated"
                  value={course.updated}
                />
              </div>
            </div>

            {/* Instructor Card */}

            <div className="bg-white border rounded-xl p-6 mt-5">
              <h2 className="text-xl font-bold">
                Instructor
              </h2>

              <div className="flex items-center gap-4 mt-5">
                <img
                  src={course.instructorImage}
                  alt={course.instructor}
                  width={75}
                  height={75}
                  className="rounded-full"
                />

                <div>
                  <p className="font-semibold text-[#0B8B90]">
                    {course.instructor}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {course.instructorRole}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-yellow-500"
                    />

                    <span className="font-semibold">
                      {course.rating}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Instructor Rating
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <Users
                      size={16}
                      className="text-[#0B8B90]"
                    />

                    <span className="font-semibold">
                      {course.students}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Students
                  </p>
                </div>
              </div>

              <button className="w-full mt-5 border border-[#0B8B90] text-[#0B8B90] rounded-lg py-2 font-semibold">
                View Instructor Profile
              </button>
            </div>

            {/* Guarantee */}

            <div className="bg-white border rounded-xl p-5 mt-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-cyan-50 flex items-center justify-center">
                  <Award
                    size={22}
                    className="text-[#0B8B90]"
                  />
                </div>

                <div>
                  <p className="font-semibold">
                    30-Day Money-Back Guarantee
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Full refund if you're not satisfied
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-[#0B8B90] shrink-0">
        {icon}
      </span>

      <span className="text-gray-600">
        {label}
      </span>

      <span className="ml-auto text-right font-medium text-gray-700">
        {value}
      </span>
    </div>
  );
}