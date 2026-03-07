import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <span className="text-2xl font-bold text-white">
              fox<span className="text-green-400">trot</span>
            </span>
            <p className="text-slate-400 text-sm mt-3 max-w-md">
              AI-powered social media content creation for businesses. Visuals,
              captions, hashtags — all on brand, every time.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#demo"
                  className="text-slate-400 hover:text-white text-sm transition"
                >
                  Features
                </a>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-400 hover:text-white text-sm transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-slate-400 hover:text-white text-sm transition"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-white text-sm transition"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-400 hover:text-white text-sm transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-10 pt-6 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Obvitech Pty Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
