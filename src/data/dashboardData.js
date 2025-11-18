export const trendData = [
  { date: "Nov 1", volume: 1000, approval: 95, fraud: 0.1 },
  { date: "Nov 2", volume: 1300, approval: 94, fraud: 0.12 },
  { date: "Nov 3", volume: 1200, approval: 96, fraud: 0.09 },
  { date: "Nov 4", volume: 1600, approval: 93, fraud: 0.15 },
  { date: "Nov 5", volume: 1700, approval: 96, fraud: 0.1 },
];

export const regionalData = [
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

export const fraudTypeBreakdown = [
  { type: "Account Takeover", share: 38, change: "+6%" },
  { type: "Payment Fraud", share: 27, change: "-3%" },
  { type: "Friendly Fraud", share: 19, change: "+2%" },
  { type: "Policy Abuse", share: 16, change: "+1%" },
];

export const productLinePerformance = [
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

export const cohortSegments = [
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

export const supportTrend = [
  { label: "Mon", total: 310, escalations: 12 },
  { label: "Tue", total: 365, escalations: 15 },
  { label: "Wed", total: 342, escalations: 13 },
  { label: "Thu", total: 390, escalations: 17 },
  { label: "Fri", total: 420, escalations: 19 },
  { label: "Sat", total: 288, escalations: 10 },
  { label: "Sun", total: 260, escalations: 9 },
];

export const systemHealth = [
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

export const insights = [
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
    description:
      "Benchmarking shows your recent spike is part of a broader vertical trend.",
    type: "opportunity",
    details: [
      "Customers in your vertical saw a 30–45% rise in express-payout usage over the past two weeks.",
      "Your increase is smaller (18%), but fraud levels remain low and stable.",
      "Competitors tightened controls prematurely, causing avoidable friction.",
      "You can safely lean into this trend — reduce friction and capture more volume while keeping risk steady.",
    ],
  },
];

export const macroInsights = [
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
