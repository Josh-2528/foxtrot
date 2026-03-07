import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm mb-10">
            Last updated: March 7, 2026
          </p>

          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Information We Collect
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                We collect information you provide when creating an account
                (name, email, password), data from your connected Google
                Business Profile (reviews, business information), and usage data
                to improve the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                We use your information to provide and improve the Service,
                generate AI review replies, send notifications about new
                reviews, process payments, and communicate with you about your
                account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Data Sharing
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                We do not sell your personal information. We share data with
                third-party service providers only as necessary to operate the
                Service: Supabase (database), Anthropic (AI processing), Stripe
                (payments), Resend (email), and Google (Business Profile API).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. AI Processing
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Review content is sent to Anthropic&apos;s Claude API to
                generate reply suggestions. This data is processed according to
                Anthropic&apos;s data usage policies and is not used to train AI
                models.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Data Security
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                We implement industry-standard security measures to protect
                your data, including encryption in transit and at rest,
                row-level security policies, and secure authentication via
                Supabase Auth.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Data Retention
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                We retain your data for as long as your account is active. Upon
                account deletion, we will remove your personal data within 30
                days, except where retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. Your Rights
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                You have the right to access, correct, or delete your personal
                information. You may export your data or request account
                deletion at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                8. Contact
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                For privacy-related inquiries, contact us at{" "}
                <a
                  href="mailto:admin@carwashai.com.au"
                  className="text-green-400 hover:text-green-300"
                >
                  admin@carwashai.com.au
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
