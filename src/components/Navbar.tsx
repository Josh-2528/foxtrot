"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/80 backdrop-blur-lg border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">
              fox<span className="text-green-400">trot</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-slate-300 hover:text-white text-sm font-medium transition"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-slate-300 hover:text-white text-sm font-medium transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg px-4 py-2 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-900 border-t border-navy-800">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-white text-sm font-medium py-2"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-white text-sm font-medium py-2"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="block bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg px-4 py-2.5 text-center transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
