import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./components/ui/tabs";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Activity,
  Info,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Moon,
  Sun,
} from "lucide-react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const [selectedInsight, setSelectedInsight] = useState(null);
  const [feedbackForms, setFeedbackForms] = useState({});

  const getFeedbackKey = (prefix, title) => `${prefix}-${title}`;

  const toggleFeedbackForm = (key, sentiment) => {
    setFeedbackForms((prev) => {
      const current = prev[key];
      if (current && current.sentiment === sentiment) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }
      return {
        ...prev,
        [key]: { sentiment, text: "" },
      };
    });
  };

  const handleFeedbackChange = (key, text) => {
    setFeedbackForms((prev) => {
      if (!prev[key]) {
        return prev;
      }
      return {
        ...prev,
        [key]: { ...prev[key], text },
      };
    });
  };

  const handleFeedbackSubmit = (key) => {
    setFeedbackForms((prev) => {
      const entry = prev[key];
      if (!entry?.text?.trim()) {
        return prev;
      }
      console.log("Submitted feedback:", key, entry);
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const closeFeedbackForm = (key) => {
    setFeedbackForms((prev) => {
      if (!prev[key]) {
        return prev;
      }
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const trendData = [
    { date: "Nov 1", volume: 1000, approval: 95, fraud: 0.1 },
    { date: "Nov 2", volume: 1300, approval: 94, fraud: 0.12 },
    { date: "Nov 3", volume: 1200, approval: 96, fraud: 0.09 },
    { date: "Nov 4", volume: 1600, approval: 93, fraud: 0.15 },
    { date: "Nov 5", volume: 1700, approval: 96, fraud: 0.1 },
  ];

  const regionalData = [
    {
      region: "US",
      label: "US & Canada",
      fraud: 0.08,
      approval: 97,
      coords: { lat: 37, lon: -96 },
      volume: 540000,
      trend: "+4.6%",
      status: "opportunity",
      note: "Marketing push is adding clean shoppers.",
      activity: [440, 470, 520, 580, 610, 590, 640],
    },
    {
      region: "EU",
      label: "Europe",
      fraud: 0.11,
      approval: 94,
      coords: { lat: 50, lon: 10 },
      volume: 310000,
      trend: "-2.1%",
      status: "watch",
      note: "Checkout experiment still stabilizing.",
      activity: [320, 315, 310, 300, 298, 305, 307],
    },
    {
      region: "LATAM",
      label: "Latin America",
      fraud: 0.15,
      approval: 90,
      coords: { lat: -15, lon: -60 },
      volume: 190000,
      trend: "+3.4%",
      status: "alert",
      note: "Chargebacks concentrated in Brazil.",
      activity: [150, 160, 172, 188, 195, 205, 210],
    },
    {
      region: "APAC",
      label: "APAC",
      fraud: 0.07,
      approval: 96,
      coords: { lat: 15, lon: 120 },
      volume: 260000,
      trend: "+5.0%",
      status: "stable",
      note: "Growth led by Japan & Singapore.",
      activity: [210, 220, 235, 250, 260, 270, 280],
    },
  ];

  const fraudTypeBreakdown = [
    { type: "Account Takeover", share: 38, change: "+6%" },
    { type: "Payment Fraud", share: 27, change: "-3%" },
    { type: "Friendly Fraud", share: 19, change: "+2%" },
    { type: "Policy Abuse", share: 16, change: "+1%" },
  ];

  const productLinePerformance = [
    {
      product: "Marketplace",
      approval: 96,
      fraud: 0.08,
      volume: "480k",
      note: "Stable",
    },
    {
      product: "Subscriptions",
      approval: 92,
      fraud: 0.11,
      volume: "230k",
      note: "Needs tuning",
    },
    {
      product: "Payouts",
      approval: 89,
      fraud: 0.13,
      volume: "160k",
      note: "Vendor review",
    },
  ];

  const cohortSegments = [
    {
      cohort: "New shoppers (<30d)",
      approval: 89,
      volume: "64k",
      risk: "medium",
      trend: "+2.3%",
      note: "Manual review 1.8× baseline.",
    },
    {
      cohort: "Returning (30-180d)",
      approval: 97,
      volume: "120k",
      risk: "low",
      trend: "+0.4%",
      note: "High loyalty, low dispute rate.",
    },
    {
      cohort: "Power users (>180d)",
      approval: 95,
      volume: "48k",
      risk: "low",
      trend: "stable",
      note: "Drive 42% of GMV.",
    },
    {
      cohort: "Reactivated",
      approval: 83,
      volume: "21k",
      risk: "high",
      trend: "+5.5%",
      note: "Spike in promo abuse cases.",
    },
  ];

  const supportTrend = [
    { label: "Mon", total: 310, escalations: 12 },
    { label: "Tue", total: 365, escalations: 15 },
    { label: "Wed", total: 342, escalations: 13 },
    { label: "Thu", total: 390, escalations: 17 },
    { label: "Fri", total: 420, escalations: 19 },
    { label: "Sat", total: 288, escalations: 10 },
    { label: "Sun", total: 260, escalations: 9 },
  ];

  const totalRegionalVolume = regionalData.reduce(
    (sum, region) => sum + (region.volume ?? 0),
    0
  );

  const riskBadgeClasses = {
    low: "bg-emerald-50 text-emerald-700",
    medium: "bg-amber-50 text-amber-700",
    high: "bg-rose-50 text-rose-700",
  };

  const regionStatusBadges = {
    opportunity: "bg-sky-50 text-sky-700",
    watch: "bg-amber-50 text-amber-700",
    alert: "bg-rose-50 text-rose-700",
    stable: "bg-emerald-50 text-emerald-700",
  };

  const supportMaxTotal = Math.max(...supportTrend.map((day) => day.total));
  const supportSparkPath =
    supportTrend.length > 1 && supportMaxTotal > 0
      ? supportTrend
          .map((day, index) => {
            const x = (index / (supportTrend.length - 1 || 1)) * 100;
            const y = 40 - (day.total / supportMaxTotal) * 30;
            return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
          })
          .join(" ")
      : "M0,20 L100,20";
  const supportTicketsTotal = supportTrend.reduce(
    (sum, day) => sum + day.total,
    0
  );
  const supportEscalationAvg = Math.round(
    supportTrend.reduce((sum, day) => sum + day.escalations, 0) /
      supportTrend.length
  );

  const systemHealth = [
    { metric: "Approval Rate", value: "96%", trend: "+1.2%" },
    { metric: "Model Latency", value: "820ms", trend: "-5%" },
    { metric: "Vendor SLA", value: "99.7%", trend: "stable" },
    { metric: "Chargeback Rate", value: "0.09%", trend: "-0.01%" },
    {
      metric: "Fraud Resiliency",
      value: "87 / 100",
      trend: "↑",
      tooltip:
        "How resilient the fraud system is under stress, combining model stability, vendor reliability, and response time consistency.",
    },
  ];

  const insights = [
    {
      title: "Spike in US traffic",
      description: "Detected 45% increase in US traffic with stable fraud ratio.",
      type: "opportunity",
      details: [
        "No correlated spike in fraud rate.",
        "Same BIN distribution as prior week.",
        "Referral traffic up 38% — likely marketing-driven.",
        "Recommend coordinating with Growth to assess conversion uplift.",
      ],
    },
    {
      title: "Drop in approval rate (EU)",
      description: "Approval rate down 4% in EU after checkout update.",
      type: "alert",
      details: [
        "Drop localized to PayPal and Klarna methods.",
        "Latency increased 20% after UI changes.",
        "Fraud rate unchanged, suggesting technical rather than behavioral cause.",
        "Recommend rollback or A/B testing new flow.",
      ],
    },
    {
      title: "Increased disputes in LATAM",
      description: "Chargeback rate in LATAM rose 0.03%, mainly debit cards.",
      type: "alert",
      details: [
        "Disputes concentrated in Brazil (72%).",
        "Majority of cases from one issuer (Banco Inter).",
        "No pattern suggesting fraud — customer dissatisfaction likely.",
        "Recommend customer service intervention and localized education.",
      ],
    },
    {
      title: "Fraud model drift detected",
      description: "Model predictions variance decreased by 30%.",
      type: "alert",
      details: [
        "Precision dropped from 91% to 86% week-over-week.",
        "High correlation with new feature rollout (device fingerprinting).",
        "Feature importance ranking changed significantly.",
        "Recommend retraining with recent labeled data.",
      ],
    },
    {
      title: "Consistent approvals in APAC",
      description: "Stable fraud despite 25% traffic growth.",
      type: "opportunity",
      details: [
        "Traffic growth mainly from Japan and Singapore.",
        "Fraud rate stable at 0.07%.",
        "Model confidence remains high across issuers.",
        "Potential to safely expand marketing in the region.",
      ],
    },
    {
  title: "Rising Demand for Express Payouts",
  description: "Benchmarking shows your recent spike is part of a broader vertical trend.",
  type: "opportunity",
  details: [
    "Customers in your vertical saw a 30–45% rise in express-payout usage over the past two weeks.",
    "Your increase is smaller (18%), but fraud levels remain low and stable.",
    "Competitors tightened controls prematurely, causing avoidable friction.",
    "You can safely lean into this trend — reduce friction and capture more volume while keeping risk steady."
  ]
}
  ];

  const macroInsights = [
    {
      title: "Login Challenge Optimization",
      description:
        "Challenging only new IPs instead of all logins would reduce false positives by ~35% and improve login completion by ~6%.",
    },
    {
      title: "High Decline Threshold",
      description:
        "Raising the fraud score threshold from 0.6 → 0.7 would recover ~2.5% approvals with <0.05% fraud increase.",
    },
    {
  title: "Shorten the Checkout Experience",
  description:
    "Your checkout takes 20–30% longer than what we observe across comparable customers. Removing or auto-filling one optional step usually brings completion rates up by 5–8%.",
},
    {
      title: "Vendor Load Balancing",
      description:
        "Vendor B handles ~80% of traffic. Routing new EU users to Vendor A first would drop this to ~40% and lift conversion by ~6%.",
    },
    {
      title: "3DS Exemption Strategy",
      description:
        "Enabling 3DS exemptions for low-risk returning users could remove friction for ~25% of customers and improve conversion by ~4%.",
    },
{
  title: "Fill the Missing Decline Reason Code",
  description:
    "A large share of your declines lacks a clear reason code. Other customers improved investigation speed by >50% after adding a simple field indicating which rule or system made the decision.",
},
  ];

  const insightVariants = {
    alert: {
      gradient: "from-amber-50/80 via-white to-white dark:from-amber-900/30 dark:via-slate-900 dark:to-slate-900",
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

  const getInsightStyles = (type, isSelected) => {
    const variant = insightVariants[type] ?? insightVariants.opportunity;
    return {
      card: `rounded-3xl border ${variant.border} bg-gradient-to-br ${variant.gradient} shadow-sm hover:shadow-lg ${
        isSelected
          ? `ring-2 ${variant.ring} ring-offset-2 ring-offset-white`
          : ""
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

  const getTrendBadgeClass = (trend = "") => {
    const normalized = trend.toLowerCase();
    if (!trend || normalized.includes("stable")) {
      return "bg-slate-100 text-slate-500";
    }
    if (trend.trim().startsWith("-") || normalized.includes("↓")) {
      return "bg-rose-50 text-rose-600";
    }
    return "bg-emerald-50 text-emerald-700";
  };

  const getRegionStatusBadge = (status) =>
    regionStatusBadges[status] ?? "bg-slate-100 text-slate-600";

  const formatVolume = (value = 0) => {
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

  const getVolumeShare = (volume = 0) => {
    if (!totalRegionalVolume) {
      return 0;
    }
    return (volume / totalRegionalVolume) * 100;
  };

  const getSparklinePath = (points = []) => {
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

  const formatLabel = (value = "") =>
    value.charAt(0).toUpperCase() + value.slice(1);

  const insightGroups = {
    opportunity: insights.filter((insight) => insight.type === "opportunity"),
    alert: insights.filter((insight) => insight.type === "alert"),
  };

  const renderInsightCard = (insight) => {
    const isSelected = selectedInsight?.title === insight.title;
    const insightStyles = getInsightStyles(insight.type, isSelected);
    const InsightIcon = insightStyles.icon;
    const feedbackKey = getFeedbackKey("trend", insight.title);
    const feedbackState = feedbackForms[feedbackKey];

    return (
      <Card
        key={insight.title}
        className={`relative overflow-hidden transition-all ${insightStyles.card}`}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-8 top-0 h-28 w-36 rounded-full bg-gradient-to-r from-transparent to-transparent ${insightStyles.glow} blur-3xl opacity-70`}
        />
        <CardContent className="relative flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-start gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${insightStyles.iconBg}`}
              >
                <InsightIcon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <span
                    className={`h-2 w-2 rounded-full ${insightStyles.dot}`}
                  />
                  <span
                    className={`rounded-full px-2 py-0.5 ${insightStyles.badge}`}
                  >
                    {formatLabel(insight.type)}
                  </span>
                  {isSelected && (
                    <span
                      className={`rounded-full bg-white/70 px-2 py-0.5 text-[11px] ${insightStyles.highlight}`}
                    >
                      Open
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {insight.title}
                </p>
                <p className="text-sm text-slate-600">{insight.description}</p>
                {insight.details?.[0] && (
                  <p className="text-xs text-slate-500">{insight.details[0]}</p>
                )}
              </div>
            </div>
            {isSelected ? (
              <Button
                size="sm"
                variant="outline"
                className={`text-xs font-semibold transition-all ${insightStyles.button}`}
                onClick={() => setSelectedInsight(null)}
              >
                Minimize
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className={`text-xs font-semibold transition-all ${insightStyles.button}`}
                onClick={() => setSelectedInsight(insight)}
              >
                Show brief
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            )}
          </div>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 rounded-2xl border border-slate-100/80 bg-white/80 p-4 text-sm text-slate-700 shadow-inner"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <span
                    className={`rounded-full px-2 py-0.5 ${insightStyles.badge}`}
                  >
                    {formatLabel(insight.type)}
                  </span>
                  <span className="text-slate-400">Deep dive</span>
                </div>
                <div className="flex flex-col space-y-2 text-sm text-slate-700">
                  {insight.details?.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-start gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-sm"
                    >
                      <span
                        className={`mt-1 inline-flex h-1.5 w-1.5 rounded-full ${insightStyles.dot}`}
                      />
                      <p className="leading-tight">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 rounded-xl border border-dashed border-slate-200 bg-white/80 p-3">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-slate-400" />
                  <p className="text-xs text-slate-500">
                    Log whether this initiative moves forward and any asks.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2 text-xs text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <p>
                      {insight.type === "opportunity"
                        ? "Nudges to grow approvals with acceptable risk."
                        : "Actions to stabilize or contain risky segments."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center rounded-full border border-dashed border-slate-200 px-2 py-0.5">
                      Position{" "}
                      {insights.findIndex(
                        (item) => item.title === insight.title
                      ) + 1}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5">
                      Awaiting decision
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                        feedbackState?.sentiment === "positive"
                          ? "border-emerald-200 bg-emerald-50/80 text-emerald-700"
                          : ""
                      }`}
                      onClick={() =>
                        toggleFeedbackForm(feedbackKey, "positive")
                      }
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Greenlight
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                        feedbackState?.sentiment === "negative"
                          ? "border-rose-200 bg-rose-50/80 text-rose-700"
                          : ""
                      }`}
                      onClick={() =>
                        toggleFeedbackForm(feedbackKey, "negative")
                      }
                    >
                      <ThumbsDown className="h-4 w-4" />
                      Block / revisit
                    </Button>
                  </div>
                  {feedbackState && (
                    <form
                      className="space-y-3"
                      onSubmit={(event) => {
                        event.preventDefault();
                        handleFeedbackSubmit(feedbackKey);
                      }}
                    >
                      <p className="text-sm text-slate-600">
                        {feedbackState.sentiment === "positive"
                          ? "Share why this initiative gets a green light and list the next moves."
                          : "Log objections, redlines, and the actions needed before this can ship."}
                      </p>
                      <textarea
                        className="w-full rounded-2xl border border-slate-200 bg-white/90 p-3 text-sm text-slate-700 shadow-inner focus:border-slate-400 focus:outline-none"
                        rows={3}
                        value={feedbackState.text ?? ""}
                        onChange={(event) =>
                          handleFeedbackChange(feedbackKey, event.target.value)
                        }
                        placeholder={
                          feedbackState.sentiment === "positive"
                            ? "e.g., Socialize with leadership, prep rollout doc..."
                            : "e.g., Need more vendor benchmarking and risk review..."
                        }
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => closeFeedbackForm(feedbackKey)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          size="sm"
                          className="text-xs font-semibold"
                          disabled={!feedbackState.text?.trim()}
                        >
                          Submit log
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Top header */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Minoris Risk Intelligence Hub
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-300">
               
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="text-xs font-semibold"
              aria-pressed={theme === "dark"}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  Light mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  Dark mode
                </>
              )}
            </Button>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500" />
              Demo dataset
            </span>
          </div>
        </header>

        {/* Tabs wrapper */}
        <Tabs defaultValue="overview" className="space-y-6">
          {/* Tab nav */}
          <div className="flex justify-center">
            <TabsList className="inline-flex rounded-full bg-white px-1 py-1 shadow-sm dark:bg-slate-900">
              <TabsTrigger
                value="overview"
                className="rounded-full px-5 py-1.5 text-sm font-medium text-slate-600 transition-colors data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:text-slate-300 dark:data-[state=active]:bg-slate-100/70 dark:data-[state=active]:text-slate-900"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="operations"
                className="rounded-full px-5 py-1.5 text-sm font-medium text-slate-600 transition-colors data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:text-slate-300 dark:data-[state=active]:bg-slate-100/70 dark:data-[state=active]:text-slate-900"
              >
                Trend Analysis
              </TabsTrigger>
              <TabsTrigger
                value="macro"
                className="rounded-full px-5 py-1.5 text-sm font-medium text-slate-600 transition-colors data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:text-slate-300 dark:data-[state=active]:bg-slate-100/70 dark:data-[state=active]:text-slate-900"
              >
                Strategic Insights
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ---------------- OVERVIEW TAB ---------------- */}
          <TabsContent value="overview" className="space-y-8">
            {/* Status banner */}
            <Card className="relative overflow-hidden rounded-3xl border border-emerald-100/80 bg-white shadow-sm dark:border-emerald-500/30">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-50/90 via-white to-white dark:from-emerald-900/40 dark:via-slate-900 dark:to-slate-900"
              />
              <CardContent className="relative flex flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                      Live health
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      System Status: Healthy
                    </p>
                    <p className="text-sm text-slate-600">
                      No major latency, anomaly spikes, or vendor incidents
                      detected.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-medium text-emerald-800/80">
                      <span className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5">
                        Demo dataset
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5">
                        Rolling view
                      </span>
                    </div>
                  </div>
                </div>
                <dl className="grid w-full gap-6 text-sm text-slate-500 sm:grid-cols-3 md:max-w-xl">
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Vendors monitored
                    </dt>
                    <dd className="flex items-baseline gap-1 text-2xl font-semibold text-emerald-900">
                      4
                      <span className="text-xs font-medium text-slate-500">
                        active
                      </span>
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Regions covered
                    </dt>
                    <dd className="flex items-baseline gap-1 text-2xl font-semibold text-emerald-900">
                      5
                      <span className="text-xs font-medium text-slate-500">
                        focus areas
                      </span>
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Coverage window
                    </dt>
                    <dd className="text-2xl font-semibold text-emerald-900">
                      24h
                    </dd>
                    <p className="text-xs text-slate-500">
                      Pre &amp; post-auth flows
                    </p>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* KPI row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-5"
            >
              {systemHealth.map((item) => (
                <Card
                  key={item.metric}
                  className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="flex h-full min-h-[150px] flex-col justify-center gap-4 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {item.metric}
                      </p>
                      {item.tooltip && (
                        <div className="relative group">
                          <Info className="h-4 w-4 text-slate-400 cursor-pointer" />
                          <div className="absolute right-0 top-6 z-50 hidden w-56 rounded-lg bg-slate-900 p-3 text-xs text-slate-100 shadow-lg group-hover:block">
                            {item.tooltip}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-3xl font-semibold tracking-tight text-slate-900">
                        {item.value}
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getTrendBadgeClass(
                          item.trend
                        )}`}
                      >
                        {item.trend}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Charts layout */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 lg:grid-cols-[2fr_1fr]"
            >
              {/* Volume + Approval */}
              <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    Transaction Volume &amp; Approval Rate
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-72 pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData}
                      margin={{ top: 20, right: 24, left: 8, bottom: 8 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                      />
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tickLine={false}
                        tickCount={5}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                        tickCount={5}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 10,
                          borderColor: "#e5e7eb",
                          fontSize: 12,
                        }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="volume"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="Volume"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="approval"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="Approval (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Fraud rate */}
              <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    Fraud Rate
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-72 pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData}
                      margin={{ top: 20, right: 16, left: 0, bottom: 8 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                      />
                      <YAxis
                        tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tickLine={false}
                        tickCount={5}
                      />
                      <Tooltip
                        formatter={(v) => `${(v * 100).toFixed(2)}%`}
                        contentStyle={{
                          borderRadius: 10,
                          borderColor: "#e5e7eb",
                          fontSize: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="fraud"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="Fraud Rate"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Regional comparison */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    Regional Performance Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid gap-3 text-left text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
                    {regionalData.map((region) => {
                      const label = region.label ?? region.region;
                      const share = getVolumeShare(region.volume);
                      const sparklinePath = getSparklinePath(region.activity);
                      return (
                        <div
                          key={region.region}
                          className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                              {label}
                            </p>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${getRegionStatusBadge(
                                region.status
                              )}`}
                            >
                              {formatLabel(region.status)}
                            </span>
                          </div>
                          <div className="mt-2 flex items-baseline justify-between">
                            <div>
                              <p className="text-xs text-slate-500">Approval</p>
                              <p className="text-lg font-semibold text-slate-900">
                                {region.approval}%
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500">Fraud</p>
                              <p className="text-sm font-semibold text-amber-600">
                                {(region.fraud * 100).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span>Volume</span>
                              <span className="font-medium text-slate-900">
                                {formatVolume(region.volume)}
                              </span>
                            </div>
                            <div className="mt-1 h-2 rounded-full bg-slate-200">
                              <div
                                className="h-full rounded-full bg-slate-900"
                                style={{ width: `${share}%` }}
                              />
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                            <span>7d trend</span>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold ${getTrendBadgeClass(
                                region.trend
                              )}`}
                            >
                              {region.trend}
                            </span>
                          </div>
                          <svg
                            viewBox="0 0 56 20"
                            className="mt-2 h-6 w-full text-emerald-500"
                            preserveAspectRatio="none"
                            role="presentation"
                          >
                            <path
                              d={sparklinePath}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          <p className="mt-2 text-xs text-slate-500">
                            {region.note}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fraud types + Product lines */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 lg:grid-cols-2"
            >
              <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    Type of Fraud Mix
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] uppercase tracking-wide">
                        Leading vector
                      </span>
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-rose-600">
                        Account Takeover
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] uppercase tracking-wide">
                        Detection coverage
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600">
                        92%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {fraudTypeBreakdown.map((item) => (
                      <div key={item.type} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <span className="font-medium text-slate-900">
                            {item.type}
                          </span>
                          <span
                            className={`text-xs font-semibold ${
                              item.change.startsWith("+")
                                ? "text-rose-500"
                                : "text-emerald-600"
                            }`}
                          >
                            {item.change} w/w
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-rose-400 to-amber-400"
                            style={{ width: `${item.share}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500">
                          {item.share}% of detected attempts
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    Product Line Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                      GMV focus: Checkout &amp; payouts
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">
                        Avg. approval
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        92.6%
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {productLinePerformance.map((product) => (
                      <div
                        key={product.product}
                        className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                              {product.product}
                            </p>
                            <p className="text-xs text-slate-500">
                              {product.volume} tx / 24h
                            </p>
                          </div>
                          <span className="text-lg font-semibold text-slate-900">
                            {product.approval}%
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                          <span className="font-medium text-amber-600">
                            {(product.fraud * 100).toFixed(1)}% fraud
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] ${
                              product.note === "Stable"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {product.note}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cohorts + Support */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 lg:grid-cols-2"
            >
              <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    User Cohort Watchlist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-xs text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-900">Focus:</span>{" "}
                      Reactivated &amp; promo-sensitive cohorts driving{" "}
                      <span className="text-rose-500">38%</span> of review queue.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {cohortSegments.map((segment) => (
                      <div
                        key={segment.cohort}
                        className="rounded-2xl border border-slate-100 bg-white/70 p-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            {segment.cohort}
                          </p>
                          <span className="text-xs font-semibold text-slate-500">
                            {segment.trend}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <p className="text-lg font-semibold text-slate-900">
                              {segment.approval}%
                            </p>
                            <p className="text-xs text-slate-500">
                              {segment.volume} users
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              riskBadgeClasses[segment.risk]
                            }`}
                          >
                            {formatLabel(segment.risk)} risk
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                          {segment.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    Support Signal Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">
                        Tickets / week
                      </p>
                      <p className="text-xl font-semibold text-slate-900">
                        {supportTicketsTotal.toLocaleString()}
                      </p>
                      <p className="text-xs text-emerald-600">+12% vs. prior</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">
                        Avg escalations
                      </p>
                      <p className="text-xl font-semibold text-slate-900">
                        {supportEscalationAvg}
                      </p>
                      <p className="text-xs text-amber-600">
                        Login/OTP heavy
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">
                        Self-serve deflection
                      </p>
                      <p className="text-xl font-semibold text-slate-900">
                        68%
                      </p>
                      <p className="text-xs text-slate-500">Target ≥ 70%</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                    <div className="relative h-32">
                      <svg
                        viewBox="0 0 100 40"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full text-emerald-400"
                      >
                        <defs>
                          <linearGradient id="support-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d={`${supportSparkPath} L100,40 L0,40 Z`}
                          fill="url(#support-gradient)"
                          stroke="none"
                        />
                        <path
                          d={supportSparkPath}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                      {supportTrend.map((day) => (
                        <span key={day.label}>{day.label}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2 text-sm text-slate-600">
                    {supportTrend.slice(0, 3).map((day) => (
                      <div
                        key={`support-${day.label}`}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/70 px-3 py-1.5"
                      >
                        <span className="font-medium text-slate-900">
                          {day.label}
                        </span>
                        <div className="flex items-center gap-4 text-xs">
                          <span>{day.total} tickets</span>
                          <span className="text-amber-600">
                            {day.escalations} escalations
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ---------------- TREND ANALYSIS TAB ---------------- */}
          <TabsContent value="operations" className="space-y-6">
            <section className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {["opportunity", "alert"].map((type) => {
                  const headerStyles = getInsightStyles(type, false);
                  const group = insightGroups[type] ?? [];

                  return (
                    <div key={type} className="space-y-3">
                      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          <span
                            className={`h-2 w-2 rounded-full ${headerStyles.dot}`}
                          />
                          <span>{formatLabel(type)}s</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-500">
                          {group.length} items
                        </span>
                      </div>
                      {group.map((insight) => renderInsightCard(insight))}
                    </div>
                  );
                })}
              </div>
            </section>
          </TabsContent>

          {/* ---------------- STRATEGIC INSIGHTS TAB ---------------- */}
          <TabsContent value="macro" className="space-y-6">
            <section className="max-w-3xl mx-auto">
              <div className="space-y-3">
                {macroInsights.map((macro) => {
                  const feedbackKey = getFeedbackKey("macro", macro.title);
                  const feedbackState = feedbackForms[feedbackKey];

                  return (
                  <Card
                    key={macro.title}
                    className="relative flex h-full rounded-3xl border border-slate-200 bg-white shadow-sm"
                  >
                    <CardContent className="flex h-full min-h-[180px] flex-1 flex-col justify-center gap-5 p-6">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {macro.title}
                        </p>
                        <p className="text-sm text-slate-700">
                          {macro.description}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                                feedbackState?.sentiment === "positive"
                                  ? "border-emerald-200 bg-emerald-50/80 text-emerald-700"
                                  : ""
                              }`}
                              onClick={() =>
                                toggleFeedbackForm(feedbackKey, "positive")
                              }
                            >
                              <ThumbsUp className="h-4 w-4" />
                              Greenlight
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                                feedbackState?.sentiment === "negative"
                                  ? "border-rose-200 bg-rose-50/80 text-rose-700"
                                  : ""
                              }`}
                              onClick={() =>
                                toggleFeedbackForm(feedbackKey, "negative")
                              }
                            >
                              <ThumbsDown className="h-4 w-4" />
                              Block / revisit
                            </Button>
                          </div>
                          {feedbackState && (
                            <form
                              className="space-y-3"
                              onSubmit={(event) => {
                                event.preventDefault();
                                handleFeedbackSubmit(feedbackKey);
                              }}
                            >
                              <p className="text-sm text-slate-600">
                                {feedbackState.sentiment === "positive"
                                  ? "Share why this initiative gets a green light and list the next moves."
                                  : "Log objections, redlines, and the actions needed before this can ship."}
                              </p>
                              <textarea
                                className="w-full rounded-2xl border border-slate-200 bg-white/90 p-3 text-sm text-slate-700 shadow-inner focus:border-slate-400 focus:outline-none"
                                rows={3}
                                value={feedbackState.text ?? ""}
                                onChange={(event) =>
                                  handleFeedbackChange(
                                    feedbackKey,
                                    event.target.value
                                  )
                                }
                                placeholder={
                                  feedbackState.sentiment === "positive"
                                    ? "e.g., Socialize with leadership, prep rollout doc..."
                                    : "e.g., Need more vendor benchmarking and risk review..."
                                }
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => closeFeedbackForm(feedbackKey)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  size="sm"
                                  className="text-xs font-semibold"
                                  disabled={!feedbackState.text?.trim()}
                                >
                                  Submit log
                                </Button>
                              </div>
                            </form>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
