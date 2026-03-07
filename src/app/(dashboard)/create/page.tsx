"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Wand2, ImageIcon, Loader2, RefreshCw, Save, Check } from "lucide-react";
import PostPreview from "@/components/PostPreview";
import type { Post } from "@/lib/types";

type PostSize = Post["post_size"];

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-violet-400" size={32} />
        </div>
      }
    >
      <CreatePageInner />
    </Suspense>
  );
}

function CreatePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ideaId = searchParams.get("ideaId");

  const [step, setStep] = useState<"choose" | "create">(ideaId ? "create" : "choose");
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [postType, setPostType] = useState("promotional");
  const [postSize, setPostSize] = useState<PostSize>("square_1080");
  const [captionStyle, setCaptionStyle] = useState("medium");
  const [captionTone, setCaptionTone] = useState("casual");

  // Generated content
  const [visualHtml, setVisualHtml] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [altText, setAltText] = useState("");
  const [cta, setCta] = useState("");

  // Loading states
  const [generatingVisual, setGeneratingVisual] = useState(false);
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadIdea = useCallback(async () => {
    if (!ideaId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ideas");
      const data = await res.json();
      const idea = data.ideas?.find((i: { id: string }) => i.id === ideaId);
      if (idea) {
        setTopic(idea.topic);
        setDescription(idea.description || "");
        setPostType(idea.post_type);
        setStep("create");
      }
    } catch (err) {
      console.error("Load idea error:", err);
    } finally {
      setLoading(false);
    }
  }, [ideaId]);

  useEffect(() => {
    loadIdea();
  }, [loadIdea]);

  async function generateVisual() {
    setGeneratingVisual(true);
    try {
      const res = await fetch("/api/posts/generate-visual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, description, post_type: postType, post_size: postSize }),
      });
      const data = await res.json();
      if (data.visual_html) setVisualHtml(data.visual_html);
    } catch (err) {
      console.error("Visual generation error:", err);
    } finally {
      setGeneratingVisual(false);
    }
  }

  async function generateCaption() {
    setGeneratingCaption(true);
    try {
      const res = await fetch("/api/posts/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, description, caption_style: captionStyle, caption_tone: captionTone }),
      });
      const data = await res.json();
      if (data.caption) setCaption(data.caption);
      if (data.hashtags) setHashtags(data.hashtags);
      if (data.alt_text) setAltText(data.alt_text);
    } catch (err) {
      console.error("Caption generation error:", err);
    } finally {
      setGeneratingCaption(false);
    }
  }

  async function generateBoth() {
    await Promise.all([generateVisual(), generateCaption()]);
  }

  async function savePost(status: "draft" | "ready") {
    setSaving(true);
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea_id: ideaId || null,
          visual_html: visualHtml,
          visual_mode: "graphic",
          caption,
          hashtags,
          cta,
          alt_text: altText,
          post_size: postSize,
          status,
        }),
      });
      const data = await res.json();
      if (data.post) {
        router.push("/posts");
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  }

  function startFromScratch() {
    setStep("create");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-violet-400" size={32} />
      </div>
    );
  }

  // Step 1: Choose mode
  if (step === "choose") {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Create Post</h1>
          <p className="text-slate-400 text-sm mt-1">
            Generate a new social media post with AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={startFromScratch}
            className="bg-navy-900 border border-navy-700 rounded-xl p-8 hover:border-violet-500/30 transition group text-left"
          >
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition">
              <Wand2 size={24} className="text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Create from Scratch</h3>
            <p className="text-slate-400 text-sm">
              Enter a topic manually and generate a branded visual post with caption.
            </p>
          </button>

          <button
            onClick={() => router.push("/ideas")}
            className="bg-navy-900 border border-navy-700 rounded-xl p-8 hover:border-violet-500/30 transition group text-left"
          >
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition">
              <ImageIcon size={24} className="text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">From an Approved Idea</h3>
            <p className="text-slate-400 text-sm">
              Pick an approved idea from your ideas list. Foxtrot generates the visual and caption.
            </p>
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Create workspace
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Create Post</h1>
        <p className="text-slate-400 text-sm mt-1">
          Generate visual and caption, then save when ready.
        </p>
      </div>

      {/* Topic input (if from scratch) */}
      {!ideaId && (
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Showcase our top service"
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Post Type</label>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm"
              >
                <option value="promotional">Promotional</option>
                <option value="educational">Educational</option>
                <option value="behind_scenes">Behind the Scenes</option>
                <option value="testimonial">Testimonial</option>
                <option value="seasonal">Seasonal</option>
                <option value="offer">Offer</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this post should show or say..."
              rows={2}
              className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm resize-none"
            />
          </div>
          <button
            onClick={generateBoth}
            disabled={!topic.trim() || generatingVisual || generatingCaption}
            className="mt-4 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition flex items-center gap-2"
          >
            {generatingVisual || generatingCaption ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Wand2 size={16} />
            )}
            Generate Post
          </button>
        </div>
      )}

      {/* If from idea, auto-generate */}
      {ideaId && !visualHtml && !generatingVisual && topic && (
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 mb-6">
          <p className="text-sm text-white mb-1 font-semibold">{topic}</p>
          <p className="text-xs text-slate-400 mb-4">{description}</p>
          <button
            onClick={generateBoth}
            className="bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition flex items-center gap-2"
          >
            <Wand2 size={16} /> Generate Post
          </button>
        </div>
      )}

      {/* Side-by-side: Visual + Caption */}
      {(visualHtml || caption || generatingVisual || generatingCaption) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visual panel */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Visual</h3>
              <div className="flex items-center gap-2">
                <select
                  value={postSize}
                  onChange={(e) => setPostSize(e.target.value as PostSize)}
                  className="bg-navy-800 border border-navy-600 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none"
                >
                  <option value="square_1080">Square (1080x1080)</option>
                  <option value="portrait_1080x1350">Portrait (1080x1350)</option>
                  <option value="story_1080x1920">Story (1080x1920)</option>
                </select>
                <button
                  onClick={generateVisual}
                  disabled={generatingVisual}
                  className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 rounded-lg px-3 py-1.5 transition"
                >
                  {generatingVisual ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                  Regenerate
                </button>
              </div>
            </div>
            {generatingVisual ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-violet-400" size={32} />
              </div>
            ) : visualHtml ? (
              <PostPreview html={visualHtml} postSize={postSize} className="mx-auto" />
            ) : null}
          </div>

          {/* Caption panel */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Caption</h3>
              <button
                onClick={generateCaption}
                disabled={generatingCaption}
                className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 rounded-lg px-3 py-1.5 transition"
              >
                {generatingCaption ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                Regenerate
              </button>
            </div>

            {/* Style/tone controls */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Style</label>
                <select
                  value={captionStyle}
                  onChange={(e) => setCaptionStyle(e.target.value)}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none"
                >
                  <option value="short">Short & Sharp</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long & Detailed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Tone</label>
                <select
                  value={captionTone}
                  onChange={(e) => setCaptionTone(e.target.value)}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="witty">Witty</option>
                  <option value="motivational">Motivational</option>
                </select>
              </div>
            </div>

            {generatingCaption ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-violet-400" size={24} />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Caption</label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    rows={5}
                    className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Hashtags</label>
                  <textarea
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    rows={2}
                    className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">CTA</label>
                  <input
                    type="text"
                    value={cta}
                    onChange={(e) => setCta(e.target.value)}
                    placeholder="Link in bio"
                    className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Image description for accessibility"
                    className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save buttons */}
      {(visualHtml || caption) && (
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => savePost("draft")}
            disabled={saving}
            className="bg-navy-800 hover:bg-navy-700 border border-navy-600 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition flex items-center gap-2"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save as Draft
          </button>
          <button
            onClick={() => savePost("ready")}
            disabled={saving}
            className="bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition flex items-center gap-2"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            Mark as Ready
          </button>
        </div>
      )}
    </div>
  );
}
