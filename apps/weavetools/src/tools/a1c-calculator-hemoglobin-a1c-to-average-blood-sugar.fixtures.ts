import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "A1C 7% → 154.2 mg/dL",
    actions: [
      { kind: "fill", label: "Hemoglobin A1C Percentage", value: "7" },
      { kind: "click", label: "Calculate Average Blood Sugar" },
    ],
    expect: { text: ["154.2", "8.6"] },
  },
  {
    name: "A1C 5% → 96.8 mg/dL (normal)",
    actions: [
      { kind: "fill", label: "Hemoglobin A1C Percentage", value: "5" },
      { kind: "click", label: "Calculate Average Blood Sugar" },
    ],
    expect: { text: ["96.8", "Normal"] },
  },
];
