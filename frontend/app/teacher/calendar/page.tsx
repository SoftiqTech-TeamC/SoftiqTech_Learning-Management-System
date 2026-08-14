"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Video,
  BookOpen,
  ClipboardList,
  X,
} from "lucide-react";

type EventType = "Class" | "Assignment" | "Meeting" | "Exam";

type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  endTime: string;
  type: EventType;
  course?: string;
  location?: string;
  attendees?: number;
  description?: string;
};

const EVENTS: CalendarEvent[] = [
  {
    id: 1,
    title: "Software Engineering",
    date: "2026-08-10",
    time: "09:00",
    endTime: "10:30",
    type: "Class",
    course: "CS 320",
    location: "Room 204",
    description: "Regular Software Engineering lecture.",
  },
  {
    id: 2,
    title: "Assignment 3 Deadline",
    date: "2026-08-12",
    time: "23:59",
    endTime: "23:59",
    type: "Assignment",
    course: "CS 320",
    description: "Final submission deadline for Assignment 3.",
  },
  {
    id: 3,
    title: "Faculty Meeting",
    date: "2026-08-14",
    time: "11:00",
    endTime: "12:00",
    type: "Meeting",
    location: "Conference Room",
    attendees: 12,
    description: "Weekly faculty coordination meeting.",
  },
  {
    id: 4,
    title: "Database Systems",
    date: "2026-08-17",
    time: "10:00",
    endTime: "11:30",
    type: "Class",
    course: "CS 301",
    location: "Lab 2",
    description: "Database normalization and indexing lecture.",
  },
  {
    id: 5,
    title: "Midterm Examination",
    date: "2026-08-20",
    time: "09:00",
    endTime: "11:00",
    type: "Exam",
    course: "CS 320",
    location: "Exam Hall A",
    description: "Midterm examination for Software Engineering.",
  },
  {
    id: 6,
    title: "Web Engineering",
    date: "2026-08-21",
    time: "13:00",
    endTime: "14:30",
    type: "Class",
    course: "CS 350",
    location: "Room 109",
    description: "Next.js and API integration lecture.",
  },
  {
    id: 7,
    title: "Student Advising",
    date: "2026-08-24",
    time: "14:00",
    endTime: "15:30",
    type: "Meeting",
    location: "Faculty Office",
    attendees: 8,
    description: "Individual student advising sessions.",
  },
  {
    id: 8,
    title: "Programming Fundamentals",
    date: "2026-08-26",
    time: "09:00",
    endTime: "10:30",
    type: "Class",
    course: "CS 101",
    location: "Room 110",
    description: "Functions, arrays and problem solving.",
  },
  {
    id: 9,
    title: "Project Proposal Deadline",
    date: "2026-08-28",
    time: "23:59",
    endTime: "23:59",
    type: "Assignment",
    course: "CS 350",
    description: "Final deadline for project proposal submission.",
  },
];

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const typeStyles: Record<EventType, string> = {
  Class: "bg-teal-50 text-teal-700 border-teal-200",
  Assignment: "bg-blue-50 text-blue-700 border-blue-200",
  Meeting: "bg-purple-50 text-purple-700 border-purple-200",
  Exam: "bg-red-50 text-red-700 border-red-200",
};

const typeDotStyles: Record<EventType, string> = {
  Class: "bg-teal-500",
  Assignment: "bg-blue-500",
  Meeting: "bg-purple-500",
  Exam: "bg-red-500",
};

function formatDate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  const days: {
    date: Date;
    currentMonth: boolean;
  }[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPreviousMonth - i),
      currentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      date: new Date(year, month, day),
      currentMonth: true,
    });
  }

  let nextDay = 1;

  while (days.length < 42) {
    days.push({
      date: new Date(year, month + 1, nextDay),
      currentMonth: false,
    });

    nextDay++;
  }

  return days;
}

