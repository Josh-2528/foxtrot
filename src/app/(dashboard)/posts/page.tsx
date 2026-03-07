"use client";

import { useState, useEffect, useRef } from "react";
import { FileImage, Loader2, Download, Copy, Trash2, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import PostPreview from "@/components/PostPreview";
import StatusBadge from "@/components/StatusBadge";
import type { Post } from "@/lib/types";

type TabFilter = "all" | "draft" | "ready" | "posted";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch (err) {
      console.error("Load posts error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(id: string) {
    setDeletingId(id);
    try {
      await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeletingId(null);
    }
  }

  async function updatePostStatus(id: string, status: string) {
    try {
      await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: status as Post["status"] } : p))
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  }

  function copyCaption(post: Post) {
    const text = [post.caption, post.hashtags].filter(Boolean).join("\n\n");
    navigator.clipboard.writeText(text);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function downloadImage(post: Post) {
    if (!post.visual_html) return;

    try {
      // Create an offscreen iframe to render the HTML
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.left = "-9999px";
      iframe.style.width = "1080px";
      iframe.style.height = "1080px";
      document.body.appendChild(iframe);
      iframe.srcdoc = post.visual_html;

      await new Promise((resolve) => {
        iframe.onload = resolve;
      });

      // Use html2canvas on the iframe body
      const html2canvas = (await import("html2canvas")).default;
      const iframeDoc = iframe.contentDocument;
      if (!iframeDoc) return;

      const canvas = await html2canvas(iframeDoc.body, {
        width: 1080,
        height: post.post_size === "portrait_1080x1350" ? 1350 : post.post_size === "story_1080x1920" ? 1920 : 1080,
        scale: 1,
        useCORS: true,
      });

      document.body.removeChild(iframe);

      const link = document.createElement("a");
      link.download = `foxtrot-post-${post.id.slice(0, 8)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download error:", err);
    }
  }

  const tabs: { label: string; value: TabFilter }[] = [
    { label: "All", value: "all" },
    { label: "Drafts", value: "draft" },
    { label: "Ready", value: "ready" },
    { label: "Posted", value: "posted" },
  ];

  const filteredPosts =
    activeTab === "all" ? posts : posts.filter((p) => p.status === activeTab);

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

      {/* Hidden download anchor */}
      <a ref={downloadRef} className="hidden" />

      {filteredPosts.length === 0 ? (
        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-12 text-center">
          <div className="w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileImage size={28} className="text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {activeTab === "all" ? "No posts yet" : `No ${activeTab} posts`}
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
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const isExpanded = expandedId === post.id;
            return (
              <div
                key={post.id}
                className="bg-navy-900 border border-navy-700 rounded-xl overflow-hidden hover:border-navy-600 transition"
              >
                {/* Collapsed row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : post.id)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  {/* Mini preview */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-navy-800 shrink-0">
                    {post.visual_html ? (
                      <iframe
                        srcDoc={post.visual_html}
                        className="w-[1080px] h-[1080px] border-none pointer-events-none"
                        style={{ transform: "scale(0.0148)", transformOrigin: "top left" }}
                        title="Post thumbnail"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileImage size={20} className="text-slate-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">
                      {post.caption?.slice(0, 80) || "Untitled post"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(post.created_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <StatusBadge status={post.status} />

                  <ExternalLink size={14} className="text-slate-500 shrink-0" />
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-navy-700 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Visual */}
                      {post.visual_html && (
                        <PostPreview
                          html={post.visual_html}
                          postSize={post.post_size}
                          className="mx-auto"
                        />
                      )}

                      {/* Caption + actions */}
                      <div>
                        {post.caption && (
                          <div className="mb-4">
                            <p className="text-xs text-slate-400 mb-1">Caption</p>
                            <p className="text-sm text-white whitespace-pre-wrap">
                              {post.caption}
                            </p>
                          </div>
                        )}
                        {post.hashtags && (
                          <div className="mb-4">
                            <p className="text-xs text-slate-400 mb-1">Hashtags</p>
                            <p className="text-sm text-violet-400">{post.hashtags}</p>
                          </div>
                        )}
                        {post.alt_text && (
                          <div className="mb-4">
                            <p className="text-xs text-slate-400 mb-1">Alt Text</p>
                            <p className="text-sm text-slate-300">{post.alt_text}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-navy-700">
                          {post.visual_html && (
                            <button
                              onClick={() => downloadImage(post)}
                              className="flex items-center gap-1.5 text-xs font-medium text-white bg-navy-800 hover:bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 transition"
                            >
                              <Download size={12} /> Download PNG
                            </button>
                          )}
                          <button
                            onClick={() => copyCaption(post)}
                            className="flex items-center gap-1.5 text-xs font-medium text-white bg-navy-800 hover:bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 transition"
                          >
                            {copiedId === post.id ? (
                              <><Check size={12} /> Copied!</>
                            ) : (
                              <><Copy size={12} /> Copy Caption</>
                            )}
                          </button>
                          {post.status !== "posted" && (
                            <button
                              onClick={() => updatePostStatus(post.id, "posted")}
                              className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg px-3 py-2 transition"
                            >
                              <Check size={12} /> Mark as Posted
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this post?")) {
                                deletePost(post.id);
                              }
                            }}
                            disabled={deletingId === post.id}
                            className="flex items-center gap-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg px-3 py-2 transition ml-auto"
                          >
                            {deletingId === post.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Trash2 size={12} />
                            )}
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
