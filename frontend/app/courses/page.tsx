"use client";

import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";

import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-[220px] bg-[#172636]">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="ml-[260px] flex-1 min-w-0">
        
        {/* Header */}
        <div className="sticky top-0 z-20 flex h-[80px] items-center justify-between border-b border-gray-200 bg-white px-6">
          <div>
            <h1 className="text-[36px] font-bold text-[#172636]">
              Courses
            </h1>

            <div className="mt-1 h-[4px] w-12 rounded bg-[#08a7aa]" />
          </div>

          <div className="flex items-center gap-6">
            <Bell className="text-gray-600" size={21} />
            <ChevronDown className="text-gray-600" size={20} />
          </div>
        </div>

        {/* Search / Filters */}
        <div className="mt-4 flex items-center gap-3 px-6">
          
          <div className="relative w-[300px]">
            <Search
              size={18}
              className="absolute left-4 top-2.5 text-gray-400"
            />

            <input
              placeholder="Search courses..."
              className="h-9 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#08a7aa] focus:ring-2 focus:ring-[#08a7aa]/20"
            />
          </div>

          <select className="h-9 w-[180px] rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#08a7aa]">
            <option>All Categories</option>
          </select>

          <select className="h-9 w-[170px] rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#08a7aa]">
            <option>Sort by: Recent</option>
          </select>
        </div>

        {/* Courses */}
        <main className="px-6 pb-10 pt-8">
          
          <div className="grid grid-cols-4 gap-5">

            {/* Course 1 */}
            <CourseCard
              disciplineId="6a84653a24dfb7e6ed79a6b8"
              image="/courses/ai.jpg"
              alt="AI Course"
              title="AI & ML Fundamentals"
              teacher="Dr. Ali"
              href="/courses/ai-ml"
            />

            {/* Course 2 */}
            <CourseCard
              disciplineId="6a84653a24dfb7e6ed79a6b9"
              image="/courses/business.jpg"
              alt="Business Strategy"
              title="Business Strategy Essentials"
              teacher="Taha"
              href="/courses/business-strategy"
            />

            {/* Course 3 */}
            <CourseCard
              disciplineId="6a84653a24dfb7e6ed79a6ba"
              image="/courses/ux-ui.jpg"
              alt="UX UI"
              title="UX/UI Design Masterclass"
              teacher="Danial"
              href="/courses/ux-ui"
            />

            {/* Course 4 */}
            <CourseCard
              disciplineId="6a84653a24dfb7e6ed79a6bb"
              image="/courses/cybersecurity.jpg"
              alt="Cybersecurity"
              title="Cybersecurity Essentials"
              teacher="Sara Javaid"
              href="/courses/cybersecurity"
            />

            {/* Course 5 */}
            <CourseCard
              disciplineId="6a84653a24dfb7e6ed79a6b7"
              image="/courses/python.jpg"
              alt="Data Science with Python"
              title="Data Science with Python"
              teacher="Dr. Saba"
              href="/courses/data-science"
            />

            {/* Course 6 */}
            <CourseCard
              disciplineId="6a84653a24dfb7e6ed79a6bc"
              image="/courses/photography.jpg"
              alt="Photography"
              title="Digital Photography Pro"
              teacher="Eman Ahad"
              href="/courses/digital-photography"
            />

            {/* Course 7 */}
            <CourseCard
              disciplineId="6a84653a24dfb7e6ed79a6bd"
              image="/courses/astrophysics.jpg"
              alt="Astrophysics"
              title="Introduction to Astrophysics"
              teacher="Dr. Nahal"
              href="/courses/astrophysics"
            />

            {/* Course 8 */}
            <CourseCard
              disciplineId="6a84653a24dfb7e6ed79a6be"
              image="/courses/sustainability.jpg"
              alt="Sustainability"
              title="Sustainability in Business"
              teacher="Laiba Aslam"
              href="/courses/sustainability"
            />

          </div>
        </main>
      </div>
    </div>
  );
}


/* =========================
   Course Card
========================= */

function CourseCard({
  disciplineId,
  image,
  alt,
  title,
  teacher,
  href,
}: {
  disciplineId: string;
  image: string;
  alt: string;
  title: string;
  teacher: string;
  href: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-[150px]">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">

        <h3 className="text-[17px] font-bold leading-6 text-[#172636]">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {teacher}
        </p>

        <Link
          href={href}
          className="mt-5 block w-full rounded-md bg-[#0C8B90] py-2 text-center font-medium text-white transition hover:bg-[#08787c]"
        >
          Enroll
        </Link>

      </div>
    </div>
  );
}