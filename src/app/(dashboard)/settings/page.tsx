"use client";

import { useState, useEffect } from "react";
import { Settings, User, Bell, CreditCard, Loader2, Building2 } from "lucide-react";
import Toggle from "@/components/Toggle";

interface UserProfile {
  email: string;
  business_name: string | null;
  website_url: string | null;
  industry: string | null;
  business_description: string | null;
  key_services: string | null;
  posting_frequency: string;
  caption_style: string;
  caption_tone: string;
  default_cta: string;
  default_hashtags: string | null;
  email_new_content: boolean;
  email_weekly_summary: boolean;
  plan_id: string;
  trial_started_at: string | null;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    email: "",
    business_name: "",
    website_url: "",
    industry: "",
    business_description: "",
    key_services: "",
    posting_frequency: "3_week",
    caption_style: "medium",
    caption_tone: "casual",
    default_cta: "Link in bio",
    default_hashtags: "",
    email_new_content: true,
    email_weekly_summary: true,
    plan_id: "trial",
    trial_started_at: null,
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setProfile(data.user);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function updateField(field: string, value: unknown) {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: profile.business_name,
          website_url: profile.website_url,
          industry: profile.industry,
          business_description: profile.business_description,
          key_services: profile.key_services,
          posting_frequency: profile.posting_frequency,
          caption_style: profile.caption_style,
          caption_tone: profile.caption_tone,
          default_cta: profile.default_cta,
          default_hashtags: profile.default_hashtags,
          email_new_content: profile.email_new_content,
          email_weekly_summary: profile.email_weekly_summary,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  }

  // Calculate trial days remaining
  const trialDaysLeft = profile.trial_started_at
    ? Math.max(
        0,
        14 -
          Math.floor(
            (Date.now() - new Date(profile.trial_started_at).getTime()) /
              (1000 * 60 * 60 * 24)
          )
      )
    : 14;

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
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your account, business info, preferences, and billing.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition flex items-center gap-2"
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : saved ? (
            "Saved!"
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Account */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center">
              <User size={16} className="text-violet-400" />
            </div>
            <h3 className="font-semibold text-white">Account</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                disabled
                value={profile.email}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-slate-400 text-sm cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-1">Contact support to change your email.</p>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center">
              <Building2 size={16} className="text-violet-400" />
            </div>
            <h3 className="font-semibold text-white">Business Info</h3>
          </div>
          <p className="text-xs text-slate-400 mb-5">
            This information helps the AI generate better, more relevant content for your business.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Business Name</label>
                <input
                  type="text"
                  value={profile.business_name || ""}
                  onChange={(e) => updateField("business_name", e.target.value)}
                  placeholder="Your Business"
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Website</label>
                <input
                  type="url"
                  value={profile.website_url || ""}
                  onChange={(e) => updateField("website_url", e.target.value)}
                  placeholder="https://yourbusiness.com.au"
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Industry</label>
              <select
                value={profile.industry || ""}
                onChange={(e) => updateField("industry", e.target.value)}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm"
              >
                <option value="">Select an industry</option>
                <option value="car_wash_self_serve">Car Wash — Self-Serve</option>
                <option value="car_wash_full_service">Car Wash — Full Service</option>
                <option value="car_wash_express">Car Wash — Express</option>
                <option value="car_wash_detailing">Car Wash — Detailing</option>
                <option value="car_wash_multi">Car Wash — Multi-Location</option>
                <option value="auto_service">Auto Service</option>
                <option value="retail">Retail</option>
                <option value="hospitality">Hospitality</option>
                <option value="health_wellness">Health & Wellness</option>
                <option value="professional_services">Professional Services</option>
                <option value="trades">Trades & Construction</option>
                <option value="food_beverage">Food & Beverage</option>
                <option value="beauty">Beauty & Personal Care</option>
                <option value="fitness">Fitness & Sport</option>
                <option value="education">Education</option>
                <option value="technology">Technology</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Business Description</label>
              <textarea
                value={profile.business_description || ""}
                onChange={(e) => updateField("business_description", e.target.value)}
                placeholder="What does your business do? Describe it in 1-3 sentences."
                rows={3}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Key Services / Products</label>
              <textarea
                value={profile.key_services || ""}
                onChange={(e) => updateField("key_services", e.target.value)}
                placeholder="e.g. Express wash, Full detail, Interior clean, Ceramic coating"
                rows={2}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm resize-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                Comma-separated list of your main services or products. The AI uses these to generate more targeted content.
              </p>
            </div>
          </div>
        </div>

        {/* Content Preferences */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center">
              <Settings size={16} className="text-violet-400" />
            </div>
            <h3 className="font-semibold text-white">Content Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Caption Style</label>
                <select
                  value={profile.caption_style}
                  onChange={(e) => updateField("caption_style", e.target.value)}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm"
                >
                  <option value="short">Short & Sharp</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long & Detailed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Caption Tone</label>
                <select
                  value={profile.caption_tone}
                  onChange={(e) => updateField("caption_tone", e.target.value)}
                  className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="witty">Witty</option>
                  <option value="motivational">Motivational</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Default CTA</label>
              <input
                type="text"
                value={profile.default_cta || ""}
                onChange={(e) => updateField("default_cta", e.target.value)}
                placeholder="Link in bio"
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Default Hashtags</label>
              <textarea
                value={profile.default_hashtags || ""}
                onChange={(e) => updateField("default_hashtags", e.target.value)}
                placeholder="#yourbrand #yourindustry"
                rows={2}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Posting Frequency</label>
              <select
                value={profile.posting_frequency}
                onChange={(e) => updateField("posting_frequency", e.target.value)}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 text-sm"
              >
                <option value="3_week">3 posts per week</option>
                <option value="5_week">5 posts per week</option>
                <option value="daily">Daily</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center">
              <Bell size={16} className="text-violet-400" />
            </div>
            <h3 className="font-semibold text-white">Notifications</h3>
          </div>
          <div className="space-y-5">
            <Toggle
              enabled={profile.email_new_content}
              onChange={(v) => updateField("email_new_content", v)}
              label="New content ready"
              description="Get notified when new posts are generated"
            />
            <Toggle
              enabled={profile.email_weekly_summary}
              onChange={(v) => updateField("email_weekly_summary", v)}
              label="Weekly summary"
              description="Receive a weekly content performance summary"
            />
          </div>
        </div>

        {/* Billing */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-violet-500/10 rounded-lg flex items-center justify-center">
              <CreditCard size={16} className="text-violet-400" />
            </div>
            <h3 className="font-semibold text-white">Billing</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white capitalize">
                {profile.plan_id === "trial" ? "Free Trial" : profile.plan_id} Plan
              </p>
              {profile.plan_id === "trial" && (
                <p className="text-xs text-slate-400">
                  {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} remaining
                </p>
              )}
            </div>
            {profile.plan_id === "trial" && (
              <button className="bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg px-4 py-2 text-sm transition">
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
