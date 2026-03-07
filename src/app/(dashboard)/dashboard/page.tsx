"use client";

import Link from "next/link";
import {
  Lightbulb,
  Palette,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // Monday-based
  const totalDays = lastDay.getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function DashboardPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const cells = getCalendarDays(year, month);
  const todayDate = today.getDate();
  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">
          Welcome to Foxtrot. Generate ideas, create posts, and fill your
          content calendar.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          href="/ideas"
          className="bg-navy-900 border border-navy-700 rounded-xl p-6 hover:border-violet-500/30 transition group flex items-start gap-4"
        >
          <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition">
            <Lightbulb size={20} className="text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Generate Ideas</h3>
            <p className="text-slate-400 text-sm">
              Get a batch of AI-generated post ideas tailored to your business.
            </p>
          </div>
        </Link>

        <Link
          href="/brand-kit"
          className="bg-navy-900 border border-navy-700 rounded-xl p-6 hover:border-violet-500/30 transition group flex items-start gap-4"
        >
          <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition">
            <Palette size={20} className="text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Brand Kit</h3>
            <p className="text-slate-400 text-sm">
              Update your logo, colours, fonts, and visual style.
            </p>
          </div>
        </Link>
      </div>

      {/* Content Calendar */}
      <div className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-700">
          <div className="flex items-center gap-3">
            <CalendarDays size={18} className="text-violet-400" />
            <h2 className="font-semibold text-white">Content Calendar</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-medium text-white min-w-[140px] text-center">
              {MONTH_NAMES[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7">
          {DAYS.map((d) => (
            <div
              key={d}
              className="px-2 py-2 text-center text-xs font-medium text-slate-500 border-b border-navy-700"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const isToday = isCurrentMonth && day === todayDate;
            return (
              <div
                key={i}
                className={`min-h-[72px] sm:min-h-[88px] p-1.5 sm:p-2 border-b border-r border-navy-800 ${
                  day ? "hover:bg-navy-800/50 cursor-pointer" : "bg-navy-950/30"
                } transition`}
              >
                {day && (
                  <span
                    className={`inline-flex items-center justify-center text-xs w-6 h-6 rounded-full ${
                      isToday
                        ? "bg-violet-500 text-white font-bold"
                        : "text-slate-400"
                    }`}
                  >
                    {day}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        <div className="px-6 py-6 text-center border-t border-navy-700">
          <p className="text-slate-500 text-sm">
            No posts scheduled yet.{" "}
            <Link
              href="/ideas"
              className="text-violet-400 hover:text-violet-300 font-medium"
            >
              Generate ideas
            </Link>{" "}
            to fill your calendar.
          </p>
        </div>
      </div>
    </div>
  );
}
