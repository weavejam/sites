import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Balanced model: TP=92, FP=8, TN=88, FN=12 → Accuracy=90%",
    actions: [
      { kind: "fill", label: "True Positives (TP)", value: "92" },
      { kind: "fill", label: "False Positives (FP)", value: "8" },
      { kind: "fill", label: "True Negatives (TN)", value: "88" },
      { kind: "fill", label: "False Negatives (FN)", value: "12" },
      { kind: "click", label: "Calculate Metrics" },
    ],
    expect: { text: ["Classification Metrics", "90.00%"] },
  },
  {
    name: "Medical test: TP=48, FP=12, TN=188, FN=2 → Accuracy=94%",
    actions: [
      { kind: "fill", label: "True Positives (TP)", value: "48" },
      { kind: "fill", label: "False Positives (FP)", value: "12" },
      { kind: "fill", label: "True Negatives (TN)", value: "188" },
      { kind: "fill", label: "False Negatives (FN)", value: "2" },
      { kind: "click", label: "Calculate Metrics" },
    ],
    expect: { text: ["Classification Metrics", "94.00%"] },
  },
];
