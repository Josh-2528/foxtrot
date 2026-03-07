import Link from "next/link";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-950">
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/80 backdrop-blur-lg border-b border-navy-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center">
          <Link href="/">
            <span className="text-xl font-bold text-white">
              fox<span className="text-green-400">trot</span>
            </span>
          </Link>
        </div>
      </header>
      <main className="pt-14">{children}</main>
    </div>
  );
}
