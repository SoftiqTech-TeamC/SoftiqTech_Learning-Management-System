"use client";

import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";

import {
  Bell,
  Search,
  ChevronDown,
  LayoutGrid,
  List,
} from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[220px] flex-1">
        {/* Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-7 py-3">
          <div>
            <h1 className="text-[43px] font-bold">
              My Courses
            </h1>

            <div className="mt-2 h-[4px] w-12 rounded bg-[#08a7aa]" />
          </div>

          <div className="flex items-center gap-6">
           <Bell className="text-gray-600" />
           <ChevronDown className="text-gray-600" />
          </div>
        </div>

        {/* Search */}
        <div className="mt-8 flex items-center gap-5 px-10">
          <div className="relative w-[390px]">
            <Search
              size={18}
              className="absolute left-4 top-3 text-gray-400"
            />

            <input
              placeholder="Search courses..."
              className="h-12 w-full rounded-xl border border-gray-200 pl-11 outline-none transition focus:border-[#08a7aa] focus:ring-2 focus:ring-[#08a7aa]/20"
            />
          </div>

          <select className="h-12 w-[180px] rounded-xl border border-gray-200 px-4 outline-none focus:border-[#08a7aa]">
            <option>All Categories</option>
          </select>

          <select className="h-12 w-[170px] rounded-xl border border-gray-200 px-4 outline-none focus:border-[#08a7aa]">
            <option>Sort by: Recent</option>
          </select>

          <div className="ml-auto flex overflow-hidden rounded-xl border border-gray-200">
            <button className="bg-[#08a7aa] p-3 text-white">
              <LayoutGrid size={18} />
            </button>

            <button className="bg-white p-3">
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Courses */}
        <div className="mt-8 px-10">
          <div className="grid grid-cols-4 gap-6">

            {/* Course 1 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative h-[150px]">
                <Image
                  src="/courses/ai.jpg"
                  alt="AI Course"
                  fill
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded bg-[#08a7aa] px-2 py-1 text-[11px] text-white">
                  Featured
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold leading-6">
                  AI & ML Fundamentals
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Dr. Ali
                </p>

                <p className="mt-3 text-xs text-[#08a7aa]">
                  65% Complete
                </p>

                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[65%] rounded-full bg-[#08a7aa]" />
                </div>

                <button className="mt-5 w-full rounded-xl bg-[#08a7aa] py-2.5 font-medium text-white transition hover:bg-[#068d90]">
                  Continue
                </button>
              </div>
            </div>

            {/* Course 2 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative h-[150px]">
                <Image
                  src="/courses/business.jpg"
                  alt="Business Strategy"
                  fill
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded bg-cyan-500 px-2 py-1 text-[11px] text-white">
                  New
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  Business Strategy Essentials
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Taha
                </p>

                <p className="mt-3 text-xs text-[#08a7aa]">
                  20% Complete
                </p>

                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[20%] rounded-full bg-[#08a7aa]" />
                </div>

                <button className="mt-5 w-full rounded-xl bg-[#08a7aa] py-2.5 font-medium text-white transition hover:bg-[#068d90]">
                  Continue
                </button>
              </div>
            </div>

            {/* Course 3 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative h-[150px]">
                <Image
                  src="/courses/ux-ui.jpg"
                  alt="UX UI"
                  fill
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded bg-[#08a7aa] px-2 py-1 text-[11px] text-white">
                  Featured
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  UX/UI Design Masterclass
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Danial
                </p>

                <p className="mt-3 text-xs text-[#08a7aa]">
                  40% Complete
                </p>

                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[40%] rounded-full bg-[#08a7aa]" />
                </div>

                <button className="mt-5 w-full rounded-xl bg-[#08a7aa] py-2.5 font-medium text-white transition hover:bg-[#068d90]">
                  Enroll
                </button>
              </div>
            </div>

            {/* Course 4 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative h-[150px]">
                <Image
                  src="/courses/cybersecurity.jpg"
                  alt="Cybersecurity"
                  fill
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded bg-cyan-500 px-2 py-1 text-[11px] text-white">
                  New
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  Cybersecurity Essentials
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Sara Javaid
                </p>

                <p className="mt-3 text-xs text-[#08a7aa]">
                  10% Complete
                </p>

                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[10%] rounded-full bg-[#08a7aa]" />
                </div>

                <button className="mt-5 w-full rounded-xl bg-[#08a7aa] py-2.5 font-medium text-white transition hover:bg-[#068d90]">
                  Enroll
                </button>
              </div>
            </div>

                        {/* Course 5 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative h-[150px]">
                <Image
                  src="/courses/python.jpg"
                  alt="Data Science with Python"
                  fill
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded bg-[#08a7aa] px-2 py-1 text-[11px] text-white">
                  Featured
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold leading-6">
                  Data Science with Python
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Dr. Saba
                </p>

                <p className="mt-3 text-xs text-[#08a7aa]">
                  75% Complete
                </p>

                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[75%] rounded-full bg-[#08a7aa]" />
                </div>

                <button className="mt-5 w-full rounded-xl bg-[#08a7aa] py-2.5 font-medium text-white transition hover:bg-[#068d90]">
                  Continue
                </button>
              </div>
            </div>

            {/* Course 6 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative h-[150px]">
                <Image
                  src="/courses/photography.jpg"
                  alt="Photography"
                  fill
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded bg-cyan-500 px-2 py-1 text-[11px] text-white">
                  New
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  Digital Photography Pro
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Eman Ahad
                </p>

                <p className="mt-3 text-xs text-[#08a7aa]">
                  30% Complete
                </p>

                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[30%] rounded-full bg-[#08a7aa]" />
                </div>

                <button className="mt-5 w-full rounded-xl bg-[#08a7aa] py-2.5 font-medium text-white transition hover:bg-[#068d90]">
                  Enroll
                </button>
              </div>
            </div>

            {/* Course 7 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative h-[150px]">
                <Image
                  src="/courses/astrophysics.jpg"
                  alt="Astrophysics"
                  fill
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded bg-cyan-500 px-2 py-1 text-[11px] text-white">
                  New
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  Introduction to Astrophysics
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Dr. Nahal
                </p>

                <p className="mt-3 text-xs text-[#08a7aa]">
                  15% Complete
                </p>

                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[15%] rounded-full bg-[#08a7aa]" />
                </div>

                <button className="mt-5 w-full rounded-xl bg-[#08a7aa] py-2.5 font-medium text-white transition hover:bg-[#068d90]">
                  Enroll
                </button>
              </div>
            </div>

            {/* Course 8 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative h-[150px]">
                <Image
                  src="/courses/sustainability.jpg"
                  alt="Sustainability"
                  fill
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded bg-cyan-500 px-2 py-1 text-[11px] text-white">
                  New
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  Sustainability in Business
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Laiba Aslam
                </p>

                <p className="mt-3 text-xs text-[#08a7aa]">
                  25% Complete
                </p>

                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[25%] rounded-full bg-[#08a7aa]" />
                </div>

                <button className="mt-5 w-full rounded-xl bg-[#08a7aa] py-2.5 font-medium text-white transition hover:bg-[#068d90]">
                  Enroll
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}