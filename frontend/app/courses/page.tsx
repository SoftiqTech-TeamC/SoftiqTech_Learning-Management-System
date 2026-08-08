"use client";

import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";

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
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-6 py-2">
          <div>
            <h1 className="text-[43px] font-bold">
               Courses
            </h1>

            <div className="mt-2 h-[4px] w-12 rounded bg-[#08a7aa]" />
          </div>

          <div className="flex items-center gap-6">
           <Bell className="text-gray-600" />
           <ChevronDown className="text-gray-600" />
          </div>
        </div>

        {/* Search */}
        <div className="mt-3 flex items-center gap-2 px-5">
          <div className="relative w-[300px]">
            <Search
              size={18}
              className="absolute left-4 top-3 text-gray-400"
            />

            <input
              placeholder="Search courses..."
              className="h-8 w-full rounded-xl border border-gray-200 pl-11 outline-none transition focus:border-[#08a7aa] focus:ring-2 focus:ring-[#08a7aa]/20"
            />
          </div>

          <select className="h-8 w-[180px] rounded-xl border border-gray-200 px-4 outline-none focus:border-[#08a7aa]">
            <option>All Categories</option>
          </select>

          <select className="h-8 w-[170px] rounded-xl border border-gray-200 px-4 outline-none focus:border-[#08a7aa]">
            <option>Sort by: Recent</option>
          </select>

          
        </div>

        {/* Courses */}
        <div className="mt-8 px-10">
          <div className="grid grid-cols-4 gap-4">

            {/* Course 1 */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative h-[150px]">
                <Image
                  src="/courses/ai.jpg"
                  alt="AI Course"
                  fill
                  className="object-cover"
                />

 
              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold leading-6">
                  AI & ML Fundamentals
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Dr. Ali
                </p>

                <Link
                  href="/courses/ai-ml"
                  className="block w-full mt-5 bg-[#0C8B90] text-white rounded-md py-2 text-center font-medium"
                >
                  Enroll
                </Link>

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

              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  Business Strategy Essentials
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Taha
                </p>


                <Link
                  href="/courses/business-strategy"
                  className="block w-full mt-5 bg-[#0C8B90] text-white rounded-md py-2 text-center"
                >
                  Enroll
                </Link>
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

              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  UX/UI Design Masterclass
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Danial
                </p>

              

                <Link
                  href="/courses/ux-ui"
                  className="block w-full mt-5 bg-[#0C8B90] text-white rounded-md py-2 text-center"
                >
                 Enroll
                </Link>

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

              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  Cybersecurity Essentials
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Sara Javaid
                </p>

          

                <Link
                  href="/courses/cybersecurity"
                  className="block w-full mt-5 bg-[#0C8B90] text-white rounded-md py-2 text-center"
                >
                  Enroll
                </Link>
                  
                
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

              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold leading-6">
                  Data Science with Python
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Dr. Saba
                </p>



                <Link
                  href="/courses/data-science"
                  className="block w-full mt-5 bg-[#0B8B90] text-white rounded-md py-2 text-center"
                >
                  Enroll
                </Link>

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

              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  Digital Photography Pro
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Eman Ahad
                </p>



                <Link
                  href="/courses/digital-photography"
                  className="block w-full mt-5 bg-[#0B8B90] text-white rounded-md py-2 text-center"
                >
                  Enroll
                </Link>

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

              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  Introduction to Astrophysics
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Dr. Nahal
                </p>



                <Link
                  href="/courses/astrophysics"
                  className="block w-full mt-5 bg-[#0B8B90] text-white rounded-md py-2 text-center"
                >
                 Enroll
                </Link>

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

              </div>

              <div className="p-4">
                <h3 className="text-[18px] font-bold">
                  Sustainability in Business
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Laiba Aslam
                </p>


                <Link
                  href="/courses/sustainability"
                  className="block w-full mt-5 bg-[#0B8B90] text-white rounded-md py-2 text-center"
                >
                  Enroll
                </Link>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}