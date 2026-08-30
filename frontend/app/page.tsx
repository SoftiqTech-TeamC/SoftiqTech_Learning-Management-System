
"use client";

import Link from "next/link";

const roles = [
  {
    title: "Faculty",
    role: "faculty",
    description: "Teach, inspire and shape the future.",
    icon: (
      <svg
        width="58"
        height="58"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 18L32 8L56 18L32 28L8 18Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M16 23V38C16 38 22 47 32 47C42 47 48 38 48 38V23"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M56 18V34"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M52 42C52 42 56 38 56 34"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    ),
  },
  {
    title: "Student",
    role: "student",
    description: "Learn, explore and achieve your goals.",
    icon: (
      <svg
        width="58"
        height="58"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="32"
          cy="19"
          r="9"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M18 54C18 44 24 36 32 36C40 36 46 44 46 54"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10 29L32 21L54 29L32 37L10 29Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M54 29V43"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Admin",
    role: "admin",
    description: "Manage, monitor and empower learning.",
    icon: (
      <svg
        width="58"
        height="58"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 7L51 14V29C51 41 43 51 32 57C21 51 13 41 13 29V14L32 7Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle
          cx="32"
          cy="25"
          r="6"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M22 42C22 36 26 32 32 32C38 32 42 36 42 42"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx="49"
          cy="47"
          r="8"
          fill="white"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M49 43V51M45 47H53"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[42%_58%]">
      {/* LEFT SIDE */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#1D2A39] px-10 py-16 text-white sm:px-16 lg:px-12 xl:px-20">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-24 -top-28 h-[430px] w-[430px] rounded-full border border-[#4E6874]/30" />
        <div className="pointer-events-none absolute -left-20 -top-24 h-[380px] w-[380px] rounded-full border border-[#4E6874]/20" />
        <div className="pointer-events-none absolute right-[-150px] top-[-100px] h-[450px] w-[450px] rounded-full border border-[#4E6874]/20" />

        {/* Decorative dots */}
        <div className="absolute left-10 top-16 grid grid-cols-3 gap-2 opacity-40">
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-[#3D8F96]"
            />
          ))}
        </div>

        {/* Decorative star */}
        <div className="absolute left-12 top-[32%] text-3xl text-[#078B91]">
          ✦
        </div>

        {/* Main Text */}
        <div className="relative z-10 max-w-[500px]">
          <h1 className="font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl xl:text-[68px]">
            Welcome
            <br />
            to your
            <br />
            <span className="italic">Learning Hub</span>
          </h1>

          {/* Teal underline */}
          <div className="mt-3 ml-32 h-3 w-24 rotate-[-8deg] rounded-full border-b-4 border-[#078B91]" />

          <p className="mt-16 text-[10px] font-medium uppercase tracking-[0.35em] text-[#48AAB0]">
            Learn&nbsp;&nbsp;•&nbsp;&nbsp;Grow&nbsp;&nbsp;•&nbsp;&nbsp;Succeed
          </p>
        </div>

        {/* Bottom decorative lines */}
        <div className="absolute bottom-[-120px] left-[-50px] h-[280px] w-[280px] rounded-full border border-[#4E6874]/20" />
        <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full border border-[#4E6874]/20" />
      </section>

      {/* RIGHT SIDE */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-16 sm:px-12 lg:px-8 xl:px-16">
        <div className="w-full max-w-[650px] space-y-9">
          {roles.map((role, index) => (
            <Link
              key={role.title}
              href={`/login?role=${role.role}`}
              className={`group relative block transition duration-300 hover:-translate-y-1 ${
                index === 0
                  ? "ml-0"
                  : index === 1
                    ? "ml-10"
                    : "ml-0"
              }`}
            >
              {/* Back layer */}
              <div className="absolute left-[-18px] top-[14px] h-full w-[calc(100%-15px)] rounded-2xl border border-[#078B91] bg-white" />

              {/* Main Card */}
              <div className="relative flex min-h-[135px] items-center rounded-2xl border border-[#E6E8EA] bg-white px-7 py-6 shadow-[0_12px_30px_rgba(25,45,60,0.10)]">
                {/* Icon */}
                <div className="flex w-[105px] shrink-0 items-center justify-center border-r border-[#E1E4E6] pr-6 text-[#087F87]">
                  {role.icon}
                </div>

                {/* Text */}
                <div className="flex-1 pl-7">
                  <h2 className="font-serif text-3xl font-bold text-[#111820]">
                    {role.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#68727B]">
                    {role.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="ml-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#087F87] text-xl text-white transition group-hover:bg-[#066B72]">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
