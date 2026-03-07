import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Star,
  Zap,
  Shield,
  BarChart3,
  MessageSquareText,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: MessageSquareText,
    title: "AI-Crafted Replies",
    description:
      "Claude generates genuine, on-brand responses that sound like you — not a chatbot.",
  },
  {
    icon: Zap,
    title: "Auto-Publish",
    description:
      "Set it and forget it. Positive reviews get replied to instantly while you focus on running your wash.",
  },
  {
    icon: Star,
    title: "Smart Monitoring",
    description:
      "Every new review lands in your dashboard. No more checking Google manually.",
  },
  {
    icon: Shield,
    title: "Negative Review Alerts",
    description:
      "1-star review? You'll know immediately with instant email alerts and a thoughtful draft ready.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track your rating trends, response times, and review volume across all locations.",
  },
  {
    icon: Clock,
    title: "Multi-Location",
    description:
      "Manage up to 3 locations from one dashboard. Each with its own AI voice and settings.",
  },
];

const steps = [
  {
    step: "01",
    title: "Connect Google",
    description: "Link your Google Business Profile in two clicks. We handle the OAuth.",
  },
  {
    step: "02",
    title: "Set Your Voice",
    description:
      "Tell us your tone, key phrases, and contact info. The AI adapts to your brand.",
  },
  {
    step: "03",
    title: "Sit Back",
    description:
      "Reviews get detected, AI replies drafted, and published — automatically or with your approval.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-400/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              AI-Powered Review Management
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            Your Google reviews,
            <br />
            <span className="text-green-400">handled.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stop spending hours replying to reviews. Foxtrot monitors your Google
            Business Profile, crafts genuine AI replies, and publishes them — so you
            can focus on running your car wash.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl px-8 py-3.5 text-lg transition flex items-center justify-center gap-2 group"
            >
              Start Free Trial
              <ArrowRight
                size={20}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto border border-navy-600 hover:border-navy-500 text-slate-300 hover:text-white font-semibold rounded-xl px-8 py-3.5 text-lg transition text-center"
            >
              View Pricing
            </Link>
          </div>

          <p className="mt-4 text-slate-500 text-sm">
            14-day free trial &middot; No credit card required
          </p>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-navy-800 bg-navy-900/50">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">500+</p>
            <p className="text-slate-400 text-sm">Reviews managed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">4.8</p>
            <p className="text-slate-400 text-sm">Average rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">&lt;2min</p>
            <p className="text-slate-400 text-sm">Response time</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="text-slate-400 text-sm">Car washes</p>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Everything you need to manage reviews
            </h2>
            <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
              From monitoring to publishing, Foxtrot handles the entire review
              lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-navy-900 border border-navy-700 rounded-2xl p-6 hover:border-green-500/30 transition group"
              >
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition">
                  <feature.icon size={20} className="text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-navy-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Up and running in minutes
            </h2>
            <p className="mt-4 text-slate-400 text-lg">
              Three steps to automated review management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="text-5xl font-bold text-green-500/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to automate your reviews?
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            Join car wash operators who save hours every week with AI-powered
            review replies.
          </p>

          <div className="mt-8 space-y-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl px-8 py-3.5 text-lg transition group"
            >
              Start Your Free Trial
              <ArrowRight
                size={20}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-400" />
                14-day free trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-400" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
