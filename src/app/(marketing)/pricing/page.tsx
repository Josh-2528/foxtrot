import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out Foxtrot with a single location.",
    cta: "Get Started",
    ctaHref: "/signup",
    highlighted: false,
    features: [
      "1 Google Business location",
      "AI-generated reply drafts",
      "Manual publish only",
      "Email notifications",
      "7-day review history",
    ],
  },
  {
    name: "Pro",
    price: "$88",
    period: "/month",
    description: "Everything you need for serious review management.",
    cta: "Start Free Trial",
    ctaHref: "/signup",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Up to 3 locations",
      "AI-generated replies",
      "Smart auto-publish (4-5 stars)",
      "Negative review alerts",
      "Custom AI voice & tone",
      "Performance analytics",
      "Priority email support",
      "Unlimited review history",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For multi-location operators with 4+ car washes.",
    cta: "Contact Us",
    ctaHref: "mailto:admin@carwashai.com.au",
    highlighted: false,
    features: [
      "Unlimited locations",
      "Everything in Pro",
      "Dedicated account manager",
      "Custom API integrations",
      "Advanced analytics & reporting",
      "SLA guarantee",
      "White-label option",
      "Phone support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
              Start free, upgrade when you&apos;re ready. No hidden fees, no
              contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? "bg-navy-900 border-2 border-green-500 ring-1 ring-green-500/20"
                    : "bg-navy-900 border border-navy-700"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-green-500 text-white text-xs font-semibold rounded-full px-3 py-1">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-400 text-sm">
                      {plan.period}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-400 text-sm">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-green-400 mt-0.5 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className={`block text-center font-semibold rounded-lg px-4 py-2.5 transition ${
                    plan.highlighted
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "border border-navy-600 hover:border-navy-500 text-slate-300 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-400 text-sm">
              All paid plans include a 14-day free trial. No credit card
              required.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
