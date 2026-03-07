import { Star, MessageSquare, TrendingUp, Clock } from "lucide-react";

const stats = [
  { label: "Total Reviews", value: "0", icon: Star, change: "" },
  { label: "AI Replies", value: "0", icon: MessageSquare, change: "" },
  { label: "Avg Rating", value: "—", icon: TrendingUp, change: "" },
  { label: "Avg Response", value: "—", icon: Clock, change: "" },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">
          Welcome to Foxtrot. Connect your Google Business Profile to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-navy-900 border border-navy-700 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-400 text-sm">{stat.label}</span>
              <stat.icon size={18} className="text-slate-500" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-navy-900 border border-navy-700 rounded-xl p-8 text-center">
        <p className="text-slate-400">
          No reviews yet. Connect your Google Business Profile to start
          monitoring.
        </p>
      </div>
    </div>
  );
}
