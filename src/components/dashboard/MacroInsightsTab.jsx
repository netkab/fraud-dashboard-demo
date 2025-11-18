import { TabsContent } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { getFeedbackKey } from "../../utils/dashboardHelpers";

export function MacroInsightsTab({
  macroInsights,
  feedbackForms,
  onToggleFeedback,
  onFeedbackChange,
  onFeedbackSubmit,
  onFeedbackClose,
}) {
  return (
    <TabsContent value="macro" className="space-y-6">
      <section className="mx-auto max-w-3xl">
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
                          onToggleFeedback(feedbackKey, "positive")
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
                          onToggleFeedback(feedbackKey, "negative")
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
                          onFeedbackSubmit(feedbackKey);
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
                            onFeedbackChange(feedbackKey, event.target.value)
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
                            onClick={() => onFeedbackClose(feedbackKey)}
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
  );
}