export default function TeacherCalendarPage() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(formatDate(today));

  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEvent | null>(null);

  const [showAddEvent, setShowAddEvent] = useState(false);

  const [eventType, setEventType] =
    useState<"All" | EventType>("All");

  const calendarDays = useMemo(
    () =>
      getCalendarDays(
        currentDate.getFullYear(),
        currentDate.getMonth()
      ),
    [currentDate]
  );

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
  });

  const year = currentDate.getFullYear();

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  };

  const goToToday = () => {
    const todayDate = new Date();

    setCurrentDate(
      new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1
      )
    );

    setSelectedDate(formatDate(todayDate));
  };

  const getEventsForDate = (date: Date) => {
    const dateString = formatDate(date);

    return EVENTS.filter((event) => {
      const matchesDate = event.date === dateString;

      const matchesType =
        eventType === "All" || event.type === eventType;

      return matchesDate && matchesType;
    });
  };

  const selectedDayEvents = EVENTS.filter(
    (event) =>
      event.date === selectedDate &&
      (eventType === "All" || event.type === eventType)
  );

  const upcomingEvents = EVENTS.filter(
    (event) => event.date >= formatDate(today)
  )
    .filter(
      (event) =>
        eventType === "All" || event.type === eventType
    )
    .sort((a, b) =>
      `${a.date} ${a.time}`.localeCompare(
        `${b.date} ${b.time}`
      )
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900">
      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between px-8 py-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
                <CalendarDays
                  size={23}
                  className="text-teal-600"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Calendar
                </h1>

                <p className="mt-0.5 text-sm text-slate-500">
                  Manage your classes, meetings and deadlines.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAddEvent(true)}
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>
      </header>

      <main className="space-y-6 p-8">
        {/* TOP CONTROLS */}

        <section className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPreviousMonth}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-50"
              aria-label="Previous month"
            >
              <ChevronLeft size={19} />
            </button>

            <div className="min-w-[190px] text-center">
              <h2 className="text-xl font-bold">
                {monthName} {year}
              </h2>
            </div>

            <button
              onClick={goToNextMonth}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-50"
              aria-label="Next month"
            >
              <ChevronRight size={19} />
            </button>

            <button
              onClick={goToToday}
              className="ml-2 rounded-lg border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-100"
            >
              Today
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                "All",
                "Class",
                "Assignment",
                "Meeting",
                "Exam",
              ] as const
            ).map((type) => (
              <button
                key={type}
                onClick={() => setEventType(type)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  eventType === type
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* MAIN CALENDAR */}

        <section className="grid gap-6 xl:grid-cols-[1fr_330px]">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* WEEK DAYS */}

            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
              {WEEK_DAYS.map((day) => (
                <div
                  key={day}
                  className="border-r border-slate-200 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* DAYS */}

            <div className="grid grid-cols-7">
              {calendarDays.map(
                ({ date, currentMonth }, index) => {
                  const dateString = formatDate(date);

                  const dayEvents =
                    getEventsForDate(date);

                  const isToday =
                    dateString === formatDate(today);

                  const isSelected =
                    dateString === selectedDate;

                  return (
                    <button
                      key={`${dateString}-${index}`}
                      onClick={() =>
                        setSelectedDate(dateString)
                      }
                      className={`relative min-h-[125px] border-b border-r border-slate-200 p-2 text-left transition hover:bg-slate-50 ${
                        !currentMonth
                          ? "bg-slate-50/60"
                          : "bg-white"
                      } ${
                        isSelected
                          ? "ring-2 ring-inset ring-teal-500"
                          : ""
                      }`}
                    >
                      {/* DATE NUMBER */}

                      <div className="flex items-center justify-between">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                            isToday
                              ? "bg-teal-600 text-white"
                              : currentMonth
                              ? "text-slate-700"
                              : "text-slate-300"
                          }`}
                        >
                          {date.getDate()}
                        </span>

                        {dayEvents.length > 0 && (
                          <span className="text-[10px] font-medium text-slate-400">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      {/* EVENTS */}

                      <div className="mt-2 space-y-1">
                        {dayEvents
                          .slice(0, 2)
                          .map((event) => (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                              }}
                              className={`cursor-pointer truncate rounded-md border px-2 py-1 text-[10px] font-semibold ${typeStyles[event.type]}`}
                            >
                              <div className="flex items-center gap-1">
                                <span
                                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${typeDotStyles[event.type]}`}
                                />

                                <span className="truncate">
                                  {event.title}
                                </span>
                              </div>
                            </div>
                          ))}

                        {dayEvents.length > 2 && (
                          <span className="block px-1 text-[10px] font-semibold text-slate-400">
                            +{dayEvents.length - 2} more
                          </span>
                        )}
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}

          <aside className="space-y-6">
            {/* SELECTED DATE */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Selected Date
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    {new Date(
                      `${selectedDate}T12:00:00`
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                </div>

                <CalendarDays
                  size={20}
                  className="text-teal-600"
                />
              </div>

              <div className="mt-5 space-y-3">
                {selectedDayEvents.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-200 p-5 text-center">
                    <CalendarDays
                      size={25}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-2 text-sm font-medium text-slate-500">
                      No events scheduled
                    </p>

                    <button
                      onClick={() => setShowAddEvent(true)}
                      className="mt-3 text-xs font-semibold text-teal-600 hover:underline"
                    >
                      + Add an event
                    </button>
                  </div>
                ) : (
                  selectedDayEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() =>
                        setSelectedEvent(event)
                      }
                      className={`w-full rounded-lg border p-3 text-left transition hover:shadow-sm ${typeStyles[event.type]}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold">
                            {event.title}
                          </p>

                          <p className="mt-1 text-xs opacity-80">
                            {event.time} – {event.endTime}
                          </p>
                        </div>

                        <span className="rounded-full bg-white/70 px-2 py-1 text-[9px] font-bold">
                          {event.type}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* UPCOMING */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">
                  Upcoming Events
                </h3>

                <span className="text-xs text-slate-400">
                  Next 5
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {upcomingEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="flex w-full gap-3 text-left"
                  >
                    <div
                      className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${typeDotStyles[event.type]}`}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {event.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(
                          `${event.date}T12:00:00`
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        • {event.time}
                      </p>
                    </div>
                  </button>
                ))}

                {upcomingEvents.length === 0 && (
                  <p className="text-sm text-slate-500">
                    No upcoming events.
                  </p>
                )}
              </div>
            </div>

            {/* LEGEND */}

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold">Calendar Legend</h3>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {(
                  [
                    "Class",
                    "Assignment",
                    "Meeting",
                    "Exam",
                  ] as EventType[]
                ).map((type) => (
                  <div
                    key={type}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${typeDotStyles[type]}`}
                    />

                    <span className="text-xs text-slate-600">
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>

      {/* EVENT DETAILS MODAL */}

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${typeStyles[selectedEvent.type]}`}
                >
                  {selectedEvent.type}
                </span>

                <h2 className="mt-3 text-xl font-bold">
                  {selectedEvent.title}
                </h2>

                {selectedEvent.course && (
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedEvent.course}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <Clock3
                  size={19}
                  className="text-teal-600"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Time
                  </p>

                  <p className="text-sm font-semibold">
                    {selectedEvent.time} –{" "}
                    {selectedEvent.endTime}
                  </p>
                </div>
              </div>

              {selectedEvent.location && (
                <div className="flex items-center gap-3">
                  <MapPin
                    size={19}
                    className="text-teal-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Location
                    </p>

                    <p className="text-sm font-semibold">
                      {selectedEvent.location}
                    </p>
                  </div>
                </div>
              )}

              {selectedEvent.attendees && (
                <div className="flex items-center gap-3">
                  <Users
                    size={19}
                    className="text-teal-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Attendees
                    </p>

                    <p className="text-sm font-semibold">
                      {selectedEvent.attendees} people
                    </p>
                  </div>
                </div>
              )}

              {selectedEvent.type === "Class" && (
                <div className="flex items-center gap-3">
                  <BookOpen
                    size={19}
                    className="text-teal-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Course
                    </p>

                    <p className="text-sm font-semibold">
                      {selectedEvent.course}
                    </p>
                  </div>
                </div>
              )}

              {selectedEvent.type === "Meeting" && (
                <div className="flex items-center gap-3">
                  <Video
                    size={19}
                    className="text-teal-600"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Meeting
                    </p>

                    <p className="text-sm font-semibold">
                      Faculty / Staff Meeting
                    </p>
                  </div>
                </div>
              )}

              {selectedEvent.description && (
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-400">
                    Description
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {selectedEvent.description}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setSelectedEvent(null);
                  setShowAddEvent(true);
                }}
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
              >
                Add New Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD EVENT MODAL */}

      {showAddEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <h2 className="text-xl font-bold">
                  Add Calendar Event
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new class, meeting or deadline.
                </p>
              </div>

              <button
                onClick={() => setShowAddEvent(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddEvent(false);
              }}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Event Title
                </label>

                <input
                  required
                  type="text"
                  placeholder="e.g. Software Engineering Lecture"
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Date
                  </label>

                  <input
                    required
                    type="date"
                    defaultValue={selectedDate}
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Event Type
                  </label>

                  <select className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-teal-500">
                    <option>Class</option>
                    <option>Assignment</option>
                    <option>Meeting</option>
                    <option>Exam</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Start Time
                  </label>

                  <input
                    required
                    type="time"
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    End Time
                  </label>

                  <input
                    required
                    type="time"
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Location
                </label>

                <input
                  type="text"
                  placeholder="Room, Lab or Online"
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEvent(false)}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}