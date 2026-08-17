"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Send,
  Paperclip,
  MoreVertical,
  MessageSquarePlus,
  CheckCheck,
} from "lucide-react";

type Conversation = {
  id: number;
  name: string;
  initials: string;
  course: string;
  lastMessage: string;
  time: string;
  unread: number;
};

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    initials: "SA",
    course: "Environmental Science",
    lastMessage: "Thank you for the feedback, doctor.",
    time: "10:42 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Safdar Ali",
    initials: "SA",
    course: "Psychology 150",
    lastMessage: "Can I submit the assignment tomorrow?",
    time: "09:18 AM",
    unread: 1,
  },
  {
    id: 3,
    name: "Anousha Khan",
    initials: "AK",
    course: "Biology 201",
    lastMessage: "I have uploaded my lab report.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "Hamza Raza",
    initials: "HR",
    course: "Computer Science 320",
    lastMessage: "The project requirements are clear.",
    time: "Yesterday",
    unread: 0,
  },
];

type Message = {
  id: number;
  sender: "teacher" | "student";
  text: string;
  time: string;
};

const initialMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      sender: "student",
      text: "Hi Dr. Ahad, I wanted to ask about the feedback on my environmental systems assignment.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "teacher",
      text: "Sure, Sarah. I reviewed your submission. Your analysis is good, but you should provide more evidence for the second section.",
      time: "10:35 AM",
    },
    {
      id: 3,
      sender: "student",
      text: "Thank you for the feedback, doctor.",
      time: "10:42 AM",
    },
  ],
  2: [
    {
      id: 1,
      sender: "student",
      text: "Can I submit the assignment tomorrow?",
      time: "09:18 AM",
    },
  ],
  3: [
    {
      id: 1,
      sender: "student",
      text: "I have uploaded my lab report.",
      time: "Yesterday",
    },
  ],
  4: [
    {
      id: 1,
      sender: "student",
      text: "The project requirements are clear.",
      time: "Yesterday",
    },
  ],
};

export default function TeacherMessagesPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] =
    useState<Record<number, Message[]>>(initialMessages);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId
  );

  const filteredConversations = useMemo(() => {
    return conversations.filter(
      (conversation) =>
        conversation.name.toLowerCase().includes(search.toLowerCase()) ||
        conversation.course.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "teacher",
      text: trimmedMessage,
      time: "Just now",
    };

    setMessages((current) => ({
      ...current,
      [selectedId]: [...(current[selectedId] || []), newMessage],
    }));

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-5 lg:px-8">
        <Link
          href="/teacher"
          className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#087F87] hover:underline"
        >
          <ArrowLeft size={16} />
          Teacher Dashboard
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
              <Send size={21} className="text-[#087F87]" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Messages
              </h1>

              <p className="text-sm text-slate-500">
                Communicate with students and manage conversations.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl bg-[#087F87] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066B72] sm:flex"
          >
            <MessageSquarePlus size={17} />
            New Message
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex h-[calc(100vh-220px)] min-h-[600px] max-w-[1400px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Conversations */}
          <aside className="w-full border-r border-slate-200 md:w-[330px] lg:w-[360px]">
            <div className="border-b border-slate-200 p-4">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-[#087F87] focus:bg-white"
                />
              </div>
            </div>

            <div className="h-[calc(100%-73px)] overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setSelectedId(conversation.id)}
                  className={`flex w-full gap-3 border-b border-slate-100 p-4 text-left transition ${
                    selectedId === conversation.id
                      ? "bg-teal-50/70"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-[#087F87]">
                      {conversation.initials}
                    </div>

                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {conversation.name}
                      </p>

                      <span className="shrink-0 text-[11px] text-slate-400">
                        {conversation.time}
                      </span>
                    </div>

                    <p className="mt-0.5 truncate text-xs text-[#087F87]">
                      {conversation.course}
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-slate-500">
                        {conversation.lastMessage}
                      </p>

                      {conversation.unread > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#087F87] px-1 text-[10px] font-bold text-white">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Chat */}
          <section className="hidden min-w-0 flex-1 md:flex md:flex-col">
            {selectedConversation && (
              <>
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-[#087F87]">
                      {selectedConversation.initials}
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-800">
                        {selectedConversation.name}
                      </h2>

                      <p className="text-xs text-green-600">
                        ● Online · {selectedConversation.course}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreVertical size={19} />
                  </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto bg-[#FAFBFC] p-5">
                  <div className="text-center">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-500">
                      Today
                    </span>
                  </div>

                  {(messages[selectedId] || []).map((item) => (
                    <div
                      key={item.id}
                      className={`flex ${
                        item.sender === "teacher"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] ${
                          item.sender === "teacher"
                            ? "items-end"
                            : "items-start"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                            item.sender === "teacher"
                              ? "rounded-br-md bg-[#087F87] text-white"
                              : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          {item.text}
                        </div>

                        <div
                          className={`mt-1 flex items-center gap-1 text-[10px] text-slate-400 ${
                            item.sender === "teacher"
                              ? "justify-end"
                              : ""
                          }`}
                        >
                          {item.time}

                          {item.sender === "teacher" && (
                            <CheckCheck size={13} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 bg-white p-4">
                  <div className="flex items-end gap-3">
                    <button
                      type="button"
                      className="mb-1 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <Paperclip size={19} />
                    </button>

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      rows={1}
                      placeholder="Write a message..."
                      className="max-h-28 min-h-[42px] flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[#087F87] focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className="mb-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#087F87] text-white transition hover:bg-[#066B72]"
                    >
                      <Send size={17} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}