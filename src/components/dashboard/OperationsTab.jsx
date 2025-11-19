import { useMemo } from "react";
import { TabsContent } from "../ui/tabs";
import { getFeedbackKey, getInsightNoteKey, getInsightStyles, formatLabel } from "../../utils/dashboardHelpers";
import { InsightCard } from "./InsightCard";
import { Button } from "../ui/button";

export function OperationsTab({
  insightGroups,
  selectedInsight,
  feedbackForms,
  insightNotes,
  onSelectInsight,
  onToggleFeedback,
  onFeedbackChange,
  onFeedbackSubmit,
  onFeedbackClose,
  onInsightNoteChange,
  onStartRCA,
  funnelData,
  estimateLoss,
  onSelectFunnelStage,
  selectedStage,
  showFunnelAssistant,
}) {
  const maxVolume = useMemo(
    () => Math.max(...funnelData.map((stage) => stage.volume), 1),
    [funnelData]
  );

  const getPressureBadge = (pressure) => {
    if (pressure === "high") return "bg-rose-50 text-rose-700 ring-1 ring-rose-100 dark:bg-rose-900/30 dark:text-rose-200 dark:ring-rose-900";
    if (pressure === "medium") return "bg-amber-50 text-amber-700 ring-1 ring-amber-100 dark:bg-amber-900/30 dark:text-amber-200 dark:ring-amber-900";
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-200 dark:ring-emerald-900";
  };

  return (
    <TabsContent value="operations" className="space-y-6">
      <div className="flex justify-end">
        <Button type="button" size="sm" variant="outline" onClick={onStartRCA}>
          Start a new analysis
        </Button>
      </div>
      <section className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {["opportunity", "alert"].map((type) => {
            const headerStyles = getInsightStyles(type, false);
            const group = insightGroups[type] ?? [];
            const pluralLabel =
              type === "opportunity" ? "Opportunities" : `${formatLabel(type)}s`;

            return (
              <div key={type} className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    <span className={`h-2 w-2 rounded-full ${headerStyles.dot}`} />
                    <span>{pluralLabel}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {group.length} items
                  </span>
                </div>
                {group.map((insight) => {
                  const feedbackKey = getFeedbackKey("trend", insight.title);
                  const feedbackState = feedbackForms[feedbackKey];
                  const noteKey = getInsightNoteKey(insight.title);
                  const noteValue = insightNotes[noteKey] ?? "";

                  return (
                    <InsightCard
                      key={insight.title}
                      insight={insight}
                      isSelected={selectedInsight?.title === insight.title}
                      onSelect={onSelectInsight}
                      feedbackState={feedbackState}
                      onToggleFeedback={(sentiment) =>
                        onToggleFeedback(feedbackKey, sentiment)
                      }
                      onFeedbackChange={(text) =>
                        onFeedbackChange(feedbackKey, text)
                      }
                      onFeedbackSubmit={() => onFeedbackSubmit(feedbackKey)}
                      onFeedbackClose={() => onFeedbackClose(feedbackKey)}
                      noteValue={noteValue}
                      onNoteChange={(text) =>
                        onInsightNoteChange(noteKey, text)
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
      <section className="space-y-4 pt-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white via-white to-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:from-slate-900 dark:via-slate-900">
          <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fraud Conversion Funnel</p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Fraud Conversion Funnel
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                See where fraud controls drive drop-off and understand the impact on revenue.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              Live mock assistant
            </div>
          </div>
          <div className="space-y-3">
            {funnelData.map((stage) => {
              const volumeWidth = `${Math.max(14, (stage.volume / maxVolume) * 100)}%`;
              const isActive = showFunnelAssistant && selectedStage?.stage === stage.stage;

              return (
                <div
                  key={stage.stage}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 ${isActive ? "ring-2 ring-indigo-200 dark:ring-indigo-800" : ""}`}
                  onClick={() => onSelectFunnelStage(stage)}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {stage.stage}
                        </p>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${getPressureBadge(stage.pressure)}`}>
                          {stage.pressure === "high"
                            ? "High pressure"
                            : stage.pressure === "medium"
                              ? "Medium pressure"
                              : "Low pressure"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-300">
                        Volume: {stage.volume.toLocaleString()} · Drop: {stage.drop}%
                      </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 sm:w-1/2">
                      <div className="relative h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800/80">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-400 shadow-sm dark:from-indigo-500 dark:via-sky-500 dark:to-cyan-500"
                          style={{ width: volumeWidth }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                        <span>Relative volume</span>
                        <span className="text-slate-500">-{stage.drop}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -top-2 left-4 z-20 w-64 -translate-y-full rounded-xl border border-slate-200 bg-white/95 p-3 text-xs text-slate-700 opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200">
                    <p className="font-semibold">Stage: {stage.stage}</p>
                    <p>Drop: {stage.drop}%</p>
                    <p>Estimated Loss: ${estimateLoss(stage.drop, stage.volume).toLocaleString()}</p>
                    <p>Fraud Pressure: {stage.pressure === "high" ? "High" : stage.pressure === "medium" ? "Medium" : "Low"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </TabsContent>
  );
}
