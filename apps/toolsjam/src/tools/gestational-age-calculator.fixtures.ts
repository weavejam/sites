import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "LMP calculation with valid date",
    actions: [
      { kind: "fill", label: "LMP Date", value: "2026-03-01" },
      { kind: "fill", label: "Average Cycle Length (days)", value: "28" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Gestational Age Results", "Estimated Due Date"] },
  },
  {
    name: "LMP calculation with longer cycle",
    actions: [
      { kind: "fill", label: "LMP Date", value: "2026-02-15" },
      { kind: "fill", label: "Average Cycle Length (days)", value: "35" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Gestational Age Results", "Current Gestational Age"] },
  },
];
