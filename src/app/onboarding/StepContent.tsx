"use client";

import type { OnboardingState } from "./page";

interface Props {
  data: OnboardingState;
  updateData: (partial: Partial<OnboardingState>) => void;
}

const tones = [
  {
    id: "friendly",
    label: "Friendly",
    description: "Warm, approachable, like talking to a mate",
  },
  {
    id: "professional",
    label: "Professional",
    description: "Polished and business-like, but not stiff",
  },
  {
    id: "casual",
    label: "Casual",
    description: "Relaxed and conversational, like a text from a friend",
  },
  {
    id: "formal",
    label: "Formal",
    description: "Buttoned-up and authoritative, corporate tone",
  },
];

export default function StepContent({ data, updateData }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">
        Content Preferences
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        Set the tone and key details for your AI-generated review replies.
      </p>

      {/* Tone selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Reply Tone
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tones.map((tone) => {
            const selected = data.contentTone === tone.id;
            return (
              <button
                key={tone.id}
                onClick={() => updateData({ contentTone: tone.id })}
                className={`text-left rounded-lg border-2 p-4 transition ${
                  selected
                    ? "border-green-500 bg-green-500/5"
                    : "border-navy-600 hover:border-navy-500 bg-navy-800"
                }`}
              >
                <p
                  className={`text-sm font-semibold mb-0.5 ${
                    selected ? "text-green-400" : "text-white"
                  }`}
                >
                  {tone.label}
                </p>
                <p className="text-xs text-slate-400">{tone.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Target Audience
          </label>
          <input
            type="text"
            value={data.targetAudience}
            onChange={(e) => updateData({ targetAudience: e.target.value })}
            placeholder="e.g., Families, car enthusiasts, fleet managers"
            className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Key Services
          </label>
          <input
            type="text"
            value={data.keyServices}
            onChange={(e) => updateData({ keyServices: e.target.value })}
            placeholder="e.g., Express wash, full detail, hand wax (comma-separated)"
            className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition text-sm"
          />
          <p className="text-xs text-slate-500 mt-1">Separate with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Unique Selling Points
          </label>
          <input
            type="text"
            value={data.uniqueSellingPoints}
            onChange={(e) =>
              updateData({ uniqueSellingPoints: e.target.value })
            }
            placeholder="e.g., Eco-friendly, open 24/7, locally owned (comma-separated)"
            className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition text-sm"
          />
          <p className="text-xs text-slate-500 mt-1">Separate with commas</p>
        </div>
      </div>
    </div>
  );
}
