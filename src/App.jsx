import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { MacroInsightsTab } from "./components/dashboard/MacroInsightsTab";
import { OperationsTab } from "./components/dashboard/OperationsTab";
import { OverviewTab } from "./components/dashboard/OverviewTab";
import {
  cohortSegments,
  fraudTypeBreakdown,
  insights,
  macroInsights,
  productLinePerformance,
  regionalData,
  supportTrend,
  systemHealth,
  trendData,
} from "./data/dashboardData";

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

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [feedbackForms, setFeedbackForms] = useState({});
  const [insightNotes, setInsightNotes] = useState({});
  const [showRCA, setShowRCA] = useState(false);
  const [rcaQuery, setRcaQuery] = useState("");
  const [rcaResult, setRcaResult] = useState(null);

  const insightGroups = useMemo(
    () => ({
      opportunity: insights.filter((insight) => insight.type === "opportunity"),
      alert: insights.filter((insight) => insight.type === "alert"),
    }),
    []
  );

  const opportunityCount = insightGroups.opportunity.length;
  const alertCount = insightGroups.alert.length;
  const macroCount = macroInsights.length;

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

  const handleInsightNoteChange = (key, text) => {
    setInsightNotes((prev) => ({
      ...prev,
      [key]: text,
    }));
  };

  const handleStartRCA = () => {
    setShowRCA(true);
    setRcaQuery("");
    setRcaResult(null);
  };

  const handleCloseRCA = () => {
    setShowRCA(false);
    setRcaQuery("");
    setRcaResult(null);
  };

  const handleGenerateRCA = () => {
    const driverPool = [
      insights[0]?.title,
      insights[1]?.title,
      macroInsights[0]?.title,
      regionalData[0]?.region && `Region: ${regionalData[0].region}`,
    ].filter(Boolean);

    const mockResult = {
      drivers: driverPool.slice(0, 3),
      impact:
        macroInsights[1]?.summary ??
        "Projected pressure on dispute volumes and manual review time over the next 2 weeks.",
      actions: [
        insights[2]?.actionItems?.[0] ??
          "Tighten velocity checks on high-risk payment methods.",
        macroInsights[2]?.summary ??
          "Coordinate with product to freeze risky signup funnels temporarily.",
        "Increase analyst sampling for escalated cases in EMEA this week.",
      ].filter(Boolean),
    };

    setRcaResult(mockResult);
  };

  const handleResetRCA = () => {
    setRcaQuery("");
    setRcaResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Minoris Risk Intelligence Hub
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              A compact view of day-to-day fraud posture, workflow signals, and strategic moves.
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

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
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

          <OverviewTab
            systemHealth={systemHealth}
            trendData={trendData}
            regionalData={regionalData}
            fraudTypeBreakdown={fraudTypeBreakdown}
            productLinePerformance={productLinePerformance}
            cohortSegments={cohortSegments}
            supportTrend={supportTrend}
            opportunityCount={opportunityCount}
            alertCount={alertCount}
            macroCount={macroCount}
            onNavigateToTab={setActiveTab}
          />

          <OperationsTab
          insightGroups={insightGroups}
          selectedInsight={selectedInsight}
          feedbackForms={feedbackForms}
          insightNotes={insightNotes}
          onSelectInsight={setSelectedInsight}
            onToggleFeedback={toggleFeedbackForm}
            onFeedbackChange={handleFeedbackChange}
            onFeedbackSubmit={handleFeedbackSubmit}
            onFeedbackClose={closeFeedbackForm}
            onInsightNoteChange={handleInsightNoteChange}
            onStartRCA={handleStartRCA}
          />

          <MacroInsightsTab
            macroInsights={macroInsights}
            feedbackForms={feedbackForms}
            onToggleFeedback={toggleFeedbackForm}
            onFeedbackChange={handleFeedbackChange}
            onFeedbackSubmit={handleFeedbackSubmit}
            onFeedbackClose={closeFeedbackForm}
          />
        </Tabs>
      </main>
      {showRCA && (
        <div className="fixed inset-y-0 right-0 z-40 flex w-full max-w-[420px] shadow-2xl">
          <div className="relative flex h-full w-full flex-col gap-4 border-l border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
            <button
              type="button"
              className="absolute right-3 top-3 text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
              onClick={handleCloseRCA}
            >
              ×
            </button>
            <div className="space-y-1 pr-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Guided RCA
              </p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Rapid context builder
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Describe what you want to dig into and we will assemble a quick directional RCA using today&apos;s signals.
              </p>
            </div>

            {rcaResult === null ? (
              <div className="flex flex-1 flex-col gap-3">
                <textarea
                  value={rcaQuery}
                  onChange={(e) => setRcaQuery(e.target.value)}
                  placeholder="Describe what you want to investigate…"
                  className="min-h-[160px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-0 transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-slate-700 dark:focus:ring-slate-800"
                />
                <Button
                  type="button"
                  size="sm"
                  className="w-full"
                  onClick={handleGenerateRCA}
                >
                  Generate analysis
                </Button>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-2">
                <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Drivers
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-sm text-slate-800 dark:text-slate-200">
                    {rcaResult.drivers.map((driver) => (
                      <li key={driver}>{driver}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Impact
                  </p>
                  <p className="text-sm text-slate-800 dark:text-slate-200">{rcaResult.impact}</p>
                </div>
                <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Recommended actions
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-sm text-slate-800 dark:text-slate-200">
                    {rcaResult.actions.map((action) => (
                      <li key={action}>{action}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" className="w-full" onClick={handleResetRCA}>
                    Start over
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
