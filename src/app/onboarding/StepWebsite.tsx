"use client";

import { useState } from "react";
import { Globe, Loader2, Sparkles } from "lucide-react";
import type { OnboardingState } from "./page";

interface Props {
  data: OnboardingState;
  updateData: (partial: Partial<OnboardingState>) => void;
}

export default function StepWebsite({ data, updateData }: Props) {
  const [scraping, setScraping] = useState(false);
  const [scraped, setScraped] = useState(false);
  const [error, setError] = useState("");

  async function handleScrape() {
    if (!data.websiteUrl) return;
    setScraping(true);
    setError("");

    try {
      const res = await fetch("/api/onboarding/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: data.websiteUrl }),
      });

      if (!res.ok) throw new Error("Failed to scrape");

      const result = await res.json();
      updateData({
        businessName: result.business_name || "",
        businessDescription: result.description || "",
        industry: result.industry || "",
        primaryColor: result.colors?.[0] || data.primaryColor,
        secondaryColor: result.colors?.[1] || data.secondaryColor,
        accentColor: result.colors?.[2] || data.accentColor,
      });
      setScraped(true);
    } catch {
      setError("Could not analyze that website. You can fill in the details manually below.");
    } finally {
      setScraping(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">
        Tell us about your business
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        Enter your website URL and we&apos;ll use AI to pre-fill your details,
        or skip to fill in manually.
      </p>

      {/* URL input with scrape button */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Website URL
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="url"
              value={data.websiteUrl}
              onChange={(e) => updateData({ websiteUrl: e.target.value })}
              placeholder="https://yourbusiness.com.au"
              className="w-full bg-navy-800 border border-navy-600 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition text-sm"
            />
          </div>
          <button
            onClick={handleScrape}
            disabled={scraping || !data.websiteUrl}
            className="bg-green-500/10 hover:bg-green-500/20 disabled:opacity-50 text-green-400 font-medium rounded-lg px-4 py-2.5 text-sm transition flex items-center gap-2 shrink-0"
          >
            {scraping ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Sparkles size={16} />
            )}
            {scraping ? "Analyzing..." : "AI Scrape"}
          </button>
        </div>
        {error && (
          <p className="text-amber-400 text-xs mt-2">{error}</p>
        )}
        {scraped && !error && (
          <p className="text-green-400 text-xs mt-2">
            Details pre-filled from your website. Review and adjust below.
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Business Name
          </label>
          <input
            type="text"
            value={data.businessName}
            onChange={(e) => updateData({ businessName: e.target.value })}
            placeholder="Your Business Name"
            className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Business Description
          </label>
          <textarea
            value={data.businessDescription}
            onChange={(e) =>
              updateData({ businessDescription: e.target.value })
            }
            rows={3}
            placeholder="Tell us what your business does..."
            className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition text-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Industry
          </label>
          <select
            value={data.industry}
            onChange={(e) => updateData({ industry: e.target.value })}
            className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition text-sm"
          >
            <option value="">Select an industry</option>
            <option value="cafe_restaurant">Cafe / Restaurant</option>
            <option value="gym_fitness">Gym / Fitness</option>
            <option value="salon_beauty">Salon / Beauty</option>
            <option value="trades">Trades / Home Services</option>
            <option value="retail">Retail / E-Commerce</option>
            <option value="car_wash">Car Wash / Automotive</option>
            <option value="health_wellness">Health / Wellness</option>
            <option value="professional_services">Professional Services</option>
            <option value="real_estate">Real Estate</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
