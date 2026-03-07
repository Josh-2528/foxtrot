"use client";

import { useState, useEffect, useRef } from "react";
import { Palette, Upload, X, Sparkles, Loader2 } from "lucide-react";
import ColorPicker from "@/components/ColorPicker";
import PostPreview from "@/components/PostPreview";
import { generateVisualHtml } from "@/lib/templates";
import type { VibeOption } from "@/lib/types";

const FONTS = [
  "Inter",
  "Montserrat",
  "Poppins",
  "Merriweather",
  "Playfair Display",
  "Space Grotesk",
];

const VIBES: { id: VibeOption; title: string; description: string }[] = [
  { id: "clean_minimal", title: "Clean & Minimal", description: "White space, simple layouts, thin fonts." },
  { id: "bold_loud", title: "Bold & Loud", description: "Big text, high contrast, punchy colours." },
  { id: "dark_premium", title: "Dark & Premium", description: "Dark backgrounds, gold/violet accents." },
  { id: "bright_fun", title: "Bright & Fun", description: "Colourful, playful, energetic." },
  { id: "earthy_natural", title: "Earthy & Natural", description: "Muted tones, organic textures, warm." },
  { id: "corporate", title: "Corporate & Professional", description: "Structured, navy/grey, formal." },
];

interface BrandKit {
  logo_url: string | null;
  primary_colour: string;
  secondary_colour: string;
  accent_colour: string;
  background_colour: string;
  text_colour: string;
  font_preference: string;
  vibe: VibeOption;
}

