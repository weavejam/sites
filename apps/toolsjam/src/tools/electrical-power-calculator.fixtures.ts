import type { ToolFixture } from "@/tools/fixture";

export const fixtures: ToolFixture[] = [
  {
    name: "Solve power from voltage and current",
    actions: [
      { kind: "click", label: "Voltage + Current" },
      { kind: "fill", label: "Voltage (V)", value: "12" },
      { kind: "fill", label: "Current (I)", value: "3" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "36", "4"] },
  },
  {
    name: "Solve power from current and resistance",
    actions: [
      { kind: "click", label: "Current + Resistance" },
      { kind: "fill", label: "Current (I)", value: "5" },
      { kind: "fill", label: "Resistance (R)", value: "8" },
      { kind: "click", label: "Calculate" },
    ],
    expect: { text: ["Result", "200", "40"] },
  },
];
