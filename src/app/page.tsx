import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Image,
  Type,
  CalendarDays,
  Palette,
  Layers,
  Wand2,
  ChevronDown,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Add Your Brand",
    description:
      "Drop in your website link. Foxtrot pulls your colours, logo, and vibe automatically.",
  },
  {
    step: "02",
    title: "Pick Your Style",
    description:
      "Choose a visual style that matches your brand. Clean, bold, dark, bright — you decide.",
  },
  {
    step: "03",
    title: "Generate Ideas",
    description:
      "AI creates a month of post ideas based on your business. Approve the ones you like.",
  },
  {
    step: "04",
    title: "Download & Post",
    description:
      "Foxtrot creates the visuals and writes the captions. Download and post.",
  },
];

const features = [
  {
    icon: Image,
    title: "AI Graphic Posts",
    description: "Professional visuals without a designer.",
  },
  {
    icon: Layers,
    title: "Photo Overlays",
    description: "Upload a photo, Foxtrot adds your branding.",
  },
  {
    icon: Type,
    title: "Smart Captions",
    description: "AI-written captions that don't sound like AI.",
  },
  {
    icon: CalendarDays,
    title: "Content Calendar",
    description: "See your whole month at a glance.",
  },
  {
    icon: Palette,
    title: "Brand Consistency",
    description: "Every post matches your colours, fonts, and vibe.",
  },
  {
    icon: Wand2,
    title: "Batch Generation",
    description: "Create a week of content in one click.",
  },
];