export default function BrandKitPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [aiDescription, setAiDescription] = useState("");
  const [aiIndustry, setAiIndustry] = useState("");
  const [brandKit, setBrandKit] = useState<BrandKit>({
    logo_url: null,
    primary_colour: "#8b5cf6",
    secondary_colour: "#0f1729",
    accent_colour: "#a78bfa",
    background_colour: "#ffffff",
    text_colour: "#111827",
    font_preference: "Inter",
    vibe: "clean_minimal",
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/brand-kit")
      .then((r) => r.json())
      .then((data) => {
        if (data.brand_kit) setBrandKit(data.brand_kit);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function updateField(field: string, value: string) {
    setBrandKit((prev) => ({ ...prev, [field]: value }));
    // Auto-save after 800ms debounce
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      saveBrandKit({ ...brandKit, [field]: value });
    }, 800);
  }

  async function saveBrandKit(data: BrandKit) {
    setSaving(true);
    try {
      await fetch("/api/brand-kit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/onboarding/upload-logo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        updateField("logo_url", data.url);
      }
    } catch (err) {
      console.error("Logo upload error:", err);
    }
  }

  async function handleAiSuggest() {
    if (!aiDescription.trim()) return;
    setSuggesting(true);
    try {
      const res = await fetch("/api/brand-kit/ai-suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: aiDescription, industry: aiIndustry }),
      });
      const data = await res.json();
      if (data.suggestion) {
        const s = data.suggestion;
        const newKit = {
          ...brandKit,
          primary_colour: s.primary_colour,
          secondary_colour: s.secondary_colour,
          accent_colour: s.accent_colour,
          background_colour: s.background_colour,
          text_colour: s.text_colour,
          font_preference: s.font_preference,
          vibe: s.vibe,
        };
        setBrandKit(newKit);
        saveBrandKit(newKit);
      }
    } catch (err) {
      console.error("AI suggest error:", err);
    } finally {
      setSuggesting(false);
    }
  }

  // Generate a sample preview HTML using current brand kit
  const previewHtml = generateVisualHtml({
    template: "text_overlay",
    headline: "Your Brand, Your Way",
    subtext: "Preview of your visual style",
    accentText: "",
    layoutVariant: 1,
    primaryColour: brandKit.primary_colour,
    secondaryColour: brandKit.secondary_colour,
    accentColour: brandKit.accent_colour,
    backgroundColour: brandKit.background_colour,
    textColour: brandKit.text_colour,
    fontPreference: brandKit.font_preference,
    vibe: brandKit.vibe,
    logoUrl: brandKit.logo_url || undefined,
    businessName: "Preview",
    postSize: "square_1080",
  });

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
          <h1 className="text-2xl font-bold text-white">Brand Kit</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your logo, colours, fonts, and visual style.
          </p>
        </div>
        {saving && (
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Loader2 size={12} className="animate-spin" /> Saving...
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column: controls */}
        <div className="xl:col-span-2 space-y-6">
          {/* AI Vibe Assistant */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-violet-400" />
              <h3 className="text-sm font-semibold text-white">AI Vibe Assistant</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Describe your business and we&apos;ll suggest colours, fonts, and a visual style.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                value={aiDescription}
                onChange={(e) => setAiDescription(e.target.value)}
                placeholder="e.g. Modern yoga studio with a calm, earthy feel"
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  value={aiIndustry}
                  onChange={(e) => setAiIndustry(e.target.value)}
                  placeholder="Industry (optional)"
                  className="flex-1 bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm"
                />
                <button
                  onClick={handleAiSuggest}
                  disabled={suggesting || !aiDescription.trim()}
                  className="bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition flex items-center gap-2"
                >
                  {suggesting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Sparkles size={14} />
                  )}
                  Generate Brand
                </button>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Logo</h3>
            {brandKit.logo_url ? (
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-xl border-2 border-navy-600 overflow-hidden bg-navy-800">
                  <img
                    src={brandKit.logo_url}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  onClick={() => updateField("logo_url", "")}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-navy-600 hover:border-violet-500/40 rounded-xl p-8 flex flex-col items-center gap-3 transition group"
              >
                <div className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center group-hover:bg-violet-500/10 transition">
                  <Upload size={20} className="text-slate-400 group-hover:text-violet-400" />
                </div>
                <p className="text-sm text-slate-400">Click to upload your logo</p>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>

          {/* Colours */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Brand Colours</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <ColorPicker label="Primary" value={brandKit.primary_colour} onChange={(c) => updateField("primary_colour", c)} />
              <ColorPicker label="Secondary" value={brandKit.secondary_colour} onChange={(c) => updateField("secondary_colour", c)} />
              <ColorPicker label="Accent" value={brandKit.accent_colour} onChange={(c) => updateField("accent_colour", c)} />
              <ColorPicker label="Background" value={brandKit.background_colour} onChange={(c) => updateField("background_colour", c)} />
              <ColorPicker label="Text" value={brandKit.text_colour} onChange={(c) => updateField("text_colour", c)} />
            </div>
          </div>

          {/* Font */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Font</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FONTS.map((font) => (
                <button
                  key={font}
                  onClick={() => updateField("font_preference", font)}
                  className={`text-left rounded-lg border p-4 transition ${
                    brandKit.font_preference === font
                      ? "border-violet-500 bg-violet-500/5"
                      : "border-navy-600 hover:border-navy-500 bg-navy-800"
                  }`}
                >
                  <p className="text-lg font-bold text-white mb-1" style={{ fontFamily: font }}>
                    {font}
                  </p>
                  <p className="text-xs text-slate-400" style={{ fontFamily: font }}>
                    The quick brown fox
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Vibe */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Visual Style</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {VIBES.map((vibe) => (
                <button
                  key={vibe.id}
                  onClick={() => updateField("vibe", vibe.id)}
                  className={`text-left rounded-lg border p-4 transition ${
                    brandKit.vibe === vibe.id
                      ? "border-violet-500 bg-violet-500/5"
                      : "border-navy-600 hover:border-navy-500 bg-navy-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Palette size={14} className={brandKit.vibe === vibe.id ? "text-violet-400" : "text-slate-400"} />
                    <p className={`text-sm font-semibold ${brandKit.vibe === vibe.id ? "text-violet-400" : "text-white"}`}>
                      {vibe.title}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">{vibe.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: live preview */}
        <div className="xl:col-span-1">
          <div className="sticky top-8">
            <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Live Preview</h3>
              <PostPreview
                html={previewHtml}
                postSize="square_1080"
                className="mx-auto"
              />
              <p className="text-xs text-slate-400 text-center mt-4">
                This preview updates as you change your brand settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
