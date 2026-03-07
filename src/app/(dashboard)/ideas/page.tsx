"use client";

import { Lightbulb, Sparkles } from "lucide-react";

export default function IdeasPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Ideas</h1>
          <p className="text-slate-400 text-sm mt-1">
            AI-generated post ideas tailored to your business.
          </p>
        </div>
        <button className="bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition flex items-center gap-2">
          <Sparkles size={16} />
          Generate Ideas
        </button>
      </div>

      {/* Empty state */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-12 text-center">
        <div className="w-14 h-14 bg-violet-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Lightbulb size={28} className="text-violet-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No ideas yet
        </h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Click &quot;Generate Ideas&quot; to get a batch of AI-powered post
          ideas based on your business, industry, and brand.
        </p>
      </div>
    </div>
  );
}