const faqs = [
  {
    q: "Will the posts look generic?",
    a: "No. Foxtrot uses your brand colours, logo, fonts, and visual style. Every post is unique to your business.",
  },
  {
    q: "Can I edit the posts after they're generated?",
    a: "Yes. Edit the text, colours, caption, hashtags — or regenerate the whole thing with one click.",
  },
  {
    q: "Do I need design skills?",
    a: "None. Foxtrot handles the design. You just approve and post.",
  },
  {
    q: "What if I have my own photos?",
    a: "Upload them. Foxtrot adds your branding, text overlays, and frames to make them post-ready.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no lock-in.",
  },
  {
    q: "Does it post to Instagram for me?",
    a: "Right now you download and post manually. Auto-posting is coming soon.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      {/* ── HERO (dark navy) ── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-400/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              <span className="text-violet-400 text-sm font-medium">
                AI-Powered Content Creation
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Your Social Media.
              <br />
              Created By AI.
              <br />
              <span className="text-violet-400">On Brand. Every Time.</span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 max-w-lg leading-relaxed">
              Foxtrot generates ready-to-post content for your business —
              visuals, captions, hashtags, and all. Set up your brand once, get
              weeks of content in minutes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl px-8 py-3.5 text-lg transition flex items-center justify-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <a
                href="#demo"
                className="w-full sm:w-auto border border-navy-600 hover:border-navy-500 text-slate-300 hover:text-white font-semibold rounded-xl px-8 py-3.5 text-lg transition text-center"
              >
                See It In Action
              </a>
            </div>

            <p className="mt-4 text-slate-500 text-sm">
              14-day free trial &middot; No credit card required
            </p>
          </div>

          {/* Right — phone mockup */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-72">
              {/* Phone frame */}
              <div className="bg-navy-800 rounded-[2.5rem] p-3 border border-navy-600 shadow-2xl">
                <div className="bg-navy-900 rounded-[2rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="h-6 bg-navy-900 flex items-center justify-center">
                    <div className="w-20 h-1.5 bg-navy-700 rounded-full" />
                  </div>
                  {/* "Instagram feed" mock */}
                  <div className="space-y-3 p-3">
                    {/* Post 1 — clean minimal */}
                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                      <div className="w-8 h-8 bg-violet-500 rounded-lg mx-auto mb-2" />
                      <div className="h-2 w-24 bg-slate-800 rounded-full mx-auto" />
                      <div className="h-1.5 w-32 bg-slate-300 rounded-full mx-auto mt-2" />
                      <div className="h-1.5 w-28 bg-slate-300 rounded-full mx-auto mt-1" />
                    </div>
                    {/* Post 2 — bold */}
                    <div className="bg-neutral-900 rounded-xl p-4">
                      <div className="h-3 w-20 bg-red-500 rounded-full" />
                      <div className="h-1.5 w-full bg-neutral-700 rounded-full mt-2" />
                      <div className="h-1.5 w-3/4 bg-neutral-700 rounded-full mt-1" />
                      <div className="h-6 w-16 bg-red-500 rounded mt-3" />
                    </div>
                    {/* Post 3 — earthy */}
                    <div className="bg-amber-50 rounded-xl p-4">
                      <div className="h-2 w-16 bg-amber-700 rounded-full" />
                      <div className="h-1.5 w-full bg-amber-200 rounded-full mt-2" />
                      <div className="h-1.5 w-2/3 bg-amber-200 rounded-full mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (white section) ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              From Zero to a Month of Content in 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="text-5xl font-bold text-violet-500/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE DEMO SECTION (light grey) ── */}
      <section id="demo" className="py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              See What Foxtrot Creates
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              These were all generated by Foxtrot in under 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example post 1 — Clean vibe */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="aspect-square bg-slate-50 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-violet-500 rounded-xl mb-4" />
                <h3 className="text-lg font-bold text-gray-900">
                  Fresh Starts Every Morning
                </h3>
                <p className="text-sm text-gray-500 mt-2 px-4">
                  Our doors open at 6am — coffee&apos;s on us for early birds.
                </p>
                <div className="mt-4 h-7 w-24 bg-violet-500 rounded-lg" />
              </div>
              <div className="p-4 border-t border-gray-100">
                <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded">
                  Graphic Post
                </span>
                <span className="text-xs text-gray-400 ml-2">Clean & Minimal</span>
              </div>
            </div>

            {/* Example post 2 — Bold vibe */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="aspect-square bg-neutral-900 p-8 flex flex-col items-start justify-end">
                <div className="text-3xl font-black text-white leading-tight">
                  50% OFF
                  <br />
                  <span className="text-red-500">THIS WEEK</span>
                </div>
                <p className="text-sm text-neutral-400 mt-2">
                  Full detail package — book before Sunday.
                </p>
              </div>
              <div className="p-4 border-t border-gray-100">
                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                  Promotional
                </span>
                <span className="text-xs text-gray-400 ml-2">Bold & Loud</span>
              </div>
            </div>

            {/* Example post 3 — Dark premium */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="aspect-square bg-gray-900 p-8 flex flex-col items-center justify-center text-center">
                <div className="text-amber-400 text-4xl mb-3">&ldquo;</div>
                <p className="text-white text-sm italic leading-relaxed px-2">
                  Best service in town. Can&apos;t recommend them enough.
                </p>
                <div className="mt-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-amber-400 rounded-full" />
                  ))}
                </div>
                <p className="text-amber-400/60 text-xs mt-2">— Sarah M.</p>
              </div>
              <div className="p-4 border-t border-gray-100">
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  Testimonial
                </span>
                <span className="text-xs text-gray-400 ml-2">Dark & Premium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES (white) ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything You Need. Nothing You Don&apos;t.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition group"
              >
                <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-100 transition">
                  <feature.icon size={20} className="text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING (white) ── */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Starter */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">Starter</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {[
                  "15 posts per month",
                  "AI graphic posts",
                  "Basic caption generation",
                  "1 brand kit",
                  "Download images + copy captions",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-8 block text-center border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-lg px-4 py-2.5 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="relative bg-white border-2 border-violet-500 ring-1 ring-violet-500/20 rounded-2xl p-8 flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-violet-500 text-white text-xs font-semibold rounded-full px-3 py-1">
                  Most Popular
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">$49</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {[
                  "Unlimited posts",
                  "AI graphic + photo-based posts",
                  "Full caption customisation",
                  "Content calendar",
                  "Batch generation",
                  "1 brand kit",
                  "Priority generation",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-8 block text-center bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg px-4 py-2.5 transition"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Agency */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">Agency</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {[
                  "Everything in Pro",
                  "Up to 5 brand kits",
                  "Team access",
                  "White-label exports",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-8 block text-center border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-lg px-4 py-2.5 transition"
              >
                Get Started
              </Link>
            </div>
          </div>

          <p className="mt-10 text-center text-gray-400 text-sm">
            Pro plan includes a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* ── FAQ (light grey) ── */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-gray-900 font-medium text-sm hover:bg-gray-50 transition list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown
                    size={18}
                    className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4"
                  />
                </summary>
                <div className="px-6 pb-4 text-gray-500 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (dark navy) ── */}
      <section className="py-24 px-4 bg-navy-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Stop Staring at a Blank Feed.
          </h2>
          <p className="mt-4 text-slate-400 text-lg">
            Start your free trial and have a week of content ready in 10
            minutes.
          </p>

          <div className="mt-8 space-y-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl px-8 py-3.5 text-lg transition group"
            >
              Start Free Trial
              <ArrowRight
                size={20}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-violet-400" />
                14-day free trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-violet-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-violet-400" />
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
