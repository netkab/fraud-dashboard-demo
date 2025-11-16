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
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

import {
  Activity,
  Shield,
  Info,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";

export default function App() {
  const [selectedInsight, setSelectedInsight] = useState(null);

  const trendData = [
    { date: "Nov 1", volume: 1000, approval: 95, fraud: 0.1 },
    { date: "Nov 2", volume: 1300, approval: 94, fraud: 0.12 },
    { date: "Nov 3", volume: 1200, approval: 96, fraud: 0.09 },
    { date: "Nov 4", volume: 1600, approval: 93, fraud: 0.15 },
    { date: "Nov 5", volume: 1700, approval: 96, fraud: 0.1 },
  ];

  const regionalData = [
    { region: "US", fraud: 0.08, approval: 97 },
    { region: "EU", fraud: 0.11, approval: 94 },
    { region: "LATAM", fraud: 0.15, approval: 90 },
    { region: "APAC", fraud: 0.07, approval: 96 },
  ];

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
  ];

  const macroInsights = [
    {
      title: "Login Challenge Optimization",
      description:
        "Challenging only new IPs instead of all logins would reduce false positives by ~35% and improve login completion by ~6%.",
      category: "optimization",
    },
    {
      title: "High Decline Threshold",
      description:
        "Raising the fraud score threshold from 0.6 → 0.7 would recover ~2.5% approvals with <0.05% fraud increase.",
      category: "risk",
    },
    {
      title: "Vendor Load Balancing",
      description:
        "Vendor B handles ~80% of traffic. Routing new EU users to Vendor A first would drop this to ~40% and lift conversion by ~6%.",
      category: "performance",
    },
    {
      title: "3DS Exemption Strategy",
      description:
        "Enabling 3DS exemptions for low-risk returning users could remove friction for ~25% of customers and improve conversion by ~4%.",
      category: "experience",
    },
    {
      title: "Model Retraining Frequency",
      description:
        "Moving from monthly to weekly retraining would adapt to fraud pattern shifts ~3x faster and reduce false positives by ~10%.",
      category: "optimization",
    },
  ];

  const getMacroIcon = (category) => {
    switch (category) {
      case "optimization":
        return <TrendingUp className="h-5 w-5 text-emerald-500" />;
      case "risk":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "experience":
        return <CheckCircle2 className="h-5 w-5 text-indigo-500" />;
      case "performance":
        return <Shield className="h-5 w-5 text-sky-500" />;
      default:
        return <Info className="h-5 w-5 text-slate-400" />;
    }
  };

  const getInsightBorder = (type) =>
    type === "alert"
      ? "border-l-4 border-amber-500"
      : "border-l-4 border-emerald-500";

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Top header */}
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Fraud Operations Pulse
            </h1>
            <p className="text-sm text-slate-500">
              Live view of approval health, incident risk, and growth signals.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500" />
            Demo dataset · Last 24h
          </span>
        </header>

        {/* Tabs wrapper */}
        <Tabs defaultValue="overview" className="space-y-6">
          {/* Tab nav */}
          <div className="flex justify-center">
            <TabsList className="inline-flex bg-white rounded-full shadow-sm px-1 py-1">
              <TabsTrigger
                value="overview"
                className="px-5 py-1.5 text-sm font-medium rounded-full text-slate-600 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="operations"
                className="px-5 py-1.5 text-sm font-medium rounded-full text-slate-600 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
              >
                Trend Analysis
              </TabsTrigger>
              <TabsTrigger
                value="macro"
                className="px-5 py-1.5 text-sm font-medium rounded-full text-slate-600 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
              >
                Strategic Insights
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ---------------- OVERVIEW TAB ---------------- */}
          <TabsContent value="overview" className="space-y-8">
            {/* Status banner */}
            <Card className="rounded-2xl border border-emerald-100 bg-emerald-50/80 shadow-sm">
              <CardContent className="flex flex-col gap-3 py-4 px-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                    <Activity className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">
                      System Status: Healthy
                    </p>
                    <p className="text-xs text-emerald-800/80">
                      No major latency, anomaly spikes, or vendor incidents
                      detected.
                    </p>
                  </div>
                </div>
                <div className="text-xs md:text-right text-emerald-900/80">
                  <p>Monitoring 4 vendors · 5 regions</p>
                  <p>24h lookback · pre-auth & post-auth coverage</p>
                </div>
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
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="flex h-full flex-col justify-between gap-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
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
                    <div>
                      <div className="text-2xl font-semibold tracking-tight text-slate-900">
                        {item.value}
                      </div>
                    </div>
                    <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                      {item.trend}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Charts layout */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 lg:grid-cols-3"
            >
              {/* Volume + Approval */}
              <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
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
              <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
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
              <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-semibold text-slate-800">
                    Regional Performance Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80 pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={regionalData}
                      barGap={12}
                      barCategoryGap="20%"
                      margin={{ top: 20, right: 24, left: 8, bottom: 8 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="region"
                        tickLine={false}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#6b7280" }}
                        axisLine={{ stroke: "#e5e7eb" }}
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
                      <Bar
                        dataKey="approval"
                        name="Approval (%)"
                        fill="#22c55e"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="fraud"
                        name="Fraud (%)"
                        fill="#f97316"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ---------------- TREND ANALYSIS TAB ---------------- */}
          <TabsContent value="operations" className="space-y-6">
            <section className="max-w-3xl mx-auto space-y-3">
              {insights.map((insight) => (
                <Card
                  key={insight.title}
                  className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow ${getInsightBorder(
                    insight.type
                  )}`}
                >
                  <CardContent className="flex items-start justify-between gap-4 p-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {insight.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {insight.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => setSelectedInsight(insight)}
                    >
                      More details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </section>

            {selectedInsight && (
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold text-slate-900">
                      {selectedInsight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-slate-700">
                      {selectedInsight.description}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                      {selectedInsight.details?.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                    <div className="flex justify-end">
                      <Button
                        onClick={() => setSelectedInsight(null)}
                        variant="outline"
                        size="sm"
                      >
                        Close
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}
          </TabsContent>

          {/* ---------------- STRATEGIC INSIGHTS TAB ---------------- */}
          <TabsContent value="macro" className="space-y-6">
            <section className="max-w-3xl mx-auto space-y-3">
              {macroInsights.map((macro) => (
                <Card
                  key={macro.title}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className="mt-1">{getMacroIcon(macro.category)}</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {macro.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {macro.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
