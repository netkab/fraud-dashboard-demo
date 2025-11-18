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
}) {
  return (
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
                    <span className={`h-2 w-2 rounded-full ${headerStyles.dot}`} />
                    <span>{formatLabel(type)}s</span>
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
      <div className="flex justify-end">
        <Button type="button" size="sm" variant="outline" onClick={onStartRCA}>
          Start a new analysis
        </Button>
      </div>
    </TabsContent>
  );
}
