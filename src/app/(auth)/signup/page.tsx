"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/onboarding");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white">
              fox<span className="text-violet-400">trot</span>
            </h1>
          </Link>
          <p className="text-slate-400 mt-2">Create your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-navy-900 border border-navy-700 rounded-2xl p-8 space-y-5"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-2.5 pr-10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition"
                placeholder="Min. 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-2.5 transition flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Create Account
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-violet-400 hover:text-violet-300 font-medium"
            >
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-slate-500">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-slate-400 hover:text-slate-300 underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-slate-400 hover:text-slate-300 underline">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
