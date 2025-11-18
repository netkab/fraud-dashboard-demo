import {
  Line,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { Activity, Info } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TabsContent } from "../ui/tabs";
import {
  formatLabel,
  formatVolume,
  getRegionStatusBadge,
  getSparklinePath,
  getTrendBadgeClass,
  getVolumeShare,
  riskBadgeClasses,
} from "../../utils/dashboardHelpers";

function StatusBanner({
  opportunityCount,
  alertCount,
  macroCount,
  onNavigateToTab,
}) {
  return (
<Card className="relative overflow-hidden rounded-3xl border border-emerald-100/80 bg-white shadow-sm dark:border-emerald-500/30 min-h-[280px]">
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-50/90 via-white to-white dark:from-emerald-900/40 dark:via-slate-900 dark:to-slate-900"
  />

  <CardContent className="relative flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-10 px-10 py-10 md:flex-row md:items-center md:justify-between md:gap-14">

    {/* LEFT SIDE */}
    <div className="flex flex-1 items-center gap-5 md:gap-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        <Activity className="h-6 w-6" />
      </div>

      <div className="space-y-4">

        {/* SYSTEM STATUS */}
        <p className="text-lg font-semibold text-slate-900">
          System Status: Healthy
        </p>

        {/* RISK POSTURE */}
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Risk Posture: Low
          </span>
          <p className="text-sm leading-relaxed text-slate-600">
            No major anomalies observed. Approval rate improving, vendor SLA stable,
            and fraud levels remain within expected range.
          </p>
        </div>

        {/* COUNTS */}
        <p className="text-base leading-relaxed text-slate-600">
          You have{" "}
          <span className="font-semibold text-emerald-700">{opportunityCount}</span>{" "}
          opportunities,{" "}
          <span className="font-semibold text-amber-600">{alertCount}</span>{" "}
          alerts, and{" "}
          <span className="font-semibold text-slate-900">{macroCount}</span>{" "}
          strategic insights to review.
        </p>

      </div>
    </div>

    {/* RIGHT SIDE BUTTONS */}
    <div className="flex flex-wrap items-center gap-3">
      <Button
        size="sm"
        variant="outline"
        className="text-sm font-semibold border-emerald-200 text-emerald-700 bg-white/70 hover:bg-emerald-50/50 px-4 py-2"
        onClick={() => onNavigateToTab("operations")}
      >
        Go to Trend Analysis
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="text-sm font-semibold border-slate-300 text-slate-700 bg-white/70 hover:bg-slate-50/50 px-4 py-2"
        onClick={() => onNavigateToTab("macro")}
      >
        Go to Strategic Insights
      </Button>
    </div>

  </CardContent>
</Card>
  );
}

function SystemHealthGrid({ items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-5"
    >
      {items.map((item) => (
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
                  <Info className="h-4 w-4 cursor-pointer text-slate-400" />
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
  );
}

function ChartsSection({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-4 lg:grid-cols-[2fr_1fr]"
    >
      <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-semibold text-slate-800">
            Transaction Volume &amp; Approval Rate
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 24, left: 8, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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

      <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-semibold text-slate-800">
            Fraud Rate Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 16, left: 0, bottom: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
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
  );
}

function RegionalPerformance({ regions }) {
  const totalVolume = regions.reduce(
    (sum, region) => sum + (region.volume ?? 0),
    0
  );

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm font-semibold text-slate-800">
            Regional Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid gap-3 text-left text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((region) => {
              const label = region.label ?? region.region;
              const share = getVolumeShare(region.volume, totalVolume);
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
                  <p className="mt-2 text-xs text-slate-500">{region.note}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function FraudProductSection({ fraudTypeBreakdown, productLinePerformance }) {
  return (
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
              <p className="text-lg font-semibold text-slate-900">92.6%</p>
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
  );
}

function CohortSupportSection({ cohortSegments, supportTrend }) {
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

  return (
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
                <p className="mt-2 text-xs text-slate-500">{segment.note}</p>
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
              <p className="text-xs text-amber-600">Login/OTP heavy</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Self-serve deflection
              </p>
              <p className="text-xl font-semibold text-slate-900">68%</p>
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
                  <linearGradient
                    id="support-gradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#34d399"
                      stopOpacity="0.6"
                    />
                    <stop
                      offset="100%"
                      stopColor="#a7f3d0"
                      stopOpacity="0"
                    />
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
                <span className="font-medium text-slate-900">{day.label}</span>
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
  );
}

export function OverviewTab({
  systemHealth,
  trendData,
  regionalData,
  fraudTypeBreakdown,
  productLinePerformance,
  cohortSegments,
  supportTrend,
  opportunityCount,
  alertCount,
  macroCount,
  onNavigateToTab,
}) {
  return (
    <TabsContent value="overview" className="space-y-8">
      <StatusBanner
        opportunityCount={opportunityCount}
        alertCount={alertCount}
        macroCount={macroCount}
        onNavigateToTab={onNavigateToTab}
      />

      <SystemHealthGrid items={systemHealth} />
      <ChartsSection data={trendData} />
      <RegionalPerformance regions={regionalData} />
      <FraudProductSection
        fraudTypeBreakdown={fraudTypeBreakdown}
        productLinePerformance={productLinePerformance}
      />
      <CohortSupportSection
        cohortSegments={cohortSegments}
        supportTrend={supportTrend}
      />
    </TabsContent>
  );
}
