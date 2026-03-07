import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-sm mb-10">
            Last updated: March 7, 2026
          </p>

          <div className="prose prose-invert prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                By accessing and using Foxtrot (&quot;the Service&quot;), you accept
                and agree to be bound by these Terms of Service. If you do not
                agree to these terms, do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. Description of Service
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Foxtrot provides AI-powered Google Review management tools
                including review monitoring, AI-generated reply suggestions, and
                automated publishing capabilities. The Service integrates with
                Google Business Profile APIs to facilitate review management.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. User Accounts
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. You must provide accurate and complete information when
                creating an account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Acceptable Use
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                You agree not to misuse the Service. This includes but is not
                limited to: generating misleading or fraudulent review replies,
                violating Google&apos;s Terms of Service, using the Service for
                any unlawful purpose, or attempting to gain unauthorized access
                to any part of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. AI-Generated Content
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                The Service uses artificial intelligence to generate review
                replies. You acknowledge that AI-generated content should be
                reviewed before publishing, and you are solely responsible for
                any content published through the Service on your behalf.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Billing and Payments
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Paid plans are billed monthly. You may cancel your subscription
                at any time. Refunds are handled on a case-by-case basis. Free
                trial periods do not require a credit card.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. Limitation of Liability
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                The Service is provided &quot;as is&quot; without warranties of any
                kind. We shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your
                use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                8. Contact
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                For questions about these Terms, contact us at{" "}
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
