import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Normal: glucose 85 mg/dL, insulin 5 μU/mL → HOMA-IR ~1.05",
    actions: [
      { kind: "fill", label: "Fasting Glucose", value: "85" },
      { kind: "fill", label: "Fasting Insulin", value: "5" },
      { kind: "click", label: "Calculate HOMA-IR" },
    ],
    expect: { text: ["HOMA-IR Result", "1.05"] },
  },
  {
    name: "Moderate IR: glucose 120 mg/dL, insulin 18.5 μU/mL → HOMA-IR ~5.48",
    actions: [
      { kind: "fill", label: "Fasting Glucose", value: "120" },
      { kind: "fill", label: "Fasting Insulin", value: "18.5" },
      { kind: "click", label: "Calculate HOMA-IR" },
    ],
    expect: { text: ["HOMA-IR Result", "5.48"] },
  },
];
