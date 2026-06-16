import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "PSA doubles from 2.5 to 5.0 in 12 months → PSADT 12.0 months",
    actions: [
      { kind: "fill", label: "Initial PSA Level (ng/mL)", value: "2.5" },
      { kind: "fill", label: "Current PSA Level (ng/mL)", value: "5.0" },
      { kind: "fill", label: "Time Interval (months)", value: "12" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["PSA Doubling Time", "12.0 months"] },
  },
  {
    name: "PSA 1.0 → 4.0 in 6 months → PSADT 3.0 months (very rapid)",
    actions: [
      { kind: "fill", label: "Initial PSA Level (ng/mL)", value: "1.0" },
      { kind: "fill", label: "Current PSA Level (ng/mL)", value: "4.0" },
      { kind: "fill", label: "Time Interval (months)", value: "6" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["PSA Doubling Time", "3.0 months"] },
  },
];
