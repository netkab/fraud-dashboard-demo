import { Sparkles, AlertTriangle } from "lucide-react";

export const riskBadgeClasses = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
};

export const regionStatusBadges = {
  opportunity: "bg-sky-50 text-sky-700",
  watch: "bg-amber-50 text-amber-700",
  alert: "bg-rose-50 text-rose-700",
  stable: "bg-emerald-50 text-emerald-700",
};

export const insightVariants = {
  alert: {
    gradient:
      "from-amber-50/80 via-white to-white dark:from-amber-900/30 dark:via-slate-900 dark:to-slate-900",
    border: "border-amber-100",
    ring: "ring-amber-200",
    badge: "bg-amber-100/80 text-amber-700",
    dot: "bg-amber-500/80",
    iconBg: "bg-amber-100/70 text-amber-600",
    icon: AlertTriangle,
    button:
      "border-amber-200/70 text-amber-700 bg-white/70 hover:bg-amber-50/60",
    glow: "via-amber-100/20",
    highlight: "text-amber-700",
  },
  opportunity: {
    gradient:
      "from-emerald-50/80 via-white to-white dark:from-emerald-900/25 dark:via-slate-900 dark:to-slate-900",
    border: "border-emerald-100",
    ring: "ring-emerald-200",
    badge: "bg-emerald-100/80 text-emerald-700",
    dot: "bg-emerald-500/80",
    iconBg: "bg-emerald-100/70 text-emerald-600",
    icon: Sparkles,
    button:
      "border-emerald-200/70 text-emerald-700 bg-white/70 hover:bg-emerald-50/60",
    glow: "via-emerald-100/20",
    highlight: "text-emerald-700",
  },
};

export const getInsightStyles = (type, isSelected) => {
  const variant = insightVariants[type] ?? insightVariants.opportunity;
  return {
    card: `rounded-3xl border ${variant.border} bg-gradient-to-br ${variant.gradient} shadow-sm hover:shadow-lg ${
      isSelected ? `ring-2 ${variant.ring} ring-offset-2 ring-offset-white` : ""
    }`,
    badge: variant.badge,
    dot: variant.dot,
    iconBg: variant.iconBg,
    glow: variant.glow,
    button: variant.button,
    highlight: variant.highlight,
    icon: variant.icon,
  };
};

export const formatVolume = (value = 0) => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M tx`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}k tx`;
  }
  if (!value) {
    return "—";
  }
  return `${value.toLocaleString()} tx`;
};

export const getVolumeShare = (volume = 0, total = 0) => {
  if (!total) {
    return 0;
  }
  return (volume / total) * 100;
};

export const getSparklinePath = (points = []) => {
  if (!points.length) {
    return "M0,12 L56,12";
  }
  const max = Math.max(...points);
  const min = Math.min(...points);
  if (max === min) {
    return "M0,12 L56,12";
  }
  return points
    .map((value, index) => {
      const x = (index / ((points.length - 1) || 1)) * 56;
      const ratio = (value - min) / (max - min || 1);
      const y = 20 - ratio * 16;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
};

export const formatLabel = (value = "") =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const getTrendBadgeClass = (trend = "") => {
  const normalized = trend.toLowerCase();
  if (!trend || normalized.includes("stable")) {
    return "bg-slate-100 text-slate-500";
  }
  if (trend.trim().startsWith("-") || normalized.includes("↓")) {
    return "bg-rose-50 text-rose-600";
  }
  return "bg-emerald-50 text-emerald-700";
};

export const getRegionStatusBadge = (status) =>
  regionStatusBadges[status] ?? "bg-slate-100 text-slate-600";

export const getFeedbackKey = (prefix, title) => `${prefix}-${title}`;
export const getInsightNoteKey = (title) => `trend-note-${title}`;
