"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";
import type { OnboardingState } from "./page";

interface Props {
  data: OnboardingState;
  updateData: (partial: Partial<OnboardingState>) => void;
}

export default function StepBrandKit({ data, updateData }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      updateData({
        logoFile: file,
        logoPreview: ev.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  }

  function removeLogo() {
    updateData({ logoFile: null, logoPreview: "" });
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Brand Kit</h2>
      <p className="text-slate-400 text-sm mb-6">
        Upload your logo and set your brand colours. These will be used across
        all your generated social media content.
      </p>

      {/* Logo upload */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Logo
        </label>
        {data.logoPreview ? (
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-xl border-2 border-navy-600 overflow-hidden bg-navy-800">
              <img
                src={data.logoPreview}
                alt="Logo preview"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={removeLogo}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition"
            >
              <X size={14} className="text-white" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-navy-600 hover:border-green-500/40 rounded-xl p-8 flex flex-col items-center gap-3 transition group"
          >
            <div className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center group-hover:bg-green-500/10 transition">
              <Upload size={20} className="text-slate-400 group-hover:text-green-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-300">
                Click to upload your logo
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, SVG up to 5MB
              </p>
            </div>
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Colour pickers */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Brand Colours</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ColorPicker
            label="Primary"
            value={data.primaryColor}
            onChange={(c) => updateData({ primaryColor: c })}
          />
          <ColorPicker
            label="Secondary"
            value={data.secondaryColor}
            onChange={(c) => updateData({ secondaryColor: c })}
          />
          <ColorPicker
            label="Accent"
            value={data.accentColor}
            onChange={(c) => updateData({ accentColor: c })}
          />
        </div>

        {/* Preview swatch */}
        <div className="mt-4">
          <p className="text-xs text-slate-500 mb-2">Preview</p>
          <div className="flex gap-2 h-10 rounded-lg overflow-hidden">
            <div
              className="flex-1 rounded-l-lg"
              style={{ backgroundColor: data.primaryColor }}
            />
            <div className="flex-1" style={{ backgroundColor: data.secondaryColor }} />
            <div
              className="flex-1 rounded-r-lg"
              style={{ backgroundColor: data.accentColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
      <div className="flex items-center gap-2 bg-navy-800 border border-navy-600 rounded-lg px-3 py-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-white text-sm font-mono focus:outline-none uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );
}
