"use client";

import { Palette } from "lucide-react";

export default function BrandKitPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Brand Kit</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your logo, colours, fonts, and visual style.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Logo</h3>
          <div className="w-full border-2 border-dashed border-navy-600 hover:border-violet-500/40 rounded-xl p-8 flex flex-col items-center gap-3 transition cursor-pointer">
            <div className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center">
              <Palette size={20} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-400">
              Click to upload or replace your logo
            </p>
          </div>
        </div>

        {/* Colours */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">
            Brand Colours
          </h3>
          <div className="space-y-3">
            {[
              { label: "Primary", color: "#8b5cf6" },
              { label: "Secondary", color: "#0f1629" },
              { label: "Accent", color: "#a78bfa" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg border border-navy-600"
                  style={{ backgroundColor: c.color }}
                />
                <div>
                  <p className="text-sm font-medium text-white">{c.label}</p>
                  <p className="text-xs text-slate-400 font-mono uppercase">
                    {c.color}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vibe */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">
            Visual Style
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center">
              <Palette size={18} className="text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Not set yet
              </p>
              <p className="text-xs text-slate-400">
                Complete onboarding to set your visual style
              </p>
            </div>
          </div>
        </div>

        {/* Font */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Font</h3>
          <p className="text-2xl font-bold text-white mb-1">Inter</p>
          <p className="text-sm text-slate-400">
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>
    </div>
  );
}
