"use client";

import { FileImage } from "lucide-react";
import Link from "next/link";

export default function PostsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <p className="text-slate-400 text-sm mt-1">
            All your generated posts in one place.
          </p>
        </div>
        <Link
          href="/create"
          className="bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition"
        >
          Create Post
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {["All", "Drafts", "Ready", "Posted"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              i === 0
                ? "bg-violet-500/10 text-violet-400"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-12 text-center">
        <div className="w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center mx-auto mb-4">
          <FileImage size={28} className="text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No posts yet
        </h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-4">
          Create your first post or generate ideas to get started.
        </p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition"
        >
          Create Your First Post
        </Link>
      </div>
    </div>
  );
}
