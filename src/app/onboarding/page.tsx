"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepWebsite from "./StepWebsite";
import StepBrandKit from "./StepBrandKit";
import StepVibe from "./StepVibe";
import StepContent from "./StepContent";
import { CheckCircle2 } from "lucide-react";

export interface OnboardingState {
  // Step 1
  websiteUrl: string;
  businessName: string;
  businessDescription: string;
  industry: string;
  // Step 2
  logoFile: File | null;
  logoPreview: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  // Step 3
  vibe: string;
  // Step 4
  contentTone: string;
  targetAudience: string;
  keyServices: string;
  uniqueSellingPoints: string;
}

const stepLabels = ["Website", "Brand Kit", "Vibe", "Content"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<OnboardingState>({
    websiteUrl: "",
    businessName: "",
    businessDescription: "",
    industry: "",
    logoFile: null,
    logoPreview: "",
    primaryColor: "#22c55e",
    secondaryColor: "#0f1629",
    accentColor: "#4ade80",
    vibe: "",
    contentTone: "friendly",
    targetAudience: "",
    keyServices: "",
    uniqueSellingPoints: "",
  });

  function updateData(partial: Partial<OnboardingState>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  async function handleFinish() {
    setSaving(true);
    try {
      // Upload logo if present
      let logoUrl = "";
      if (data.logoFile) {
        const formData = new FormData();
        formData.append("file", data.logoFile);
        const uploadRes = await fetch("/api/onboarding/upload-logo", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          logoUrl = uploadData.url;
        }
      }

      // Save onboarding data
      const res = await fetch("/api/onboarding/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website_url: data.websiteUrl,
          business_name: data.businessName,
          business_description: data.businessDescription,
          industry: data.industry,
          logo_url: logoUrl,
          primary_color: data.primaryColor,
          secondary_color: data.secondaryColor,
          accent_color: data.accentColor,
          vibe: data.vibe,
          content_tone: data.contentTone,
          target_audience: data.targetAudience,
          key_services: data.keyServices
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          unique_selling_points: data.uniqueSellingPoints
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      // Error handled silently
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-10">
        {stepLabels.map((label, i) => {
          const stepNum = i + 1;
          const isActive = step === stepNum;
          const isComplete = step > stepNum;

          return (
            <div key={label} className="flex items-center gap-3 flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                    isComplete
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-green-500/20 text-green-400 ring-2 ring-green-500"
                      : "bg-navy-800 text-slate-500"
                  }`}
                >
                  {isComplete ? <CheckCircle2 size={16} /> : stepNum}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    isActive || isComplete ? "text-white" : "text-slate-500"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div
                  className={`flex-1 h-0.5 rounded-full mx-1 ${
                    isComplete ? "bg-green-500" : "bg-navy-700"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 sm:p-8">
        {step === 1 && <StepWebsite data={data} updateData={updateData} />}
        {step === 2 && <StepBrandKit data={data} updateData={updateData} />}
        {step === 3 && <StepVibe data={data} updateData={updateData} />}
        {step === 4 && <StepContent data={data} updateData={updateData} />}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy-700">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-slate-400 hover:text-white text-sm font-medium transition"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={saving}
              className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition"
            >
              {saving ? "Saving..." : "Finish Setup"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
