"use client";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  // Idea statuses
  generated: { bg: "bg-slate-500/10", text: "text-slate-400", label: "Generated" },
  approved: { bg: "bg-violet-500/10", text: "text-violet-400", label: "Approved" },
  skipped: { bg: "bg-slate-500/10", text: "text-slate-500", label: "Skipped" },
  used: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Used" },
  // Post statuses
  draft: { bg: "bg-amber-500/10", text: "text-amber-400", label: "Draft" },
  ready: { bg: "bg-violet-500/10", text: "text-violet-400", label: "Ready" },
  posted: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Posted" },
};

// Post type badges
const POST_TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  promotional: { bg: "bg-violet-500/10", text: "text-violet-400", label: "Promotional" },
  educational: { bg: "bg-blue-500/10", text: "text-blue-400", label: "Educational" },
  behind_scenes: { bg: "bg-amber-500/10", text: "text-amber-400", label: "Behind the Scenes" },
  testimonial: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Testimonial" },
  seasonal: { bg: "bg-pink-500/10", text: "text-pink-400", label: "Seasonal" },
  offer: { bg: "bg-red-500/10", text: "text-red-400", label: "Offer" },
  engagement: { bg: "bg-cyan-500/10", text: "text-cyan-400", label: "Engagement" },
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] || POST_TYPE_STYLES[status] || {
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} ${className}`}
    >
      {style.label}
    </span>
  );
}

export function PostTypeBadge({ type, className = "" }: { type: string; className?: string }) {
  const style = POST_TYPE_STYLES[type] || {
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    label: type,
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} ${className}`}
    >
      {style.label}
    </span>
  );
}
