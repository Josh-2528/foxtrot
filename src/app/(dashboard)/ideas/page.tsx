"use client";

import { useState, useEffect } from "react";
import { Lightbulb, Sparkles, Check, X, Pencil, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import StatusBadge, { PostTypeBadge } from "@/components/StatusBadge";
import type { ContentIdea } from "@/lib/types";

type TabFilter = "all" | "generated" | "approved" | "skipped";

export default function IdeasPage() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTopic, setEditTopic] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    loadIdeas();
  }, []);

  async function loadIdeas() {
    try {
      const res = await fetch("/api/ideas");
      const data = await res.json();
      if (data.ideas) setIdeas(data.ideas);
    } catch (err) {
      console.error("Load ideas error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function generateIdeas() {
    setGenerating(true);
    try {
      const res = await fetch("/api/ideas/generate", { method: "POST" });
      const data = await res.json();
      if (data.ideas) {
        setIdeas((prev) => [...data.ideas, ...prev]);
      }
    } catch (err) {
      console.error("Generate error:", err);
    } finally {
      setGenerating(false);
    }
  }

  async function updateIdea(id: string, updates: Record<string, unknown>) {
    try {
      await fetch("/api/ideas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      setIdeas((prev) =>
        prev.map((idea) => (idea.id === id ? { ...idea, ...updates } as ContentIdea : idea))
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  }

  function startEdit(idea: ContentIdea) {
    setEditingId(idea.id);
    setEditTopic(idea.topic);
    setEditDescription(idea.description || "");
  }

  function saveEdit(id: string) {
    updateIdea(id, { topic: editTopic, description: editDescription });
    setEditingId(null);
  }

  const tabs: { label: string; value: TabFilter }[] = [
    { label: "All", value: "all" },
    { label: "Generated", value: "generated" },
    { label: "Approved", value: "approved" },
    { label: "Skipped", value: "skipped" },
  ];

  const filteredIdeas = activeTab === "all"
    ? ideas.filter((i) => i.status !== "used")
    : ideas.filter((i) => i.status === activeTab);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-violet-400" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Ideas</h1>
          <p className="text-slate-400 text-sm mt-1">
            AI-generated post ideas tailored to your business.
          </p>
        </div>
        <button
          onClick={generateIdeas}
          disabled={generating}
          className="bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition flex items-center gap-2"
        >
          {generating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}
          {generating ? "Generating..." : "Generate Ideas"}
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              activeTab === tab.value
                ? "bg-violet-500/10 text-violet-400"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredIdeas.length === 0 ? (
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-12 text-center">
          <div className="w-14 h-14 bg-violet-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lightbulb size={28} className="text-violet-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {activeTab === "all" ? "No ideas yet" : `No ${activeTab} ideas`}
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Click &quot;Generate Ideas&quot; to get a batch of AI-powered post ideas based on your business, industry, and brand.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="bg-navy-900 border border-navy-700 rounded-xl p-5 hover:border-navy-600 transition"
            >
              {editingId === idea.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editTopic}
                    onChange={(e) => setEditTopic(e.target.value)}
                    className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(idea.id)}
                      className="bg-violet-500 hover:bg-violet-600 text-white text-xs font-medium rounded-lg px-3 py-1.5 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-slate-400 hover:text-white text-xs font-medium rounded-lg px-3 py-1.5 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <PostTypeBadge type={idea.post_type} />
                      <StatusBadge status={idea.status} />
                    </div>
                    {idea.suggested_visual_mode === "photo" && (
                      <span className="text-xs text-slate-500 shrink-0">Photo</span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5 line-clamp-2">
                    {idea.topic}
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-3">
                    {idea.description}
                  </p>
                  <div className="flex items-center gap-1.5 pt-3 border-t border-navy-700">
                    {idea.status === "generated" && (
                      <>
                        <button
                          onClick={() => updateIdea(idea.id, { status: "approved" })}
                          className="flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg px-2.5 py-1.5 transition"
                        >
                          <Check size={12} /> Approve
                        </button>
                        <button
                          onClick={() => updateIdea(idea.id, { status: "skipped" })}
                          className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-300 bg-slate-500/10 hover:bg-slate-500/20 rounded-lg px-2.5 py-1.5 transition"
                        >
                          <X size={12} /> Skip
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => startEdit(idea)}
                      className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-300 bg-slate-500/10 hover:bg-slate-500/20 rounded-lg px-2.5 py-1.5 transition"
                    >
                      <Pencil size={12} /> Edit
                    </button>
                    {(idea.status === "approved" || idea.status === "generated") && (
                      <button
                        onClick={() => router.push(`/create?ideaId=${idea.id}`)}
                        className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 rounded-lg px-2.5 py-1.5 transition ml-auto"
                      >
                        Create Post <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
