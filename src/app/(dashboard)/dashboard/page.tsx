"use client";

import Link from "next/link";
import {
  Lightbulb,
  Palette,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileImage,
  Loader2,
  Wand2,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";
import StatusBadge from "@/components/StatusBadge";
import type { Post } from "@/lib/types";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function DashboardPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const cells = getCalendarDays(year, month);
  const todayDate = today.getDate();
  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => {
        if (data.posts) setPosts(data.posts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else { setMonth(month - 1); }
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else { setMonth(month + 1); }
  }

  // Compute stats
  const totalPosts = posts.length;
  const drafts = posts.filter((p) => p.status === "draft").length;
  const ready = posts.filter((p) => p.status === "ready").length;
  const postedThisMonth = posts.filter((p) => {
    if (p.status !== "posted") return false;
    const d = new Date(p.created_at);
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  }).length;

  // Map posts to calendar dates
  const postsByDate = new Map<string, Post[]>();
  posts.forEach((post) => {
    const dateStr = post.scheduled_date || post.created_at.split("T")[0];
    const d = new Date(dateStr);
    if (d.getMonth() === month && d.getFullYear() === year) {
      const key = d.getDate().toString();
      const existing = postsByDate.get(key) || [];
      existing.push(post);
      postsByDate.set(key, existing);
    }
  });

  // Recent posts (last 5)
  const recentPosts = posts.slice(0, 5);

  const stats = [
    { label: "Total Posts", value: totalPosts, icon: FileImage },
    { label: "Drafts", value: drafts, icon: BarChart3 },
    { label: "Ready", value: ready, icon: Wand2 },
    { label: "Posted This Month", value: postedThisMonth, icon: CalendarDays },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">
          Welcome to Foxtrot. Generate ideas, create posts, and fill your content calendar.
        </p>
      </div>

      {/* Stats row */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-violet-400" size={24} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-navy-900 border border-navy-700 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={14} className="text-violet-400" />
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Calendar */}
        <div className="lg:col-span-2 bg-navy-900 border border-navy-700 rounded-xl overflow-hidden">
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
              const dayPosts = day ? postsByDate.get(day.toString()) || [] : [];
              return (
                <div
                  key={i}
                  className={`min-h-[72px] sm:min-h-[88px] p-1.5 sm:p-2 border-b border-r border-navy-800 ${
                    day ? "hover:bg-navy-800/50 cursor-pointer" : "bg-navy-950/30"
                  } transition`}
                >
                  {day && (
                    <>
                      <span
                        className={`inline-flex items-center justify-center text-xs w-6 h-6 rounded-full ${
                          isToday
                            ? "bg-violet-500 text-white font-bold"
                            : "text-slate-400"
                        }`}
                      >
                        {day}
                      </span>
                      {dayPosts.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {dayPosts.slice(0, 3).map((p) => (
                            <div
                              key={p.id}
                              className={`w-2 h-2 rounded-full ${
                                p.status === "posted"
                                  ? "bg-emerald-400"
                                  : p.status === "ready"
                                  ? "bg-violet-400"
                                  : "bg-amber-400"
                              }`}
                              title={p.caption?.slice(0, 40) || "Post"}
                            />
                          ))}
                          {dayPosts.length > 3 && (
                            <span className="text-[10px] text-slate-500">
                              +{dayPosts.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {posts.length === 0 && (
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
          )}
        </div>

        {/* Recent posts */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Recent Posts</h3>
          {recentPosts.length === 0 ? (
            <p className="text-sm text-slate-400">No posts yet.</p>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href="/posts"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-navy-800 transition"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-navy-800 shrink-0">
                    {post.visual_html ? (
                      <iframe
                        srcDoc={post.visual_html}
                        className="w-[1080px] h-[1080px] border-none pointer-events-none"
                        style={{ transform: "scale(0.00926)", transformOrigin: "top left" }}
                        title="Thumbnail"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileImage size={14} className="text-slate-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">
                      {post.caption?.slice(0, 50) || "Untitled"}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {new Date(post.created_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <StatusBadge status={post.status} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
