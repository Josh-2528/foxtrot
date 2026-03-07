"use client";

import type { OnboardingState } from "./page";

interface Props {
  data: OnboardingState;
  updateData: (partial: Partial<OnboardingState>) => void;
}

const vibes = [
  {
    id: "minimal",
    title: "Minimal",
    description: "Clean, spacious, and understated. Let the content breathe.",
    preview: {
      bg: "#f8fafc",
      accent: "#0f172a",
      text: "#334155",
      style: "border-l-4 border-slate-900",
    },
    mockup: (
      <div className="space-y-2 p-3">
        <div className="h-2 w-16 bg-slate-800 rounded-full" />
        <div className="h-1.5 w-full bg-slate-200 rounded-full" />
        <div className="h-1.5 w-3/4 bg-slate-200 rounded-full" />
        <div className="h-6 w-20 bg-slate-800 rounded mt-3" />
      </div>
    ),
  },
  {
    id: "bold",
    title: "Bold",
    description: "High contrast, strong typography. Makes a statement.",
    preview: {
      bg: "#0f0f0f",
      accent: "#ff3d00",
      text: "#ffffff",
      style: "border-l-4 border-red-500",
    },
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
    id: "playful",
    title: "Playful",
    description: "Rounded corners, bright pops, and a friendly feel.",
    preview: {
      bg: "#fef3c7",
      accent: "#f59e0b",
      text: "#78350f",
      style: "border-l-4 border-amber-400",
    },
    mockup: (
      <div className="space-y-2 p-3 bg-amber-50 rounded-xl">
        <div className="h-3 w-16 bg-amber-400 rounded-full" />
        <div className="h-1.5 w-full bg-amber-200 rounded-full" />
        <div className="h-1.5 w-4/5 bg-amber-200 rounded-full" />
        <div className="h-6 w-20 bg-amber-400 rounded-full mt-3" />
      </div>
    ),
  },
  {
    id: "elegant",
    title: "Elegant",
    description: "Refined typography, muted tones, and subtle luxury.",
    preview: {
      bg: "#faf9f7",
      accent: "#92764a",
      text: "#44403c",
      style: "border-l-4 border-amber-700",
    },
    mockup: (
      <div className="space-y-2 p-3 bg-stone-50 rounded">
        <div className="h-2 w-24 bg-amber-700 rounded-full" />
        <div className="h-1.5 w-full bg-stone-200 rounded-full" />
        <div className="h-1.5 w-3/4 bg-stone-200 rounded-full" />
        <div className="h-6 w-20 bg-amber-700/80 rounded mt-3" />
      </div>
    ),
  },
  {
    id: "industrial",
    title: "Industrial",
    description: "Raw, utilitarian design. Exposed structure and grit.",
    preview: {
      bg: "#1c1917",
      accent: "#facc15",
      text: "#a8a29e",
      style: "border-l-4 border-yellow-400",
    },
    mockup: (
      <div className="space-y-2 p-3 bg-stone-900 rounded">
        <div className="h-3 w-16 bg-yellow-400 rounded-sm" />
        <div className="h-1.5 w-full bg-stone-700 rounded-sm" />
        <div className="h-1.5 w-2/3 bg-stone-700 rounded-sm" />
        <div className="h-6 w-20 bg-yellow-400 rounded-sm mt-3" />
      </div>
    ),
  },
  {
    id: "organic",
    title: "Organic",
    description: "Natural textures, earthy tones, soft and flowing.",
    preview: {
      bg: "#f0fdf4",
      accent: "#16a34a",
      text: "#14532d",
      style: "border-l-4 border-green-600",
    },
    mockup: (
      <div className="space-y-2 p-3 bg-green-50 rounded-2xl">
        <div className="h-2 w-16 bg-green-600 rounded-full" />
        <div className="h-1.5 w-full bg-green-200 rounded-full" />
        <div className="h-1.5 w-4/5 bg-green-200 rounded-full" />
        <div className="h-6 w-20 bg-green-600 rounded-full mt-3" />
      </div>
    ),
  },
];

export default function StepVibe({ data, updateData }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Choose your vibe</h2>
      <p className="text-slate-400 text-sm mb-6">
        Select a visual style that best represents your brand personality.
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
                  ? "border-green-500 bg-green-500/5"
                  : "border-navy-600 hover:border-navy-500 bg-navy-800"
              }`}
            >
              {/* Mini mockup */}
              <div className="mb-3 rounded-lg overflow-hidden border border-navy-600">
                {vibe.mockup}
              </div>

              <h3
                className={`text-sm font-semibold mb-1 ${
                  selected ? "text-green-400" : "text-white"
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
