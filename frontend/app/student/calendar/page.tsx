"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  BookOpen,
  Video,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Algorithms Lecture",
    course: "Computer Science 320",
    date: "2026-08-12",
    time: "10:00 AM",
    type: "lecture",
  },
  {
    id: 2,
    title: "Data Structures Quiz",
    course: "Computer Science 320",
    date: "2026-08-14",
    time: "11:30 AM",
    type: "quiz",
  },
  {
    id: 3,
    title: "Biology Assignment Due",
    course: "Biology 201",
    date: "2026-08-18",
    time: "11:59 PM",
    type: "assignment",
  },
  {
    id: 4,
    title: "Psychology Live Session",
    course: "Psychology 150",
    date: "2026-08-20",
    time: "02:00 PM",
    type: "lecture",
  },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function StudentCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getEventsForDay = (day: number) => {
    const date = `${year}-${String(
      month + 1
    ).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

    return events.filter(
      (event) => event.date === date
    );
  };

  const today = new Date();

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Sidebar active="Calendar" />

      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <p className="text-sm font-medium text-[#087f87]">
            Student Planner
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Calendar
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Keep track of your classes, quizzes, and assignments.
          </p>
        </header>

        <div className="grid gap-6 p-8 xl:grid-cols-[1fr_320px]">
          {/* CALENDAR */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={previousMonth}
                className="flex h-10 w-10 items-center justify-center rounded-lg border text-slate-600 transition hover:bg-slate-50"
              >
                <ChevronLeft size={20} />
              </button>

              <h2 className="text-xl font-bold text-slate-900">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              <button
                onClick={nextMonth}
                className="flex h-10 w-10 items-center justify-center rounded-lg border text-slate-600 transition hover:bg-slate-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 border-l border-t">
              {days.map((day) => (
                <div
                  key={day}
                  className="border-b border-r bg-slate-50 px-3 py-3 text-center text-xs font-bold uppercase text-slate-500"
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((day, index) => {
                const dayEvents = day
                  ? getEventsForDay(day)
                  : [];

                return (
                  <div
                    key={index}
                    className="min-h-[125px] border-b border-r p-2"
                  >
                    {day && (
                      <>
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                            isToday(day)
                              ? "bg-[#087f87] text-white"
                              : "text-slate-600"
                          }`}
                        >
                          {day}
                        </div>

                        <div className="mt-2 space-y-1">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className="truncate rounded-md bg-[#eaf7f7] px-2 py-1 text-[10px] font-medium text-[#087f87]"
                            >
                              {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* UPCOMING EVENTS */}
          <aside className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <CalendarDays
                size={20}
                className="text-[#087f87]"
              />

              <h2 className="font-bold text-slate-900">
                Upcoming Events
              </h2>
            </div>

            <div className="mt-6 space-y-5">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border-b pb-5 last:border-0"
                >
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#087f87]">
                      {event.type === "lecture" ? (
                        <Video size={18} />
                      ) : (
                        <BookOpen size={18} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {event.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {event.course}
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                        <Clock3 size={12} />
                        {event.date} • {event.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}