"use client";

import { Settings, User, Bell, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your account, preferences, and billing.
        </p>
      </div>

      <div className="space-y-6">
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
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                disabled
                placeholder="you@example.com"
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-slate-400 text-sm cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-1">
                Contact support to change your email.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                placeholder="Your Business"
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition text-sm"
              />
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
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Caption Tone
              </label>
              <select className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition text-sm">
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Posting Frequency
              </label>
              <select className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition text-sm">
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

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-white">
                  New content ready
                </p>
                <p className="text-xs text-slate-400">
                  Get notified when new posts are generated
                </p>
              </div>
              <div className="w-10 h-6 bg-violet-500 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-white">
                  Weekly summary
                </p>
                <p className="text-xs text-slate-400">
                  Receive a weekly content performance summary
                </p>
              </div>
              <div className="w-10 h-6 bg-violet-500 rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
              </div>
            </label>
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
              <p className="text-sm font-medium text-white">Free Trial</p>
              <p className="text-xs text-slate-400">
                14 days remaining
              </p>
            </div>
            <button className="bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg px-4 py-2 text-sm transition">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
