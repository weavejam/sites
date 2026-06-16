import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Positive change: 50 → 80 = +30",
    actions: [
      { kind: "fill", label: "Initial Value", value: "50" },
      { kind: "fill", label: "Final Value", value: "80" },
      { kind: "click", label: "Calculate Change" },
    ],
    expect: { text: ["Absolute Change", "30"] },
  },
  {
    name: "Negative change: 120 → 100 = -20",
    actions: [
      { kind: "fill", label: "Initial Value", value: "120" },
      { kind: "fill", label: "Final Value", value: "100" },
      { kind: "click", label: "Calculate Change" },
    ],
    expect: { text: ["Absolute Change", "-20"] },
  },
  {
    name: "Cross-zero change: -10 → 10 = +20",
    actions: [
      { kind: "fill", label: "Initial Value", value: "-10" },
      { kind: "fill", label: "Final Value", value: "10" },
      { kind: "click", label: "Calculate Change" },
    ],
    expect: { text: ["Absolute Change", "20"] },
  },
];
