"use client";

import { Wand2, ImageIcon, Upload } from "lucide-react";

export default function CreatePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Create Post</h1>
        <p className="text-slate-400 text-sm mt-1">
          Generate a new social media post with AI.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Graphic post */}
        <button className="bg-navy-900 border border-navy-700 rounded-xl p-8 hover:border-violet-500/30 transition group text-left">
          <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition">
            <Wand2 size={24} className="text-violet-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            AI Graphic Post
          </h3>
          <p className="text-slate-400 text-sm">
            Generate a branded graphic post with text overlays, your brand
            colours, and a caption.
          </p>
        </button>

        {/* Photo post */}
        <button className="bg-navy-900 border border-navy-700 rounded-xl p-8 hover:border-violet-500/30 transition group text-left">
          <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition">
            <Upload size={24} className="text-violet-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Photo Post
          </h3>
          <p className="text-slate-400 text-sm">
            Upload your own photo. Foxtrot adds your branding, text overlays,
            and writes the caption.
          </p>
        </button>
      </div>

      {/* Preview area */}
      <div className="mt-8 bg-navy-900 border border-navy-700 rounded-2xl p-12 text-center">
        <div className="w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center mx-auto mb-4">
          <ImageIcon size={28} className="text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Your post preview will appear here
        </h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Choose a post type above to get started. Foxtrot will generate a
          visual and caption using your brand kit.
        </p>
      </div>
    </div>
  );
}
