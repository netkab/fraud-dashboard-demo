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
    </div>
  );
}
