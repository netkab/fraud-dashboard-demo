import { motion } from "framer-motion";
import { ChevronRight, ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { getInsightStyles } from "../../utils/dashboardHelpers";

export function InsightCard({
  insight,
  isSelected,
  onSelect,
  feedbackState,
  onToggleFeedback,
  onFeedbackChange,
  onFeedbackSubmit,
  onFeedbackClose,
  noteValue,
  onNoteChange,
}) {
  const insightStyles = getInsightStyles(insight.type, isSelected);
  const InsightIcon = insightStyles.icon;

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
                <span className={`h-2 w-2 rounded-full ${insightStyles.dot}`} />
                <span className={`rounded-full px-2 py-0.5 ${insightStyles.badge}`}>
                  {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                </span>
                {isSelected && (
                  <span
                    className={`rounded-full bg-white/70 px-2 py-0.5 text-[11px] ${insightStyles.highlight}`}
                  >
                    Open
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {insight.title}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-200/80">
                {insight.description}
              </p>
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
              onClick={() => onSelect(null)}
            >
              Minimize
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className={`text-xs font-semibold transition-all ${insightStyles.button}`}
              onClick={() => onSelect(insight)}
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
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Detail
              </p>
              <ul className="grid gap-2 text-sm text-slate-700">
                {insight.details?.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span className={`mt-1 h-2 w-2 rounded-full ${insightStyles.dot}`} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Next actions
                </p>
                <textarea
                  className="w-full rounded-xl border border-slate-200 bg-white/90 p-3 text-sm text-slate-700 shadow-inner focus:border-slate-400 focus:outline-none"
                  rows={3}
                  placeholder="Summarize follow-ups, owners, and timelines..."
                  value={noteValue}
                  onChange={(event) => onNoteChange(event.target.value)}
                />
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Feedback
                </p>
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
                    onClick={() => onToggleFeedback("positive")}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Looks good
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
                    onClick={() => onToggleFeedback("negative")}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Needs follow-up
                  </Button>
                </div>
                {feedbackState && (
                  <form
                    className="space-y-3"
                    onSubmit={(event) => {
                      event.preventDefault();
                      onFeedbackSubmit();
                    }}
                  >
                    <p className="text-sm text-slate-600">
                      {feedbackState.sentiment === "positive"
                        ? "Share why this holds up and the next action you suggest."
                        : "Point out the risk or gap so we can prioritize fixes."}
                    </p>
                    <textarea
                      className="w-full rounded-2xl border border-slate-200 bg-white/90 p-3 text-sm text-slate-700 shadow-inner focus:border-slate-400 focus:outline-none"
                      rows={3}
                      value={feedbackState.text ?? ""}
                      onChange={(event) => onFeedbackChange(event.target.value)}
                      placeholder={
                        feedbackState.sentiment === "positive"
                          ? "e.g., Aligned to pipeline, ready to roll..."
                          : "e.g., Need vendor comparison, deeper telemetry..."
                      }
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={onFeedbackClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        className="text-xs font-semibold"
                        disabled={!feedbackState.text?.trim()}
                      >
                        Submit
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
}
