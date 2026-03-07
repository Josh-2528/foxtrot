"use client";

import type { OnboardingState } from "./page";

interface Props {
  data: OnboardingState;
  updateData: (partial: Partial<OnboardingState>) => void;
}

const vibes = [
  {
    id: "clean_minimal",
    title: "Clean & Minimal",
    description: "White space, simple layouts, thin fonts. Let the content breathe.",
    mockup: (
      <div className="space-y-2 p-3 bg-white rounded">
        <div className="h-2 w-16 bg-slate-800 rounded-full" />
        <div className="h-1.5 w-full bg-slate-200 rounded-full" />
        <div className="h-1.5 w-3/4 bg-slate-200 rounded-full" />
        <div className="h-6 w-20 bg-slate-800 rounded mt-3" />
      </div>
    ),
  },
  {
    id: "bold_loud",
    title: "Bold & Loud",
    description: "Big text, high contrast, punchy colours. Makes a statement.",
    mockup: (
      <div className="space-y-2 p-3 bg-neutral-900 rounded">
        <div className="h-3 w-20 bg-red-500 rounded-full" />
        <div className="h-1.5 w-full bg-neutral-700 rounded-full" />
        <div className="h-1.5 w-2/3 bg-neutral-700 rounded-full" />
        <div className="h-6 w-20 bg-red-500 rounded mt-3" />
      </div>
    ),
  },
  {
    id: "dark_premium",
    title: "Dark & Premium",
    description: "Dark backgrounds, gold/violet accents, luxury feel.",
    mockup: (
      <div className="space-y-2 p-3 bg-gray-900 rounded">
        <div className="h-2 w-16 bg-amber-400 rounded-full" />
        <div className="h-1.5 w-full bg-gray-700 rounded-full" />
        <div className="h-1.5 w-3/4 bg-gray-700 rounded-full" />
        <div className="h-6 w-20 bg-amber-400 rounded mt-3" />
      </div>
    ),
  },
  {
    id: "bright_fun",
    title: "Bright & Fun",
    description: "Colourful, playful, energetic. Rounded corners and pops of colour.",
    mockup: (
      <div className="space-y-2 p-3 bg-amber-50 rounded-xl">
        <div className="h-3 w-16 bg-pink-500 rounded-full" />
        <div className="h-1.5 w-full bg-amber-200 rounded-full" />
        <div className="h-1.5 w-4/5 bg-pink-200 rounded-full" />
        <div className="h-6 w-20 bg-pink-500 rounded-full mt-3" />
      </div>
    ),
  },
  {
    id: "earthy_natural",
    title: "Earthy & Natural",
    description: "Muted tones, organic textures, warm and grounded.",
    mockup: (
      <div className="space-y-2 p-3 bg-stone-100 rounded-lg">
        <div className="h-2 w-16 bg-violet-700 rounded-full" />
        <div className="h-1.5 w-full bg-stone-300 rounded-full" />
        <div className="h-1.5 w-4/5 bg-stone-300 rounded-full" />
        <div className="h-6 w-20 bg-violet-700 rounded-full mt-3" />
      </div>
    ),
  },
  {
    id: "corporate",
    title: "Corporate & Professional",
    description: "Structured, navy/grey, formal. Clean and authoritative.",
    mockup: (
      <div className="space-y-2 p-3 bg-slate-100 rounded">
        <div className="h-2 w-24 bg-navy-800 rounded-sm" />
        <div className="h-1.5 w-full bg-slate-300 rounded-sm" />
        <div className="h-1.5 w-3/4 bg-slate-300 rounded-sm" />
        <div className="h-6 w-20 bg-blue-600 rounded-sm mt-3" />
      </div>
    ),
  },
];

export default function StepVibe({ data, updateData }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Choose your vibe</h2>
      <p className="text-slate-400 text-sm mb-6">
        Select a visual style for your social media posts. This drives all
        future visual generation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vibes.map((vibe) => {
          const selected = data.vibe === vibe.id;
          return (
            <button
              key={vibe.id}
              onClick={() => updateData({ vibe: vibe.id })}
              className={`text-left rounded-xl border-2 p-4 transition ${
                selected
                  ? "border-violet-500 bg-violet-500/5"
                  : "border-navy-600 hover:border-navy-500 bg-navy-800"
              }`}
            >
              {/* Mini mockup */}
              <div className="mb-3 rounded-lg overflow-hidden border border-navy-600">
                {vibe.mockup}
              </div>

              <h3
                className={`text-sm font-semibold mb-1 ${
                  selected ? "text-violet-400" : "text-white"
                }`}
              >
                {vibe.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {vibe.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
